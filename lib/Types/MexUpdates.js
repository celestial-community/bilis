/**
 * @file MexUpdates.js
 * @module lib/Types/MexUpdates
 * @description Provides MexUpdates functionality.
 * @license Apache-2.0
 * @author Denzy ZeroDay
 * @copyright Copyright (c) 2026 Denzy ZeroDay
 * @channel https://whatsapp.com/channel/0029VavLYLL3gvWSCUdH2F1O
 * @group https://chat.whatsapp.com/GUfAv76Tkf8CwVCTTsh0Ai?s=cl&p=a&mlu=4
 * @website liora-mmxxvi.my.id
 */

'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

const MexUpdatesOperations = {
    OWNER_COMMUNITY: 'NotificationCommunityOwnerUpdate',
    GROUP_MEMBER_LINK: 'NotificationGroupMemberLinkPropertyUpdate',
    GROUP_LIMIT_SHARING: 'NotificationGroupLimitSharingPropertyUpdate'
}

const XWAPathsMexUpdates = {
    GROUP_SHARING_CHANGE: 'xwa2_notify_group_on_prop_change',
    COMMUNITY_OWNER_CHANGE: 'xwa2_notify_group_on_participants_roles_change'
}

module.exports = {
    MexUpdatesOperations,
    XWAPathsMexUpdates
}
