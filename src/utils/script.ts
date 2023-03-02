/*
 * @Author: 吴星喜 wuxingxi888@163.com
 * @Date: 2023-02-10 12:12:08
 * @LastEditors: wuxingxi wuxingxi@163.com
 * @LastEditTime: 2023-03-01 17:43:17
 * @FilePath: /vite-react-h5-template/src/utils/script.ts
 * @Description: 动态添加script标签
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */

// 检测是否加载了 script脚本 文件
export const checkIsLoadScript = (src) => {
    const scriptObjs = document.getElementsByTagName('script')
    const reg = RegExp(src)
    for (const sObj of scriptObjs) {
        if (sObj.src.match(reg)) {
            return true
        }
    }
    return false
}

//异步加载script脚本
export const asyncLoadScript = ({ src, id }) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<string>(async (resolve) => {
        const isLoad = await checkIsLoadScript(src)
        if (isLoad) {
            //若script标签存在，则先删除
            const dom = document.getElementById(id) as HTMLScriptElement
            if (dom && dom.src == src) {
                console.log('删除成功')
                dom.remove()
            } else {
                // 正对非prod环境 出现的debug
                removeScript('eruda')
            }
        }
        removeScript('eruda')
        const scriptNode = document.createElement('script')
        scriptNode.setAttribute('type', 'text/javascript')
        scriptNode.setAttribute('charset', 'utf-8')
        scriptNode.setAttribute('id', id)
        scriptNode.setAttribute('src', src)
        document.body.appendChild(scriptNode)
        scriptNode.onload = () => {
            console.log('script loaded')
            resolve(id)
        }
    })
}

// 移除 script标签
export const removeScript = (id) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<void>(async (resolve) => {
        const dom = document.getElementById(id) as HTMLScriptElement
        dom?.remove()
        resolve()
    })
}

// 动态创建css
export const asyncLoadCss = (url) => {
    const linkNode = document.createElement('link')
    linkNode.setAttribute('type', 'text/css')
    linkNode.setAttribute('rel', 'stylesheet')
    linkNode.setAttribute('href', url)
    document.head.appendChild(linkNode)
}
