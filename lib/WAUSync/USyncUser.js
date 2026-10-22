/**
 * @file USyncUser.js
 * @module lib/WAUSync/USyncUser
 * @description Provides USyncUser functionality.
 * @license Apache-2.0
 * @author Denzy ZeroDay
 * @copyright Copyright (c) 2026 Denzy ZeroDay
 * @channel https://whatsapp.com/channel/0029VavLYLL3gvWSCUdH2F1O
 * @group https://chat.whatsapp.com/GUfAv76Tkf8CwVCTTsh0Ai?s=cl&p=a&mlu=4
 * @website liora-mmxxvi.my.id
 */

'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.USyncUser = void 0
class USyncUser {
    withId(id) {
        this.id = id
        return this
    }
    withLid(lid) {
        this.lid = lid
        return this
    }
    withPhone(phone) {
        this.phone = phone
        return this
    }
    withType(type) {
        this.type = type
        return this
    }
    withPersonaId(personaId) {
        this.personaId = personaId
        return this
    }
}
exports.USyncUser = USyncUser
