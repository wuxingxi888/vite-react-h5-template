import './index.scss'
import { connect } from 'react-redux'
import { changeLocale } from '@/store/actions'

import { localeType } from '@/i18n/type'

import FloatingBubble from '@/components/FloatingBubble'

import { Button, Space, Card } from 'antd-mobile'

const Home = (props: any) => {
    // 接收全局状态参数
    const { changeLocaleFn } = props

    return (
        <div className="home">
            <Space justify="center">
                <Button
                    size="mini"
                    color="primary"
                    onClick={() => changeLocaleFn(localeType['zhCN'])}
                >
                    中文
                </Button>
                <Button
                    size="mini"
                    color="primary"
                    onClick={() => changeLocaleFn(localeType['enUS'])}
                >
                    英文
                </Button>
                <Button
                    size="mini"
                    color="primary"
                    onClick={() => changeLocaleFn(localeType['zhTW'])}
                >
                    繁体
                </Button>
            </Space>

            <div>
                {Array.from({ length: 10 }).map((item: any, index: number) => {
                    return <Card className="item" key={index} title={`index: ${index}`}></Card>
                })}
            </div>
            <FloatingBubble />
        </div>
    )
}

// 传入全局状态方法
const mapDispatchToProps = (dispatch: any) => {
    return {
        changeLocaleFn(params: string) {
            dispatch(changeLocale(params))
        }
    }
}
export default connect(mapDispatchToProps)(Home)
