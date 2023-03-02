import * as types from '../../actionTypes'
import { actionType } from '@/store/type'
import { localeType } from '@/i18n/type'
import { LOCALES } from '@/i18n'
// antd 国际化的语言
import zhCN from 'antd-mobile/es/locales/zh-CN'
import zhTW from 'antd-mobile/es/locales/zh-TW'
import enUS from 'antd-mobile/es/locales/en-US'
// 初始化语言
const initState = {
    locale: {
        custom: LOCALES.CHINA,
        antd: zhCN
    }
}

export default function a(state = initState, action: actionType) {
    switch (action.type) {
        case types.CHANGE_LOCALE:
            switch (action.params) {
                case localeType['zhCN']:
                    return {
                        ...state,
                        locale: {
                            custom: LOCALES.CHINA,
                            antd: zhCN
                        }
                    }

                case localeType['enUS']:
                    return {
                        ...state,
                        locale: {
                            custom: LOCALES.ENGLISH,
                            antd: enUS
                        }
                    }

                case localeType['zhTW']:
                    return {
                        ...state,
                        locale: {
                            custom: LOCALES.TAIWAN,
                            antd: zhTW
                        }
                    }

                default:
                    return state
            }

        default:
            return state
    }
}
