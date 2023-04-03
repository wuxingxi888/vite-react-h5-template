/*
 * @Author: wuxingxi wuxingxi@163.com
 * @Date: 2023-03-02 15:34:21
 * @LastEditors: wuxingxi wuxingxi@163.com
 * @LastEditTime: 2023-03-14 12:12:27
 * @FilePath: /vite-react-h5-template/build/config/proxy.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
/**
 * Used to parse the .env.development proxy configuration
 */
import type { ProxyOptions } from 'vite'

type ProxyItem = [string, string]

type ProxyList = ProxyItem[]

type ProxyTargetList = Record<string, ProxyOptions>

const httpsRE = /^https:\/\//

/**
 * Generate proxy
 * @param list
 */
export function createProxy(list: ProxyList = []) {
    const ret: ProxyTargetList = {}
    for (const [prefix, target] of list) {
        const isHttps = httpsRE.test(target)

        ret[prefix] = {
            target: target, // 请求转发地址
            changeOrigin: true, // 是否跨域
            ws: true, // 是否代理 websockets
            rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''), // 重写路径
            // https is require secure=false
            ...(isHttps ? { secure: false } : {}) // https 需要配置 secure: false
        }
    }
    return ret
}
