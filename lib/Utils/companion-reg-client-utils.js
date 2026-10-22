/**
 * @file companion-reg-client-utils.js
 * @module lib/Utils/companion-reg-client-utils
 * @description Provides companion reg client utils functionality.
 * @license Apache-2.0
 * @author Denzy ZeroDay
 * @copyright Copyright (c) 2026 Denzy ZeroDay
 * @channel https://whatsapp.com/channel/0029VavLYLL3gvWSCUdH2F1O
 * @group https://chat.whatsapp.com/GUfAv76Tkf8CwVCTTsh0Ai?s=cl&p=a&mlu=4
 * @website liora-mmxxvi.my.id
 */

export var CompanionWebClientType
;(function (CompanionWebClientType) {
    CompanionWebClientType[(CompanionWebClientType['UNKNOWN'] = 0)] = 'UNKNOWN'
    CompanionWebClientType[(CompanionWebClientType['CHROME'] = 1)] = 'CHROME'
    CompanionWebClientType[(CompanionWebClientType['EDGE'] = 2)] = 'EDGE'
    CompanionWebClientType[(CompanionWebClientType['FIREFOX'] = 3)] = 'FIREFOX'
    CompanionWebClientType[(CompanionWebClientType['IE'] = 4)] = 'IE'
    CompanionWebClientType[(CompanionWebClientType['OPERA'] = 5)] = 'OPERA'
    CompanionWebClientType[(CompanionWebClientType['SAFARI'] = 6)] = 'SAFARI'
    CompanionWebClientType[(CompanionWebClientType['ELECTRON'] = 7)] = 'ELECTRON'
    CompanionWebClientType[(CompanionWebClientType['UWP'] = 8)] = 'UWP'
    CompanionWebClientType[(CompanionWebClientType['OTHER_WEB_CLIENT'] = 9)] = 'OTHER_WEB_CLIENT'
})(CompanionWebClientType || (CompanionWebClientType = {}))
const BROWSER_TO_COMPANION_WEB_CLIENT = {
    Chrome: CompanionWebClientType.CHROME,
    Edge: CompanionWebClientType.EDGE,
    Firefox: CompanionWebClientType.FIREFOX,
    IE: CompanionWebClientType.IE,
    Opera: CompanionWebClientType.OPERA,
    Safari: CompanionWebClientType.SAFARI
}
const getCompanionWebClientType = ([os, browserName]) => {
    if (browserName === 'Desktop') {
        return os === 'Windows' ? CompanionWebClientType.UWP : CompanionWebClientType.ELECTRON
    }
    return BROWSER_TO_COMPANION_WEB_CLIENT[browserName] || CompanionWebClientType.OTHER_WEB_CLIENT
}
const getCompanionPlatformId = (browser) => {
    return getCompanionWebClientType(browser).toString()
}
const buildPairingQRData = (ref, noiseKeyB64, identityKeyB64, advB64, browser) => {
    return (
        'https://wa.me/settings/linked_devices#' +
        [ref, noiseKeyB64, identityKeyB64, advB64, getCompanionPlatformId(browser)].join(',')
    )
}
//# sourceMappingURL=companion-reg-client-utils.js.map
