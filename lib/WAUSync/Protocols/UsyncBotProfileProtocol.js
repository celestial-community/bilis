/**
 * @file UsyncBotProfileProtocol.js
 * @module lib/WAUSync/Protocols/UsyncBotProfileProtocol
 * @description Provides UsyncBotProfileProtocol functionality.
 * @license Apache-2.0
 * @author Denzy ZeroDay
 * @copyright Copyright (c) 2026 Denzy ZeroDay
 * @channel https://whatsapp.com/channel/0029VavLYLL3gvWSCUdH2F1O
 * @group https://chat.whatsapp.com/GUfAv76Tkf8CwVCTTsh0Ai?s=cl&p=a&mlu=4
 * @website liora-mmxxvi.my.id
 */

'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.USyncBotProfileProtocol = void 0
const WABinary_1 = require('../../WABinary')
class USyncBotProfileProtocol {
    constructor() {
        this.name = 'bot'
    }
    getQueryElement() {
        return {
            tag: 'bot',
            attrs: {},
            content: [{ tag: 'profile', attrs: { v: '1' } }]
        }
    }
    getUserElement(user) {
        return {
            tag: 'bot',
            attrs: {},
            content: [{ tag: 'profile', attrs: { persona_id: user.personaId } }]
        }
    }
    parser(node) {
        const botNode = (0, WABinary_1.getBinaryNodeChild)(node, 'bot')
        const profile = (0, WABinary_1.getBinaryNodeChild)(botNode, 'profile')
        const commandsNode = (0, WABinary_1.getBinaryNodeChild)(profile, 'commands')
        const promptsNode = (0, WABinary_1.getBinaryNodeChild)(profile, 'prompts')
        const commands = []
        const prompts = []
        for (const command of (0, WABinary_1.getBinaryNodeChildren)(commandsNode, 'command')) {
            commands.push({
                name: (0, WABinary_1.getBinaryNodeChildString)(command, 'name'),
                description: (0, WABinary_1.getBinaryNodeChildString)(command, 'description')
            })
        }
        for (const prompt of (0, WABinary_1.getBinaryNodeChildren)(promptsNode, 'prompt')) {
            prompts.push(
                `${(0, WABinary_1.getBinaryNodeChildString)(prompt, 'emoji')} ${(0, WABinary_1.getBinaryNodeChildString)(prompt, 'text')}`
            )
        }
        return {
            isDefault: !!(0, WABinary_1.getBinaryNodeChild)(profile, 'default'),
            jid: node.attrs.jid,
            name: (0, WABinary_1.getBinaryNodeChildString)(profile, 'name'),
            attributes: (0, WABinary_1.getBinaryNodeChildString)(profile, 'attributes'),
            description: (0, WABinary_1.getBinaryNodeChildString)(profile, 'description'),
            category: (0, WABinary_1.getBinaryNodeChildString)(profile, 'category'),
            personaId: profile.attrs['persona_id'],
            commandsDescription: (0, WABinary_1.getBinaryNodeChildString)(
                commandsNode,
                'description'
            ),
            commands,
            prompts
        }
    }
}
exports.USyncBotProfileProtocol = USyncBotProfileProtocol
