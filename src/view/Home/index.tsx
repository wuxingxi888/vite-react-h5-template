import './index.scss'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { changeName, changeLocale } from '@/store/actions'
// 国际化语言
import { FormattedMessage } from 'react-intl'

import { localeType } from '@/i18n/type'

import FloatingBubble from '@/components/FloatingBubble'

import { Button, Space, Card } from 'antd-mobile'

const Home = (props: any) => {
    // 接收全局状态参数
    const { name, age, changeNameFn, changeLocaleFn } = props

    return (
        <div className="home">
            <Space justify="center">
                <Button
                    size="mini"
                    color="primary"
                    onClick={() => changeLocaleFn(localeType['zhCN'])}
                >
                    {' '}
                    中文{' '}
                </Button>
                <Button
                    size="mini"
                    color="primary"
                    onClick={() => changeLocaleFn(localeType['enUS'])}
                >
                    {' '}
                    英文{' '}
                </Button>
                <Button
                    size="mini"
                    color="primary"
                    onClick={() => changeLocaleFn(localeType['zhTW'])}
                >
                    {' '}
                    繁体{' '}
                </Button>
            </Space>

            <div>
                {Array.from({ length: 30 }).map((item: any, index: number) => {
                    return <Card className="item" key={index} title={index}></Card>
                })}
            </div>
            <FloatingBubble />
        </div>
    )
}
// 传入全局状态参数
const mapStateToProps = (state: any) => {
    return {
        name: state.a.name,
        age: state.b.age
    }
}

// 传入全局状态方法
const mapDispatchToProps = (dispatch: any) => {
    return {
        changeNameFn(params: string) {
            dispatch(changeName(params))
        },
        changeLocaleFn(params: string) {
            dispatch(changeLocale(params))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
