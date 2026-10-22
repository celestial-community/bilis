/**
 * @file index.js
 * @module lib/Socket/index
 * @description Main WASocket factory with status channel support.
 * @license Apache-2.0
 * @author Denzy ZeroDay
 * @copyright Copyright (c) 2026 Denzy ZeroDay
 * @channel https://whatsapp.com/channel/0029VavLYLL3gvWSCUdH2F1O
 * @group https://chat.whatsapp.com/GUfAv76Tkf8CwVCTTsh0Ai?s=cl&p=a&mlu=4
 * @website liora-mmxxvi.my.id
 */

'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const Defaults_1 = require('../Defaults')
const registration_1 = require('./registration')
const lid_mapping_1 = require('./lid-mapping')
// export the last socket layer
const makeWASocket = (config) => {
    const fullConfig = {
        ...Defaults_1.DEFAULT_CONNECTION_CONFIG,
        ...config
    }
    const sock = (0, registration_1.makeRegistrationSocket)(fullConfig)
 // newsletter status (story channel) — elaina parity, CJS 
    try {
        const ns = require('../Utils/newsletter-status')
        if (ns.makeNewsletterStatusSender) sock.sendNewsletterStatus = ns.makeNewsletterStatusSender(sock, fullConfig)
        if (ns.makeNewsletterStatusReactionSender) sock.sendNewsletterStatusReaction = ns.makeNewsletterStatusReactionSender(sock)
        if (ns.makeNewsletterStatusRevokeSender) sock.revokeNewsletterStatus = ns.makeNewsletterStatusRevokeSender(sock)
        if (ns.makeNewsletterStatusFetcher) sock.getNewsletterStatuses = ns.makeNewsletterStatusFetcher(sock)
        if (ns.makeNewsletterStatusUpdatesFetcher) sock.getNewsletterStatusUpdates = ns.makeNewsletterStatusUpdatesFetcher(sock)
    } catch {}
    // LID/PN helpers are lazy (nothing runs until called); enableLidMapping only adds passive learning
    try {
        return (0, lid_mapping_1.attachLidMapping)(sock, fullConfig)
    } catch (err) {
        fullConfig.logger?.warn?.({ err }, 'LID mapping helpers unavailable')
        return sock
    }
}
exports.default = makeWASocket
exports.makeWASocket = makeWASocket