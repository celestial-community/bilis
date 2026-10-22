/**
 * @file USyncDisappearingModeProtocol.js
 * @module lib/WAUSync/Protocols/USyncDisappearingModeProtocol
 * @description Provides USyncDisappearingModeProtocol functionality.
 * @license Apache-2.0
 * @author Denzy ZeroDay
 * @copyright Copyright (c) 2026 Denzy ZeroDay
 * @channel https://whatsapp.com/channel/0029VavLYLL3gvWSCUdH2F1O
 * @group https://chat.whatsapp.com/GUfAv76Tkf8CwVCTTsh0Ai?s=cl&p=a&mlu=4
 * @website liora-mmxxvi.my.id
 */

'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.USyncDisappearingModeProtocol = void 0
const WABinary_1 = require('../../WABinary')
class USyncDisappearingModeProtocol {
    constructor() {
        this.name = 'disappearing_mode'
    }
    getQueryElement() {
        return {
            tag: 'disappearing_mode',
            attrs: {}
        }
    }
    getUserElement() {
        return null
    }
    parser(node) {
        if (node.tag === 'status') {
            ;(0, WABinary_1.assertNodeErrorFree)(node)
            const duration = +(node === null || node === void 0 ? void 0 : node.attrs.duration)
            const setAt = new Date(
                +((node === null || node === void 0 ? void 0 : node.attrs.t) || 0) * 1000
            )
            return {
                duration,
                setAt
            }
        }
    }
}
exports.USyncDisappearingModeProtocol = USyncDisappearingModeProtocol
