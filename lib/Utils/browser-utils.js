/**
 * @file browser-utils.js
 * @module lib/Utils/browser-utils
 * @description Provides browser utils functionality.
 * @license Apache-2.0
 * @author Denzy ZeroDay
 * @copyright Copyright (c) 2026 Denzy ZeroDay
 * @channel https://whatsapp.com/channel/0029VavLYLL3gvWSCUdH2F1O
 * @group https://chat.whatsapp.com/GUfAv76Tkf8CwVCTTsh0Ai?s=cl&p=a&mlu=4
 * @website liora-mmxxvi.my.id
 */

const { platform, release } = require('os')
const { proto } = require('../../WAProto')
const PLATFORM_MAP = {
    aix: 'AIX',
    darwin: 'Mac OS',
    win32: 'Windows',
    android: 'Android',
    freebsd: 'FreeBSD',
    openbsd: 'OpenBSD',
    sunos: 'Solaris',
    linux: 'Linux',
    haiku: undefined,
    cygwin: undefined,
    netbsd: undefined
}
const BROWSER_MAP = {
    safari: 'Safari',
    chrome: 'Chrome',
    edge: 'Edge',
    firefox: 'Firefox',
    opera: 'Opera',
    brave: 'Brave',
    samsung: 'Samsung Internet'
}
const getBrowserN = (bros) => {
    const brosN = BROWSER_MAP[bros] || bros
    return brosN
}
const Browsers = {
    ubuntu: (browser) => ['Ubuntu', getBrowserN(browser), '22.04.4'],
    macOS: (browser) => ['Mac OS', getBrowserN(browser), '14.4.1'],
    baileys: (browser) => ['Baileys', getBrowserN(browser), '6.5.0'],
    windows: (browser) => ['Windows', getBrowserN(browser), '10.0.22631'],
    iOS: (browser) => ['iOS', getBrowserN(browser), '18.2'],
    android: (browser) => ['Android', getBrowserN(browser), '14.0.0'],
    safari: (browser) => ['Safari', getBrowserN(browser), '26.5'],
    custom: (platform, browser, ver) => {
        let platformN = PLATFORM_MAP[platform].toLowerCase() || platform
        return [platformN, getBrowserN(browser), ver]
    },
    /** The appropriate browser based on your OS & release */
    appropriate: (browser) => [
        PLATFORM_MAP[platform()] || 'Ubuntu',
        getBrowserN(browser),
        release()
    ]
}
const getPlatformId = (browser) => {
    const platformType = proto.DeviceProps.PlatformType[browser.toUpperCase()]
    return platformType ? platformType.toString() : '1' //chrome
}
//# sourceMappingURL=browser-utils.js.map
