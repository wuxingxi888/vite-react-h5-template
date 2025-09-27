/**
 * 增加颜色的亮度
 * @param color 原始颜色值，以十六进制字符串形式表示
 * @param amount 亮度增加的量，以整数形式表示
 * @returns 增加亮度后的颜色值，以十六进制字符串形式返回
 */
function addLight(color: string, amount: number) {
    const cc = Number.parseInt(color, 16) + amount;
    const c = cc > 255 ? 255 : cc;
    return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`;
}

/**
 * 减少颜色的亮度
 * @param color 需要调整的颜色的十六进制表示
 * @param amount 亮度减少的数量，不能为负数
 * @returns 返回调整后的颜色的十六进制表示，如果结果为单个数字，则前面补0
 */
function subtractLight(color: string, amount: number) {
    const cc = Number.parseInt(color, 16) - amount;
    const c = cc < 0 ? 0 : cc;
    return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`;
}

/**
 * 使给定的颜色变亮
 *
 * 此函数接受一个颜色值和一个量度，然后返回一个变亮后的颜色值它通过将颜色的RGB值与给定的量度相加来实现
 * 颜色值可以是带#或不带#的十六进制字符串量度是一个百分比，表示要增加的亮度
 *
 * @param color - 颜色值，可以是带#或不带#的十六进制字符串
 * @param amount - 亮度增加的百分比，正数表示增加亮度，负数表示减少亮度
 * @returns 变亮后的颜色值，以带#的十六进制字符串形式返回
 */
export function lighten(color: string, amount: number) {
    color = color.includes('#') ? color.substring(1, color.length) : color;
    amount = Math.trunc((255 * amount) / 100);
    return `#${addLight(color.substring(0, 2), amount)}${addLight(
        color.substring(2, 4),
        amount,
    )}${addLight(color.substring(4, 6), amount)}`;
}

/**
 * 暗化给定的颜色。
 *
 * 该函数接受一个颜色值和一个百分比数值，然后将颜色按该百分比暗化。
 * 颜色可以以十六进制格式表示（带或不带'#'），百分比数值表示暗化的程度。
 *
 * @param color 要暗化的颜色值，以十六进制格式表示。
 * @param amount 暗化的百分比数值。
 * @returns 暗化后的颜色值，以十六进制格式表示。
 */
export function darken(color: string, amount: number) {
    color = color.includes('#') ? color.substring(1, color.length) : color;
    amount = Math.trunc((255 * amount) / 100);
    return `#${subtractLight(color.substring(0, 2), amount)}${subtractLight(
        color.substring(2, 4),
        amount,
    )}${subtractLight(color.substring(4, 6), amount)}`;
}

/**
 * 将十六进制颜色转换为RGBA格式颜色
 * @param hex 十六进制颜色值，可以是简写格式（如 #123）或完整格式（如 #123456）
 * @param opacity 透明度值，范围为0到1，表示完全透明到完全不透明
 * @returns 返回转换后的RGBA格式颜色值，如果输入的十六进制颜色值无效，则返回原始值
 */
export function hexToRgba(hex: string, opacity: number) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
        return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    opacity = opacity >= 0 && opacity <= 1 ? Number(opacity) : 1;
    return result
        ? `rgba(${[Number.parseInt(result[1], 16), Number.parseInt(result[2], 16), Number.parseInt(result[3], 16), opacity].join(',')})`
        : hex;
}
