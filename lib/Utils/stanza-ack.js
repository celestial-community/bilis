/**
 * @file stanza-ack.js
 * @module lib/Utils/stanza-ack
 * @description Provides stanza ack functionality.
 * @license Apache-2.0
 * @author Denzy ZeroDay
 * @copyright Copyright (c) 2026 Denzy ZeroDay
 * @channel https://whatsapp.com/channel/0029VavLYLL3gvWSCUdH2F1O
 * @group https://chat.whatsapp.com/GUfAv76Tkf8CwVCTTsh0Ai?s=cl&p=a&mlu=4
 * @website liora-mmxxvi.my.id
 */

/**
 * Builds an ACK stanza for a received node.
 * Pure function -- no I/O, no side effects.
 *
 * Mirrors WhatsApp Web's ACK construction:
 * - WAWebHandleMsgSendAck.sendAck / sendNack
 * - WAWebCreateNackFromStanza.createNackFromStanza
 */
export function buildAckStanza(node, errorCode, meId) {
    const { tag, attrs } = node
    const stanza = {
        tag: 'ack',
        attrs: {
            id: attrs.id,
            to: attrs.from,
            class: tag
        }
    }
    if (errorCode) {
        stanza.attrs.error = errorCode.toString()
    }
    if (attrs.participant) {
        stanza.attrs.participant = attrs.participant
    }
    if (attrs.recipient) {
        stanza.attrs.recipient = attrs.recipient
    }
    // WA Web always includes type when present: `n.type || DROP_ATTR`
    if (attrs.type) {
        stanza.attrs.type = attrs.type
    }
    // WA Web WAWebHandleMsgSendAck.sendAck/sendNack always include `from` for message-class ACKs
    if (tag === 'message' && meId) {
        stanza.attrs.from = meId
    }
    return stanza
}
//# sourceMappingURL=stanza-ack.js.map
