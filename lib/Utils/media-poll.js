/**
 * @file media-poll.js
 * @module lib/Utils/media-poll
 * @description Media poll helpers for image polls.
 * @license Apache-2.0
 * @author Denzy ZeroDay
 * @copyright Copyright (c) 2026 Denzy ZeroDay
 * @channel https://whatsapp.com/channel/0029VavLYLL3gvWSCUdH2F1O
 * @group https://chat.whatsapp.com/GUfAv76Tkf8CwVCTTsh0Ai?s=cl&p=a&mlu=4
 * @website liora-mmxxvi.my.id
 */

'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.buildMediaPollRefreshMessage = exports.buildMediaPollMessages = exports.getMediaPollOptionHash = void 0
const { Boom } = require('@hapi/boom')
const crypto_1 = require('crypto')
const WAProto_1 = require('../../WAProto')
const crypto_2 = require('./crypto')
const assertOptionName = (value) => {
    if (typeof value !== 'string' || value.length === 0) {
        throw new Boom('Media poll option names must be non-empty strings', { statusCode: 400 })
    }
}
const getMediaPollOptionHash = (optionName, fileSha256) => {
    assertOptionName(optionName)
    if (!fileSha256 || Buffer.from(fileSha256).length === 0) {
        throw new Boom('Media poll option images need fileSha256', { statusCode: 400 })
    }
    const optionNameHash = (0, crypto_2.sha256)(Buffer.from(optionName, 'utf8')).toString('hex')
    const fileSha256Base64 = Buffer.from(fileSha256).toString('base64')
    return (0, crypto_2.sha256)(Buffer.from(optionNameHash + fileSha256Base64, 'utf8')).toString('hex')
}
exports.getMediaPollOptionHash = getMediaPollOptionHash
const buildMediaPollMessages = ({ name, options, parentMessageKey, selectableOptionsCount = 1, messageSecret = (0, crypto_1.randomBytes)(32) }) => {
    if (typeof name !== 'string' || name.length === 0) {
        throw new Boom('Media poll name must be a non-empty string', { statusCode: 400 })
    }
    if (!Array.isArray(options) || options.length === 0) {
        throw new Boom('Media poll options must be a non-empty array', { statusCode: 400 })
    }
    if (!(parentMessageKey === null || parentMessageKey === void 0 ? void 0 : parentMessageKey.remoteJid) || !(parentMessageKey === null || parentMessageKey === void 0 ? void 0 : parentMessageKey.id)) {
        throw new Boom('Media poll parent key needs remoteJid and id', { statusCode: 400 })
    }
    if (!Number.isInteger(selectableOptionsCount) || selectableOptionsCount < 0 || selectableOptionsCount > options.length) {
        throw new Boom('Media poll selectableOptionsCount is invalid', { statusCode: 400 })
    }
    const pollOptions = []
    const optionImageMessages = []
    for (const option of options) {
        assertOptionName(option === null || option === void 0 ? void 0 : option.name)
        if (!(option === null || option === void 0 ? void 0 : option.imageMessage)) {
            throw new Boom('Every media poll option needs an uploaded imageMessage', { statusCode: 400 })
        }
        const imageMessage = WAProto_1.proto.Message.ImageMessage.fromObject({
            ...option.imageMessage,
            caption: option.name
        })
        pollOptions.push({
            optionName: option.name,
            optionHash: getMediaPollOptionHash(option.name, imageMessage.fileSha256)
        })
        optionImageMessages.push(WAProto_1.proto.Message.create({
            pollCreationOptionImageMessage: {
                message: {
                    imageMessage
                }
            },
            messageContextInfo: {
                messageAssociation: {
                    associationType: WAProto_1.proto.MessageAssociation.AssociationType.MEDIA_POLL,
                    parentMessageKey
                }
            }
        }))
    }
    return {
        pollMessage: WAProto_1.proto.Message.create({
            pollCreationMessageV3: {
                name,
                options: pollOptions,
                selectableOptionsCount,
                pollContentType: WAProto_1.proto.Message.PollContentType.IMAGE
            },
            messageContextInfo: {
                messageSecret
            }
        }),
        optionImageMessages
    }
}
exports.buildMediaPollMessages = buildMediaPollMessages
const buildMediaPollRefreshMessage = ({ pollMessage, parentMessageKey, timestampMs = Date.now() }) => {
    if (!(pollMessage === null || pollMessage === void 0 ? void 0 : pollMessage.pollCreationMessageV3)) {
        throw new Boom('Media poll refresh needs a V3 poll message', { statusCode: 400 })
    }
    if (!(parentMessageKey === null || parentMessageKey === void 0 ? void 0 : parentMessageKey.remoteJid) || !(parentMessageKey === null || parentMessageKey === void 0 ? void 0 : parentMessageKey.id)) {
        throw new Boom('Media poll refresh needs the parent key', { statusCode: 400 })
    }
    return WAProto_1.proto.Message.create({
        protocolMessage: {
            key: parentMessageKey,
            type: WAProto_1.proto.Message.ProtocolMessage.Type.MESSAGE_EDIT,
            timestampMs,
            editedMessage: pollMessage
        }
    })
}
exports.buildMediaPollRefreshMessage = buildMediaPollRefreshMessage
