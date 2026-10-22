/**
 * @file ciphertext-message.js
 * @module lib/Signal/Group/ciphertext-message
 * @description Provides ciphertext message functionality.
 * @license Apache-2.0
 * @author Denzy ZeroDay
 * @copyright Copyright (c) 2026 Denzy ZeroDay
 * @channel https://whatsapp.com/channel/0029VavLYLL3gvWSCUdH2F1O
 * @group https://chat.whatsapp.com/GUfAv76Tkf8CwVCTTsh0Ai?s=cl&p=a&mlu=4
 * @website liora-mmxxvi.my.id
 */

'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.CiphertextMessage = void 0
class CiphertextMessage {
    constructor() {
        this.UNSUPPORTED_VERSION = 1
        this.CURRENT_VERSION = 3
        this.WHISPER_TYPE = 2
        this.PREKEY_TYPE = 3
        this.SENDERKEY_TYPE = 4
        this.SENDERKEY_DISTRIBUTION_TYPE = 5
        this.ENCRYPTED_MESSAGE_OVERHEAD = 53
    }
}
exports.CiphertextMessage = CiphertextMessage
