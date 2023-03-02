import './index.scss'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, WaterMark, Switch, NavBar } from 'antd-mobile'
import { sessionStorage } from '@/utils/storage'
import { asyncLoadScript, removeScript } from '@/utils/script'

const System = () => {
    // eslint-disable-next-line no-undef
    const { pkg, lastBuildTime } = __APP_INFO__

    const { dependencies, devDependencies, name, version } = pkg

    const navigate = useNavigate()

    const [debugChecked, setDebugChecked] = useState(sessionStorage.get('openEruda') ?? false)

    const onChangeDebug = (val: boolean) => {
        if (val) {
            asyncLoadScript({ src: 'https://cdn.jsdelivr.net/npm/eruda', id: 'debug' }).then(() => {
                window.eruda.init()
            })
        } else {
            removeScript('debug').then(() => {
                removeScript('eruda')
            })
        }
        setDebugChecked(val)
        sessionStorage.set('openEruda', val)
    }

    const back = () => navigate(-1)

    useEffect(() => {
        //
    })

    return (
        <div className="wrap">
            <div style={{ height: '45px' }}>
                <NavBar
                    onBack={back}
                    style={{
                        background: '#ffffff',
                        width: '100%',
                        position: 'fixed',
                        top: '0',
                        left: '0'
                    }}
                >
                    标题
                </NavBar>
            </div>

            <Card title="基本信息">
                <div className="item">
                    <p className="key">项目名称</p>
                    <p className="value">{name}</p>
                </div>
                <div className="item">
                    <p className="key">项目版本</p>
                    <p className="value">{version}</p>
                </div>
                <div className="item">
                    <p className="key">最后编译时间</p>
                    <p className="value">{lastBuildTime}</p>
                </div>
            </Card>
            <Card title="生产环境依赖" style={{ marginTop: '10px' }}>
                {Object.entries(dependencies).map(([key, value], index) => (
                    <div className="item" key={index}>
                        <p className="key">{key}</p>
                        <p className="value">{value}</p>
                    </div>
                ))}
            </Card>

            <Card title="开发环境依赖" style={{ marginTop: '10px' }}>
                {Object.entries(devDependencies).map(([key, value], index) => (
                    <div className="item" key={index}>
                        <p className="key">{key}</p>
                        <p className="value">{value}</p>
                    </div>
                ))}
            </Card>

            <Card
                title="调试模式"
                style={{ marginTop: '10px' }}
                extra={
                    <Switch
                        style={{
                            '--height': '25px',
                            '--width': '40px'
                        }}
                        checked={debugChecked}
                        onChange={onChangeDebug}
                    />
                }
            ></Card>

            <WaterMark {...{ content: name }} />
        </div>
    )
}
export default System
