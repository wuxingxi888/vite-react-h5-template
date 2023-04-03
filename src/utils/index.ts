import { isObject } from '@/utils/is'
import { cloneDeep } from 'lodash-es'
/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
    let parameters = ''
    for (const key in obj) {
        parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
    }
    parameters = parameters.replace(/&$/, '')
    return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters
}

// 从url中获取参数
export const getParamsFromUrl = (paramName: string) => {
    const URL = window.location.href
    const params = URL.split('?')[1]
    if (params === undefined) {
        return ''
    }
    const paramsArr = params.split('&')
    const paramsObj: any = {}
    paramsArr.forEach((item) => {
        const itemArr = item.split('=')
        paramsObj[itemArr[0]] = itemArr[1]
    })
    if (paramsObj[paramName] === undefined) {
        return ''
    }
    return paramsObj[paramName]
}

// 深度合并
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
    let key: string
    const res: any = cloneDeep(src)
    for (key in target) {
        res[key] = isObject(res[key]) ? deepMerge(res[key], target[key]) : (res[key] = target[key])
    }
    return res
}

// os判断
export const judgeSystem = () => {
    const userAgent = navigator.userAgent
    const userAgents = navigator.userAgent.toLowerCase()
    const isTrident = userAgent.indexOf('Trident') > -1 // IE内核
    const isPresto = userAgent.indexOf('Presto') > -1 // opera内核
    const isWebKit = userAgent.indexOf('AppleWebKit') > -1 // 苹果、谷歌内核
    const isGecko = userAgent.indexOf('Gecko') > -1 && userAgent.indexOf('KHTML') === -1 // 火狐内核
    const isMobile = !!userAgent.match(/AppleWebKit.*Mobile.*/) // 是否为移动终端
    const isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1 // android
    const isIOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios
    const isIPhone = userAgent.indexOf('iPhone') > -1 // 是否为iPhone或者QQHD浏览器
    const isIPad = userAgent.indexOf('iPad') > -1 // 是否iPad
    const isWebApp = userAgent.indexOf('Safari') === -1 // 是否web应该程序，没有头部与底部
    const isWeiXin = /Micromessenger/i.test(userAgents) // 微信
    return {
        isIOS,
        isAndroid,
        isWeiXin,
        isTrident,
        isPresto,
        isWebKit,
        isGecko,
        isMobile,
        isIPad,
        isIPhone,
        isWebApp
    }
}
