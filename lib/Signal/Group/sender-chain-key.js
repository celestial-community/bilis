/**
 * @file sender-chain-key.js
 * @module lib/Signal/Group/sender-chain-key
 * @description Provides sender chain key functionality.
 * @license Apache-2.0
 * @author Denzy ZeroDay
 * @copyright Copyright (c) 2026 Denzy ZeroDay
 * @channel https://whatsapp.com/channel/0029VavLYLL3gvWSCUdH2F1O
 * @group https://chat.whatsapp.com/GUfAv76Tkf8CwVCTTsh0Ai?s=cl&p=a&mlu=4
 * @website liora-mmxxvi.my.id
 */

'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.SenderChainKey = void 0
const crypto_1 = require('libsignal/src/crypto')
const sender_message_key_1 = require('./sender-message-key')
class SenderChainKey {
    constructor(iteration, chainKey) {
        this.MESSAGE_KEY_SEED = Buffer.from([0x01])
        this.CHAIN_KEY_SEED = Buffer.from([0x02])
        this.iteration = iteration
        if (chainKey instanceof Buffer) {
            this.chainKey = chainKey
        } else {
            this.chainKey = Buffer.from(chainKey || [])
        }
    }
    getIteration() {
        return this.iteration
    }
    getSenderMessageKey() {
        return new sender_message_key_1.SenderMessageKey(
            this.iteration,
            this.getDerivative(this.MESSAGE_KEY_SEED, this.chainKey)
        )
    }
    getNext() {
        return new SenderChainKey(
            this.iteration + 1,
            this.getDerivative(this.CHAIN_KEY_SEED, this.chainKey)
        )
    }
    getSeed() {
        return this.chainKey
    }
    getDerivative(seed, key) {
        return (0, crypto_1.calculateMAC)(key, seed)
    }
}
exports.SenderChainKey = SenderChainKey
