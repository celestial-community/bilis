/**
 * @file queue-job.js
 * @module lib/Signal/Group/queue-job
 * @description Provides queue job functionality.
 * @license Apache-2.0
 * @author Denzy ZeroDay
 * @copyright Copyright (c) 2026 Denzy ZeroDay
 * @channel https://whatsapp.com/channel/0029VavLYLL3gvWSCUdH2F1O
 * @group https://chat.whatsapp.com/GUfAv76Tkf8CwVCTTsh0Ai?s=cl&p=a&mlu=4
 * @website liora-mmxxvi.my.id
 */

'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.default = queueJob
const _queueAsyncBuckets = new Map()
const _gcLimit = 10000
async function _asyncQueueExecutor(queue, cleanup) {
    let offt = 0
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const limit = Math.min(queue.length, _gcLimit)
        for (let i = offt; i < limit; i++) {
            const job = queue[i]
            try {
                job.resolve(await job.awaitable())
            } catch (e) {
                job.reject(e)
            }
        }
        if (limit < queue.length) {
            if (limit >= _gcLimit) {
                queue.splice(0, limit)
                offt = 0
            } else {
                offt = limit
            }
        } else {
            break
        }
    }
    cleanup()
}
function queueJob(bucket, awaitable) {
    // Skip name assignment since it's readonly in strict mode
    if (typeof bucket !== 'string') {
        console.warn('Unhandled bucket type (for naming):', typeof bucket, bucket)
    }
    let inactive = false
    if (!_queueAsyncBuckets.has(bucket)) {
        _queueAsyncBuckets.set(bucket, [])
        inactive = true
    }
    const queue = _queueAsyncBuckets.get(bucket)
    const job = new Promise((resolve, reject) => {
        queue.push({
            awaitable,
            resolve: resolve,
            reject
        })
    })
    if (inactive) {
        _asyncQueueExecutor(queue, () => _queueAsyncBuckets.delete(bucket))
    }
    return job
}
