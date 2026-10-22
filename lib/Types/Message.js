/**
 * @file Message.js
 * @module lib/Types/Message
 * @description Message type definitions.
 * @license Apache-2.0
 * @author Denzy ZeroDay
 * @copyright Copyright (c) 2026 Denzy ZeroDay
 * @channel https://whatsapp.com/channel/0029VavLYLL3gvWSCUdH2F1O
 * @group https://chat.whatsapp.com/GUfAv76Tkf8CwVCTTsh0Ai?s=cl&p=a&mlu=4
 * @website liora-mmxxvi.my.id
 */

'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.WAMessageStatus = exports.WAMessageStubType = exports.WAProto = void 0
const WAProto_1 = require('../../WAProto')
Object.defineProperty(exports, 'WAProto', {
    enumerable: true,
    get: function () {
        return WAProto_1.proto
    }
})
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
exports.WAMessageStubType = WAProto_1.proto.WebMessageInfo.StubType
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
exports.WAMessageStatus = WAProto_1.proto.WebMessageInfo.Status
