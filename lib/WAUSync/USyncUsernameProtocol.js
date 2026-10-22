/**
 * @file USyncUsernameProtocol.js
 * @module lib/WAUSync/USyncUsernameProtocol
 * @description Provides USyncUsernameProtocol functionality.
 * @license Apache-2.0
 * @author Denzy ZeroDay
 * @copyright Copyright (c) 2026 Denzy ZeroDay
 * @channel https://whatsapp.com/channel/0029VavLYLL3gvWSCUdH2F1O
 * @group https://chat.whatsapp.com/GUfAv76Tkf8CwVCTTsh0Ai?s=cl&p=a&mlu=4
 * @website liora-mmxxvi.my.id
 */

'use strict'

Object.defineProperty(exports, '__esModule', { value: true })
exports.USyncUsernameProtocol = void 0

const WABinary_1 = require('../../WABinary')

class USyncUsernameProtocol {
    constructor() {
        this.name = 'username'
    }
    getQueryElement() {
        return {
            tag: 'username',
            attrs: {}
        }
    }
    getUserElement(user) {
        void user
        return null
    }
    parser(node) {
        if (node.tag === 'username') {
            WABinary_1.assertNodeErrorFree(node)
            const content = node.content
            if (Buffer.isBuffer(content) || content instanceof Uint8Array)
                return Buffer.from(content).toString('utf-8')
            if (typeof content === 'string') return content
        }
        return null
    }
}

exports.USyncUsernameProtocol = USyncUsernameProtocol
module.exports = {
    USyncUsernameProtocol
}
