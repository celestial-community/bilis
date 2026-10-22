/**
 * @file sync-action-utils.js
 * @module lib/Utils/sync-action-utils
 * @description Provides sync action utils functionality.
 * @license Apache-2.0
 * @author Denzy ZeroDay
 * @copyright Copyright (c) 2026 Denzy ZeroDay
 * @channel https://whatsapp.com/channel/0029VavLYLL3gvWSCUdH2F1O
 * @group https://chat.whatsapp.com/GUfAv76Tkf8CwVCTTsh0Ai?s=cl&p=a&mlu=4
 * @website liora-mmxxvi.my.id
 */

const { proto } = require('../../WAProto')
const { isLidUser, isPnUser } = require('../WABinary')
/**
 * Process contactAction and return events to emit.
 * Pure function - no side effects.
 */
const processContactAction = (action, id, logger) => {
    const results = []
    if (!id) {
        logger?.warn(
            {
                hasFullName: !!action.fullName,
                hasLidJid: !!action.lidJid,
                hasPnJid: !!action.pnJid
            },
            'contactAction sync: missing id in index'
        )
        return results
    }
    const lidJid = action.lidJid
    const idIsPn = isPnUser(id)
    // PN is in index[1], not in contactAction.pnJid which is usually null
    const phoneNumber = idIsPn ? id : action.pnJid || undefined
    // Always emit contacts.upsert
    results.push({
        event: 'contacts.upsert',
        data: [
            {
                id,
                name: action.fullName || action.firstName || action.username || undefined,
                username: action.username || undefined,
                lid: lidJid || undefined,
                phoneNumber
            }
        ]
    })
    // Emit lid-mapping.update if we have valid LID-PN pair
    if (lidJid && isLidUser(lidJid) && idIsPn) {
        results.push({
            event: 'lid-mapping.update',
            data: { lid: lidJid, pn: id }
        })
    }
    return results
}
const emitSyncActionResults = (ev, results) => {
    for (const result of results) {
        if (result.event === 'contacts.upsert') {
            ev.emit('contacts.upsert', result.data)
        } else {
            ev.emit('lid-mapping.update', result.data)
        }
    }
}
//# sourceMappingURL=sync-action-utils.js.map
