/**
 * @file generate-proto.js
 * @description Generate single WAProto/index.js (+ index.d.ts) from all .proto files.
 *   Adapted for bilis CJS single-file WAProto structure.
 *   Merges 25+ proto packages into a single $root.proto compat namespace.
 * @author Denzy ZeroDay
 */

const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

const PROTO_DIR = path.resolve(__dirname, '..', 'WAProto')
const OUTPUT_FILE = path.join(PROTO_DIR, 'index.js')
const OUTPUT_DTS = path.join(PROTO_DIR, 'index.d.ts')

// Recursively collect all .proto files
function getProtoFiles(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true })
    return files
        .flatMap((file) => {
            const filePath = path.join(dir, file.name)
            return file.isDirectory() ? getProtoFiles(filePath) : filePath
        })
        .filter((file) => file.endsWith('.proto'))
}

const protoFiles = getProtoFiles(PROTO_DIR)

if (protoFiles.length === 0) {
    const singleProto = path.join(PROTO_DIR, 'WAProto.proto')
    if (!fs.existsSync(singleProto)) {
        console.error('No .proto files found.')
        process.exit(1)
    }
    protoFiles.push(singleProto)
}

console.log(`Found ${protoFiles.length} proto file(s). Cleaning...`)

// Pass 1: Clean all proto files
protoFiles.forEach((file) => {
    try {
        let content = fs.readFileSync(file, 'utf8')
        if (/syntax\s*=/.test(content)) {
            content = content.replace(/syntax\s*=\s*"[^"]+"/i, 'syntax = "proto3";')
        } else {
            content = `syntax = "proto3";\n${content}`
        }
        content = content.replace(/;;+/g, ';')
        content = content.replace(/\brequired\s+/g, 'optional ')
        fs.writeFileSync(file, content, 'utf8')
    } catch (err) {
        console.error(`Error cleaning ${file}: ${err.message}`)
    }
})

console.log('Cleaning complete. Generating single index.js...')

// Pass 2: Generate single combined index.js
const pbjsCommand = [
    `npx pbjs`,
    `-t static-module`,
    `-w commonjs`,
    `--keep-case`,
    `-o "${OUTPUT_FILE}"`,
    ...protoFiles.map(f => `"${f}"`)
].join(' ')

try {
    execSync(pbjsCommand, { stdio: 'inherit' })
    console.log(`Generated: WAProto/index.js`)
} catch (err) {
    console.error('PBJS FAILED:', err.message)
    process.exit(1)
}

// Pass 3: bilis compat shim — merge every package into $root.proto
// Old WAProto used a single `package proto`; new WA proto is split into E2E, Web, etc.
// Lib expects `require('../WAProto').proto.Message`, so we alias everything under proto.
let content = fs.readFileSync(OUTPUT_FILE, 'utf8')
content = content.replaceAll('waproto', 'proto')  // legacy fix
const compat = `
// --- bilis compat: merge all packages into $root.proto for backward compat ---
$root.proto = $root.proto || {};
(function() {
    var packages = ["AICommon","AICommonDeprecated","Adv","Aea","Cert","ChatLockSettings","CompanionReg","DeviceCapabilities","E2E","Ephemeral","HistorySync","MdStorageChatRowOpaqueData","MdStorageMsgRowOpaqueData","MmsRetry","Protocol","Reporting","ServerSync","SignalLocalStorageProtocol","SignalWhisperTextProtocol","StatusAttributions","SyncAction","UserPassword","VnameCert","Wa6","Web"];
    packages.forEach(function(pkg) {
        if ($root[pkg]) {
            Object.keys($root[pkg]).forEach(function(key) {
                if ($root.proto[key] === undefined) $root.proto[key] = $root[pkg][key];
            });
        }
    });
})();
`
const exportLine = 'module.exports = $root;'
if (content.includes(exportLine) && !content.includes('bilis compat')) {
    content = content.replace(exportLine, compat + '\n' + exportLine)
}
fs.writeFileSync(OUTPUT_FILE, content, 'utf8')
console.log('Patched index.js with $root.proto compat shim.')

// Pass 4: Generate index.d.ts via pbts with proto alias namespace
try {
    execSync(`npx pbts --main --global protobuf --out "${OUTPUT_DTS}.tmp" "${OUTPUT_FILE}"`, { stdio: 'inherit' })
    let dts = fs.readFileSync(`${OUTPUT_DTS}.tmp`, 'utf8')

    // Append synthetic `export namespace proto` that re-exports every top-level class
    const packages = ["AICommon","AICommonDeprecated","Adv","Aea","Cert","ChatLockSettings","CompanionReg","DeviceCapabilities","E2E","Ephemeral","HistorySync","MdStorageChatRowOpaqueData","MdStorageMsgRowOpaqueData","MmsRetry","Protocol","Reporting","ServerSync","SignalLocalStorageProtocol","SignalWhisperTextProtocol","StatusAttributions","SyncAction","UserPassword","VnameCert","Wa6","Web"]
    const topLevelDecls = []
    for (const pkg of packages) {
        const start = dts.indexOf(`export namespace ${pkg} {`)
        if (start === -1) continue
        // find matching closing brace via depth counting
        let depth = 0, end = -1
        for (let i = start; i < dts.length; i++) {
            if (dts[i] === '{') depth++
            else if (dts[i] === '}') { depth--; if (depth === 0) { end = i; break } }
        }
        if (end === -1) continue
        const block = dts.slice(start, end)
        for (const line of block.split('\n')) {
            const m = line.match(/^\s{4}(?:\/\*.*?\*\/\s*)?(?:export\s+)?(?:abstract\s+)?class\s+(\w+)/)
                || line.match(/^\s{4}interface\s+(\w+)/)
                || line.match(/^\s{4}enum\s+(\w+)/)
            if (!m) continue
            const name = m[1]
            if (name.startsWith('$')) continue
            if (/^I[A-Z]/.test(name)) continue
            topLevelDecls.push(`    export import ${name} = ${pkg}.${name};`)
        }
    }
    if (topLevelDecls.length) {
        dts += `\n/** @deprecated Compat: mirrored in per-package namespaces, exposed as proto for Baileys compat. */\nexport namespace proto {\n${topLevelDecls.join('\n')}\n}\n`
    }
    fs.writeFileSync(OUTPUT_DTS, dts, 'utf8')
    try { fs.unlinkSync(`${OUTPUT_DTS}.tmp`) } catch {}
    console.log(`Generated: WAProto/index.d.ts (${topLevelDecls.length} proto re-exports)`)
} catch (err) {
    console.warn('pbts (index.d.ts) failed:', err.message)
    console.warn('index.js is OK; d.ts can be regenerated with: npx pbts --main --global protobuf --out WAProto/index.d.ts WAProto/index.js')
}

console.log('DONE.')
