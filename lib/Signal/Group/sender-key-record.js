/**
 * @file sender-key-record.js
 * @module lib/Signal/Group/sender-key-record
 * @description Provides sender key record functionality.
 * @license Apache-2.0
 * @author Denzy ZeroDay
 * @copyright Copyright (c) 2026 Denzy ZeroDay
 * @channel https://whatsapp.com/channel/0029VavLYLL3gvWSCUdH2F1O
 * @group https://chat.whatsapp.com/GUfAv76Tkf8CwVCTTsh0Ai?s=cl&p=a&mlu=4
 * @website liora-mmxxvi.my.id
 */

'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.SenderKeyRecord = void 0
const generics_1 = require('../../Utils/generics')
const sender_key_state_1 = require('./sender-key-state')
class SenderKeyRecord {
    constructor(serialized) {
        this.MAX_STATES = 5
        this.senderKeyStates = []
        if (serialized) {
            for (const structure of serialized) {
                this.senderKeyStates.push(
                    new sender_key_state_1.SenderKeyState(
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        structure
                    )
                )
            }
        }
    }
    isEmpty() {
        return this.senderKeyStates.length === 0
    }
    getSenderKeyState(keyId) {
        if (keyId === undefined && this.senderKeyStates.length) {
            return this.senderKeyStates[this.senderKeyStates.length - 1]
        }
        return this.senderKeyStates.find((state) => state.getKeyId() === keyId)
    }
    addSenderKeyState(id, iteration, chainKey, signatureKey) {
        this.senderKeyStates.push(
            new sender_key_state_1.SenderKeyState(id, iteration, chainKey, null, signatureKey)
        )
        if (this.senderKeyStates.length > this.MAX_STATES) {
            this.senderKeyStates.shift()
        }
    }
    setSenderKeyState(id, iteration, chainKey, keyPair) {
        this.senderKeyStates.length = 0
        this.senderKeyStates.push(
            new sender_key_state_1.SenderKeyState(id, iteration, chainKey, keyPair)
        )
    }
    serialize() {
        return this.senderKeyStates.map((state) => state.getStructure())
    }
    static deserialize(data) {
        let parsed
        if (typeof data === 'string') {
            parsed = JSON.parse(data, generics_1.BufferJSON.reviver)
        } else if (data instanceof Uint8Array) {
            const str = Buffer.from(data).toString('utf-8')
            parsed = JSON.parse(str, generics_1.BufferJSON.reviver)
        } else {
            parsed = data
        }
        return new SenderKeyRecord(parsed)
    }
}
exports.SenderKeyRecord = SenderKeyRecord
