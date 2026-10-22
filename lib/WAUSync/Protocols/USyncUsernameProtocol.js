/**
 * @file USyncUsernameProtocol.js
 * @module lib/WAUSync/Protocols/USyncUsernameProtocol
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

class USyncUsernameProtocol {
    name() {
        return 'username'
    }
    getQueryDetails() {
        return { tag: 'username', attrs: {} }
    }
    getUserDetails(user) {
        if (!user.username) return []
        return [{ tag: 'username', attrs: {}, content: user.username }]
    }
    parseUserResult(node) {
        const usernameNode = node.content?.find?.((n) => n.tag === 'username')
        if (!usernameNode) return {}
        return { username: usernameNode.content?.toString?.() || usernameNode.attrs?.value }
    }
}

exports.USyncUsernameProtocol = USyncUsernameProtocol
