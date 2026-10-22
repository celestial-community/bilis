/**
 * @file BinaryInfo.js
 * @module lib/WAM/BinaryInfo
 * @description Provides BinaryInfo functionality.
 * @license Apache-2.0
 * @author Denzy ZeroDay
 * @copyright Copyright (c) 2026 Denzy ZeroDay
 * @channel https://whatsapp.com/channel/0029VavLYLL3gvWSCUdH2F1O
 * @group https://chat.whatsapp.com/GUfAv76Tkf8CwVCTTsh0Ai?s=cl&p=a&mlu=4
 * @website liora-mmxxvi.my.id
 */

'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.BinaryInfo = void 0
class BinaryInfo {
    constructor(options = {}) {
        this.protocolVersion = 5
        this.sequence = 0
        this.events = []
        this.buffer = []
        Object.assign(this, options)
    }
}
exports.BinaryInfo = BinaryInfo
