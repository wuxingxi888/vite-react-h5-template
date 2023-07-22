module.exports = {
    plugins: {
        // 用来给不同的浏览器自动添加相应前缀，如-webkit-，-moz-等等
        autoprefixer: {
            overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8']
        },
        'postcss-mobile-forever': {
            rootSelector: '#root', // 项目根元素，用于设置居中
            viewportWidth: 375, // UI设计稿的宽度
            maxDisplayWidth: 520, // 最大宽度
            disableLandscape: true, // 禁止生成横屏媒体查询
            disableDesktop: true, // 禁止生成桌面端媒体查询
            unitPrecision: 5, // 转换后的精度，即小数点位数
            propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
            selectorBlackList: [], // 指定不转换为视窗单位的类名
            valueBlackList: ['1px solid'], // 指定不转换的值
            exclude: [],
        }
    }
}
