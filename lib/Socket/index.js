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
    // ── newsletter status (story channel) — elaina parity, CJS ──
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