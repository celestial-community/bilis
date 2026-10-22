/**
 * @file Newsletter.js
 * @module lib/Types/Newsletter
 * @description Newsletter type definitions.
 * @license Apache-2.0
 * @author Denzy ZeroDay
 * @copyright Copyright (c) 2026 Denzy ZeroDay
 * @channel https://whatsapp.com/channel/0029VavLYLL3gvWSCUdH2F1O
 * @group https://chat.whatsapp.com/GUfAv76Tkf8CwVCTTsh0Ai?s=cl&p=a&mlu=4
 * @website liora-mmxxvi.my.id
 */

'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

const MexOperations = {
    PROMOTE: 'NotificationNewsletterAdminPromote',
    DEMOTE: 'NotificationNewsletterAdminDemote',
    UPDATE: 'NotificationNewsletterUpdate'
}

const XWAPaths = {
    PROMOTE: 'xwa2_notify_newsletter_admin_promote',
    DEMOTE: 'xwa2_notify_newsletter_admin_demote',
    ADMIN_COUNT: 'xwa2_newsletter_admin',
    CREATE: 'xwa2_newsletter_create',
    NEWSLETTER: 'xwa2_newsletter',
    SUBSCRIBED: 'xwa2_newsletter_subscribed',
    METADATA_UPDATE: 'xwa2_notify_newsletter_on_metadata_update',
    // canonical XWAPaths
    xwa2_newsletter_create: 'xwa2_newsletter_create',
    xwa2_newsletter_subscribers: 'xwa2_newsletter_subscribers',
    xwa2_newsletter_view: 'xwa2_newsletter_view',
    xwa2_newsletter_metadata: 'xwa2_newsletter',
    xwa2_newsletter_admin_count: 'xwa2_newsletter_admin',
    xwa2_newsletter_mute_v2: 'xwa2_newsletter_mute_v2',
    xwa2_newsletter_unmute_v2: 'xwa2_newsletter_unmute_v2',
    xwa2_newsletter_follow: 'xwa2_newsletter_follow',
    xwa2_newsletter_unfollow: 'xwa2_newsletter_unfollow',
    xwa2_newsletter_join_v2: 'xwa2_newsletter_join_v2',
    xwa2_newsletter_leave_v2: 'xwa2_newsletter_leave_v2',
    xwa2_newsletter_change_owner: 'xwa2_newsletter_change_owner',
    xwa2_newsletter_demote: 'xwa2_newsletter_demote',
    xwa2_newsletter_delete_v2: 'xwa2_newsletter_delete_v2',
    xwa2_newsletter_update: 'xwa2_newsletter_update'
}

const QueryIds = {
    // legacy IDs (backward compat)
    JOB_MUTATION: '7150902998257522',
    METADATA: '6620195908089573',
    UNFOLLOW: '7238632346214362',
    FOLLOW: '7871414976211147',
    UNMUTE: '7337137176362961',
    MUTE: '25151904754424642',
    CREATE: '6996806640408138',
    ADMIN_COUNT: '7130823597031706',
    CHANGE_OWNER: '7341777602580933',
    DELETE: '8316537688363079',
    DEMOTE: '6551828931592903',
    SUBSCRIBED: '6388546374527196',
    // canonical QueryIds
    UPDATE_METADATA: '24250201037901610',
    SUBSCRIBERS: '9783111038412085'
}

exports.MexOperations = MexOperations
exports.XWAPaths = XWAPaths
exports.QueryIds = QueryIds
