import { Locale } from 'antd-mobile/es/locales/base'

/**
 * @description: GlobalLanguage
 * @return {*}
 */
export interface Language {
    custom: string
    antd: Locale
}

/**
 * @description: GlobalState
 * @return {*}
 */
export interface GlobalState {
    token: string
    language: Language
}
