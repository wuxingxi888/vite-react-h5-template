import './index.scss'

import { localeType } from '@/i18n/type'

import FloatingBubble from '@/components/FloatingBubble'

import { Button, Space, Card } from 'antd-mobile'

import { useDispatch } from '@/store'
import { setLanguage } from '@/store/modules/global'

const Home = (props: any) => {
    const dispatch = useDispatch()

    return (
        <div className="home">
            <Space justify="center">
                <Button
                    size="mini"
                    color="primary"
                    onClick={() => dispatch(setLanguage(localeType['zhCN']))}
                >
                    中文
                </Button>
                <Button
                    size="mini"
                    color="primary"
                    onClick={() => dispatch(setLanguage(localeType['enUS']))}
                >
                    英文
                </Button>
                <Button
                    size="mini"
                    color="primary"
                    onClick={() => dispatch(setLanguage(localeType['zhTW']))}
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

export default Home
