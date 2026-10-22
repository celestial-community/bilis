/**
 * @file antiban-profiles.js
 * @module lib/Utils/antiban-profiles
 * @description Provides antiban profiles functionality.
 * @license Apache-2.0
 * @author Denzy ZeroDay
 * @copyright Copyright (c) 2026 Denzy ZeroDay
 * @channel https://whatsapp.com/channel/0029VavLYLL3gvWSCUdH2F1O
 * @group https://chat.whatsapp.com/GUfAv76Tkf8CwVCTTsh0Ai?s=cl&p=a&mlu=4
 * @website liora-mmxxvi.my.id
 */

"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.apply_group_multiplier = exports.should_use_group_profile = exports.is_broadcast = exports.is_newsletter = exports.is_group = void 0

/**
 * @file antiban-profiles.js
 * @description Small JID-classification helpers and a rate-limit multiplier
 *   applier used to give groups/newsletters looser (or tighter) limits than
 *   1:1 chats.
 * @author Denzy ZeroDay
 */

function is_group(jid) {
    return jid.endsWith('@g.us')
}
exports.is_group = is_group

function is_newsletter(jid) {
    return jid.endsWith('@newsletter')
}
exports.is_newsletter = is_newsletter

function is_broadcast(jid) {
    return jid === 'status@broadcast' || jid.endsWith('@broadcast')
}
exports.is_broadcast = is_broadcast

function should_use_group_profile(jid) {
    return is_group(jid) || is_newsletter(jid)
}
exports.should_use_group_profile = should_use_group_profile

/** Scale maxPerMinute/Hour/Day limits by a multiplier (min 1 each) */
function apply_group_multiplier(limits, multiplier) {
    return {
        maxPerMinute: Math.max(1, Math.floor(limits.maxPerMinute * multiplier)),
        maxPerHour: Math.max(1, Math.floor(limits.maxPerHour * multiplier)),
        maxPerDay: Math.max(1, Math.floor(limits.maxPerDay * multiplier))
    }
}
exports.apply_group_multiplier = apply_group_multiplier

module.exports = { is_group, is_newsletter, is_broadcast, should_use_group_profile, apply_group_multiplier }