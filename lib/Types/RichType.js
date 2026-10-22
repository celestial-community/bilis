/**
 * @file RichType.js
 * @module lib/Types/RichType
 * @description Provides RichType functionality.
 * @license Apache-2.0
 * @author Denzy ZeroDay
 * @copyright Copyright (c) 2026 Denzy ZeroDay
 * @channel https://whatsapp.com/channel/0029VavLYLL3gvWSCUdH2F1O
 * @group https://chat.whatsapp.com/GUfAv76Tkf8CwVCTTsh0Ai?s=cl&p=a&mlu=4
 * @website liora-mmxxvi.my.id
 */

'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

var CodeHighlightType
;(function (CodeHighlightType) {
    CodeHighlightType[(CodeHighlightType['DEFAULT'] = 0)] = 'DEFAULT'
    CodeHighlightType[(CodeHighlightType['KEYWORD'] = 1)] = 'KEYWORD'
    CodeHighlightType[(CodeHighlightType['METHOD'] = 2)] = 'METHOD'
    CodeHighlightType[(CodeHighlightType['STRING'] = 3)] = 'STRING'
    CodeHighlightType[(CodeHighlightType['NUMBER'] = 4)] = 'NUMBER'
    CodeHighlightType[(CodeHighlightType['COMMENT'] = 5)] = 'COMMENT'
})(CodeHighlightType || (exports.CodeHighlightType = CodeHighlightType = {}))

var RichSubMessageType
;(function (RichSubMessageType) {
    RichSubMessageType[(RichSubMessageType['UNKNOWN'] = 0)] = 'UNKNOWN'
    RichSubMessageType[(RichSubMessageType['GRID_IMAGE'] = 1)] = 'GRID_IMAGE'
    RichSubMessageType[(RichSubMessageType['TEXT'] = 2)] = 'TEXT'
    RichSubMessageType[(RichSubMessageType['INLINE_IMAGE'] = 3)] = 'INLINE_IMAGE'
    RichSubMessageType[(RichSubMessageType['TABLE'] = 4)] = 'TABLE'
    RichSubMessageType[(RichSubMessageType['CODE'] = 5)] = 'CODE'
    RichSubMessageType[(RichSubMessageType['DYNAMIC'] = 6)] = 'DYNAMIC'
    RichSubMessageType[(RichSubMessageType['MAP'] = 7)] = 'MAP'
    RichSubMessageType[(RichSubMessageType['LATEX'] = 8)] = 'LATEX'
    RichSubMessageType[(RichSubMessageType['CONTENT_ITEMS'] = 9)] = 'CONTENT_ITEMS'
})(RichSubMessageType || (exports.RichSubMessageType = RichSubMessageType = {}))

exports.CodeHighlightType = CodeHighlightType
exports.RichSubMessageType = RichSubMessageType
