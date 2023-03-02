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

// 深度合并
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
    let key: string
    const res: any = cloneDeep(src)
    for (key in target) {
        res[key] = isObject(res[key]) ? deepMerge(res[key], target[key]) : (res[key] = target[key])
    }
    return res
}
