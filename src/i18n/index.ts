//locales.js

import en from './message/en'
import zh_tw from './message/zh_tw'
import zh_cn from './message/zh_cn'

export const LOCALES = {
    ENGLISH: 'en',
    TAIWAN: 'zh-TW',
    CHINA: 'zh-CN'
}

export const messages = {
    [LOCALES.ENGLISH]: en,
    [LOCALES.TAIWAN]: zh_tw,
    [LOCALES.CHINA]: zh_cn
}
