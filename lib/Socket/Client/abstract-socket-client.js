/**
 * @file abstract-socket-client.js
 * @module lib/Socket/Client/abstract-socket-client
 * @description Provides abstract socket client functionality.
 * @license Apache-2.0
 * @author Denzy ZeroDay
 * @copyright Copyright (c) 2026 Denzy ZeroDay
 * @channel https://whatsapp.com/channel/0029VavLYLL3gvWSCUdH2F1O
 * @group https://chat.whatsapp.com/GUfAv76Tkf8CwVCTTsh0Ai?s=cl&p=a&mlu=4
 * @website liora-mmxxvi.my.id
 */

'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.AbstractSocketClient = void 0
const events_1 = require('events')
class AbstractSocketClient extends events_1.EventEmitter {
    constructor(url, config) {
        super()
        this.url = url
        this.config = config
        this.setMaxListeners(0)
    }
}
exports.AbstractSocketClient = AbstractSocketClient
