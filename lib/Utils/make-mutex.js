/**
 * @file make-mutex.js
 * @module lib/Utils/make-mutex
 * @description Provides make mutex functionality.
 * @license Apache-2.0
 * @author Denzy ZeroDay
 * @copyright Copyright (c) 2026 Denzy ZeroDay
 * @channel https://whatsapp.com/channel/0029VavLYLL3gvWSCUdH2F1O
 * @group https://chat.whatsapp.com/GUfAv76Tkf8CwVCTTsh0Ai?s=cl&p=a&mlu=4
 * @website liora-mmxxvi.my.id
 */

'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.makeKeyedMutex = exports.makeMutex = void 0
const makeMutex = () => {
    let task = Promise.resolve()
    let taskTimeout
    return {
        mutex(code) {
            task = (async () => {
                // wait for the previous task to complete
                // if there is an error, we swallow so as to not block the queue
                try {
                    await task
                } catch (_a) {}
                try {
                    // execute the current task
                    const result = await code()
                    return result
                } finally {
                    clearTimeout(taskTimeout)
                }
            })()
            // we replace the existing task, appending the new piece of execution to it
            // so the next task will have to wait for this one to finish
            return task
        }
    }
}
exports.makeMutex = makeMutex
const makeKeyedMutex = () => {
    const map = {}
    return {
        mutex(key, task) {
            if (!map[key]) {
                map[key] = (0, exports.makeMutex)()
            }
            return map[key].mutex(task)
        }
    }
}
exports.makeKeyedMutex = makeKeyedMutex
