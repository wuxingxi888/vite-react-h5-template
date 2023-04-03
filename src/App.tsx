import { BrowserRouter } from 'react-router-dom'

import RouterView from '@/layout'
import { connect } from 'react-redux'
import { messages } from '@/i18n'

import { ConfigProvider } from 'antd-mobile'
// 自定义 国际化的语言
import { IntlProvider } from 'react-intl'
import { changeToken } from './store/actions/module/app'
import { useEffect } from 'react'
import { getParamsFromUrl } from './utils'

const App = (props: any) => {
    // 从状态获取语言
    const { locale, setToken } = props

    useEffect(() => {
        const token = getParamsFromUrl('token')
        if (token) {
            setToken(token)
        }
    }, [])

    return (
        // antd国际化
        <ConfigProvider locale={locale.antd}>
            {/* 自定义语言国际化 */}
            <IntlProvider messages={messages[locale.custom]} locale={locale.custom}>
                {/* 路由模式 */}
                <BrowserRouter>
                    {/* 路由出口 */}
                    <RouterView />
                </BrowserRouter>
            </IntlProvider>
        </ConfigProvider>
    )
}

// 传入全局状态语言
const mapStateToProps = (state: any) => {
    return {
        locale: state.locale.locale
    }
}

// 传入全局状态方法
const mapDispatchToProps = (dispatch: any) => {
    return {
        setToken(token: string) {
            dispatch(changeToken(token))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
