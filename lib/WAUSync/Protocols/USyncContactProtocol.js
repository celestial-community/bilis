/**
 * @file USyncContactProtocol.js
 * @module lib/WAUSync/Protocols/USyncContactProtocol
 * @description Provides USyncContactProtocol functionality.
 * @license Apache-2.0
 * @author Denzy ZeroDay
 * @copyright Copyright (c) 2026 Denzy ZeroDay
 * @channel https://whatsapp.com/channel/0029VavLYLL3gvWSCUdH2F1O
 * @group https://chat.whatsapp.com/GUfAv76Tkf8CwVCTTsh0Ai?s=cl&p=a&mlu=4
 * @website liora-mmxxvi.my.id
 */

'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.USyncContactProtocol = void 0
const WABinary_1 = require('../../WABinary')
class USyncContactProtocol {
    constructor() {
        this.name = 'contact'
    }
    getQueryElement() {
        return {
            tag: 'contact',
            attrs: {}
        }
    }
    getUserElement(user) {
        //TODO: Implement type / username fields (not yet supported)
        return {
            tag: 'contact',
            attrs: {},
            content: user.phone
        }
    }
    parser(node) {
        var _a
        if (node.tag === 'contact') {
            ;(0, WABinary_1.assertNodeErrorFree)(node)
            return (
                ((_a = node === null || node === void 0 ? void 0 : node.attrs) === null ||
                _a === void 0
                    ? void 0
                    : _a.type) === 'in'
            )
        }
        return false
    }
}
exports.USyncContactProtocol = USyncContactProtocol
