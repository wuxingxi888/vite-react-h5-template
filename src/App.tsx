import { BrowserRouter } from 'react-router-dom'

import RouterView from '@/layout'
import { connect } from 'react-redux'
import { messages } from '@/i18n'

import { ConfigProvider } from 'antd-mobile'
// 自定义 国际化的语言
import { IntlProvider } from 'react-intl'
import { RootState, useDispatch, useSelector } from '@/store'
import { useEffect } from 'react'
import { getParamsFromUrl } from './utils'
import { setToken } from './store/modules/global'

const App = (props: any) => {
    const dispatch = useDispatch()
    const { language } = useSelector((state: RootState) => state.global)

    useEffect(() => {
        const token = getParamsFromUrl('token')
        if (token) {
            dispatch(setToken(token))
        }
    }, [])

    return (
        // antd国际化
        <ConfigProvider locale={language.antd}>
            {/* 自定义语言国际化 */}
            <IntlProvider messages={messages[language.custom]} locale={language.custom}>
                {/* 路由模式 */}
                <BrowserRouter>
                    {/* 路由出口 */}
                    <RouterView />
                </BrowserRouter>
            </IntlProvider>
        </ConfigProvider>
    )
}

export default App
