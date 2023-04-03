import { useEffect, useState } from 'react'
import { asyncLoadScript } from '@/utils/script'

const useOpenInstall = (appKey: string) => {
    const [complete, setComplete] = useState(false)
    const [openInstall, setOpenInstall] = useState<OpenInstall>()

    const initOpenInstall = () => {
        const data = OpenInstall.parseUrlParams() // openinstall.js中提供的工具函数，解析url中的所有查询参数

        const timeId = setTimeout(() => {
            console.log('OpenInstall OI timeout')
            if (complete) return
        }, 8000)

        new OpenInstall(
            {
                /*appKey必选参数，平台为每个应用分配的ID*/
                appKey: appKey,
                /*直接指定渠道编号，默认通过当前页url中的channelCode参数自动检测渠道编号*/
                //channelCode:"渠道编号",
                /*自定义遮罩的html*/
                //mask:function(){
                //  return "<div id='_shadow' style='position:fixed;left:0;top:0;background:rgba(0,255,0,0.5);filter:alpha(opacity=50);width:100%;height:100%;z-index:10000;'></div>"
                //},
                onready: function () {
                    setComplete(true)
                    setOpenInstall(this)
                    clearTimeout(timeId)
                    console.log('OpenInstall OI success')
                }
            },
            data
        )
    }

    const wakeUpOrInstallApp = <T>(params: T) => {
        if (openInstall) {
            openInstall.wakeupOrInstall({
                data: params,
                timeout: 1500
            })
        }
    }

    useEffect(() => {
        asyncLoadScript({
            src: 'https://web.cdn.openinstall.io/openinstall.js',
            id: 'openInstall'
        }).then(() => {
            initOpenInstall()
        })
    }, [])

    return { openInstall, complete, wakeUpOrInstallApp }
}

export default useOpenInstall
