export interface IThemeState {
    // 系统主题
    themeMode: 'light' | 'dark';
    // 系统风格
    themeColor: string;
    // 系统内置风格
    themeColorList: string[];
    // 是否开启路由动画
    isPageAnimate: boolean;
    // 路由动画类型
    pageAnimateType: string;
}

export const animates = [
    { value: 'fade', label: '淡入淡出' },
    { value: 'fade-bottom', label: '淡入淡出-底部' },
    { value: 'fade-top', label: '淡入淡出-顶部' },
    { value: 'fade-scale', label: '淡入淡出-缩放' },
    { value: 'fade-slide', label: '淡入淡出-滑动' },

    { value: 'scale-transition', label: '缩放' },
    { value: 'scale-rotate-transition', label: '缩放-旋转' },
    { value: 'scale-fade', label: '缩放-淡入淡出' },
    { value: 'scale-out', label: '缩放-闪现' },

    { value: 'slide-y-transition', label: '滑动-从上到下' },
    { value: 'slide-y-reverse-transition', label: '滑动-从下到上' },
    { value: 'slide-x-transition', label: '滑动-从左到右' },
    { value: 'slide-x-reverse-transition', label: '滑动-从右到左' },

    { value: 'scroll-y-transition', label: '滚动-从上到下' },
    { value: 'scroll-y-reverse-transition', label: '滚动-从下到上' },
    { value: 'scroll-x-transition', label: '滚动-从左到右' },
    { value: 'scroll-x-reverse-transition', label: '滚动-从右到左' },
];

// 动画配置映射
export const animationConfigs = {
    fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.3 },
    },
    'fade-bottom': {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.3 },
    },
    'fade-top': {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 },
        transition: { duration: 0.3 },
    },
    'fade-scale': {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 1.1 },
        transition: { duration: 0.3 },
    },
    'fade-slide': {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
        transition: { duration: 0.3 },
    },
    'scale-transition': {
        initial: { scale: 0.8 },
        animate: { scale: 1 },
        exit: { scale: 0.8 },
        transition: { duration: 0.3 },
    },
    'scale-rotate-transition': {
        initial: { scale: 0.8, rotate: -10 },
        animate: { scale: 1, rotate: 0 },
        exit: { scale: 0.8, rotate: 10 },
        transition: { duration: 0.3 },
    },
    'scale-fade': {
        initial: { scale: 0.5, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 1.5, opacity: 0 },
        transition: { duration: 0.3 },
    },
    'scale-out': {
        initial: { scale: 1.2, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.8, opacity: 0 },
        transition: { duration: 0.2 },
    },
    'slide-y-transition': {
        initial: { y: '100%' },
        animate: { y: 0 },
        exit: { y: '-100%' },
        transition: { duration: 0.3 },
    },
    'slide-y-reverse-transition': {
        initial: { y: '-100%' },
        animate: { y: 0 },
        exit: { y: '100%' },
        transition: { duration: 0.3 },
    },
    'slide-x-transition': {
        initial: { x: '100%' },
        animate: { x: 0 },
        exit: { x: '-100%' },
        transition: { duration: 0.3 },
    },
    'slide-x-reverse-transition': {
        initial: { x: '-100%' },
        animate: { x: 0 },
        exit: { x: '100%' },
        transition: { duration: 0.3 },
    },
    'scroll-y-transition': {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -50, opacity: 0 },
        transition: { duration: 0.4 },
    },
    'scroll-y-reverse-transition': {
        initial: { y: -50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 50, opacity: 0 },
        transition: { duration: 0.4 },
    },
    'scroll-x-transition': {
        initial: { x: 50, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -50, opacity: 0 },
        transition: { duration: 0.4 },
    },
    'scroll-x-reverse-transition': {
        initial: { x: -50, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: 50, opacity: 0 },
        transition: { duration: 0.4 },
    },
};

export const themeColorList: string[] = [
    '#5d9dfe',
    '#2d8cf0',
    '#0960bd',
    '#0084f4',
    '#009688',
    '#536dfe',
    '#ff5c93',
    '#ee4f12',
    '#0096c7',
    '#9c27b0',
    '#ff9800',
    '#FF3D68',
    '#00C1D4',
    '#18a058',
    '#78DEC7',
    '#1768AC',
    '#FB9300',
    '#FC5404',
    '#8675ff',
];

export const setting: IThemeState = {
    // 浅色主题
    themeMode: 'light',
    // 系统主题色
    themeColor: '#a062d4',
    // 系统内置主题色列表
    themeColorList,
    // 是否开启路由动画
    isPageAnimate: true,
    // 路由动画类型
    pageAnimateType: 'fade',
};
