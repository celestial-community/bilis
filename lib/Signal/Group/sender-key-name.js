/**
 * @file sender-key-name.js
 * @module lib/Signal/Group/sender-key-name
 * @description Provides sender key name functionality.
 * @license Apache-2.0
 * @author Denzy ZeroDay
 * @copyright Copyright (c) 2026 Denzy ZeroDay
 * @channel https://whatsapp.com/channel/0029VavLYLL3gvWSCUdH2F1O
 * @group https://chat.whatsapp.com/GUfAv76Tkf8CwVCTTsh0Ai?s=cl&p=a&mlu=4
 * @website liora-mmxxvi.my.id
 */

'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.SenderKeyName = void 0
function isNull(str) {
    return str === null || str === ''
}
function intValue(num) {
    const MAX_VALUE = 0x7fffffff
    const MIN_VALUE = -0x80000000
    if (num > MAX_VALUE || num < MIN_VALUE) {
        return num & 0xffffffff
    }
    return num
}
function hashCode(strKey) {
    let hash = 0
    if (!isNull(strKey)) {
        for (let i = 0; i < strKey.length; i++) {
            hash = hash * 31 + strKey.charCodeAt(i)
            hash = intValue(hash)
        }
    }
    return hash
}
class SenderKeyName {
    constructor(groupId, sender) {
        this.groupId = groupId
        this.sender = sender
    }
    getGroupId() {
        return this.groupId
    }
    getSender() {
        return this.sender
    }
    serialize() {
        return `${this.groupId}::${this.sender.id}::${this.sender.deviceId}`
    }
    toString() {
        return this.serialize()
    }
    equals(other) {
        if (other === null) return false
        return this.groupId === other.groupId && this.sender.toString() === other.sender.toString()
    }
    hashCode() {
        return hashCode(this.groupId) ^ hashCode(this.sender.toString())
    }
}
exports.SenderKeyName = SenderKeyName
