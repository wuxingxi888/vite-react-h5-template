/**
 * 将对象添加当作参数拼接到URL上面
 * @param baseUrl 需要拼接的url
 * @param obj 参数对象
 * @returns {string} 拼接后的对象
 * 例子:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: Record<string, any>): string {
    let parameters = '';
    let url = '';
    for (const key in obj) {
        parameters += `${key}=${encodeURIComponent(obj[key])}&`;
    }
    parameters = parameters.replace(/&$/, '');
    if (/\?$/.test(baseUrl)) {
        url = baseUrl + parameters;
    } else {
        url = baseUrl.replace(/\/?$/, '?') + parameters;
    }
    return url;
}

/**
 * 将指定的查询参数转换为URL格式
 * 此函数用于从当前页面的URL中提取指定的查询参数值如果请求的参数不存在，则返回空字符串
 *
 * @param key 查询参数的键名
 * @returns 返回查询参数的值或空字符串
 * 例子:
 *  URL='www.baidu.com?a=1'
 *  getParamsToUrl("a")
 *  ==>a=1
 */
export const getParamsToUrl = (key: string): string => {
    const URL = window.location.href;
    const searchParams = new URLSearchParams(URL.split('?')[1] || '');

    if (!searchParams.has(key)) {
        return '';
    }

    return searchParams.get(key) || '';
};
