import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GlobalState } from '../interface'

import { localeType } from '@/i18n/type'
// 自定义国际语言
import { LOCALES } from '@/i18n'
// antd 国际化的语言
import zhCN from 'antd-mobile/es/locales/zh-CN'
import zhTW from 'antd-mobile/es/locales/zh-TW'
import enUS from 'antd-mobile/es/locales/en-US'

const globalState: GlobalState = {
    token: '',
    language: {
        custom: LOCALES.CHINA,
        antd: zhCN
    }
}

const globalSlice = createSlice({
    name: 'global',
    initialState: globalState,
    reducers: {
        setToken(state: GlobalState, { payload }: PayloadAction<string>) {
            state.token = payload
        },
        setLanguage(state: GlobalState, { payload }: PayloadAction<string>) {
            switch (payload) {
                case localeType['zhCN']:
                    state.language = { custom: LOCALES.CHINA, antd: zhCN }
                    break
                case localeType['enUS']:
                    state.language = { custom: LOCALES.ENGLISH, antd: enUS }
                    break
                case localeType['zhTW']:
                    state.language = { custom: LOCALES.TAIWAN, antd: zhTW }
                    break
                default:
                    break
            }
        }
    }
})

export const { setToken, setLanguage } = globalSlice.actions
export default globalSlice.reducer
