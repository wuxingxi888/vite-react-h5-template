import { BrowserRouter } from 'react-router-dom'

import RouterView from '@/layout'
import { connect } from 'react-redux'
import { messages } from '@/i18n'

import { ConfigProvider } from 'antd-mobile'
// 自定义 国际化的语言
import { IntlProvider } from 'react-intl'

const App = (props: any) => {
    // 从状态获取语言
    const { locale } = props

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

export default connect(mapStateToProps)(App)
