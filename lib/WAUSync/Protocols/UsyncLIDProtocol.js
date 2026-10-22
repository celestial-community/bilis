/**
 * @file UsyncLIDProtocol.js
 * @module lib/WAUSync/Protocols/UsyncLIDProtocol
 * @description Provides UsyncLIDProtocol functionality.
 * @license Apache-2.0
 * @author Denzy ZeroDay
 * @copyright Copyright (c) 2026 Denzy ZeroDay
 * @channel https://whatsapp.com/channel/0029VavLYLL3gvWSCUdH2F1O
 * @group https://chat.whatsapp.com/GUfAv76Tkf8CwVCTTsh0Ai?s=cl&p=a&mlu=4
 * @website liora-mmxxvi.my.id
 */

'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.USyncLIDProtocol = void 0
class USyncLIDProtocol {
    constructor() {
        this.name = 'lid'
    }
    getQueryElement() {
        return {
            tag: 'lid',
            attrs: {}
        }
    }
    getUserElement() {
        return null
    }
    parser(node) {
        if (node.tag === 'lid') {
            return node.attrs.val
        }
        return null
    }
}
exports.USyncLIDProtocol = USyncLIDProtocol
