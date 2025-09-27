// uno 样式重置
import '@unocss/reset/tailwind-compat.css';
// 引入 svg-icons
import 'virtual:svg-icons-register';
// 引入uno全局样式
import 'virtual:uno.css';

import NativeCallJs from '@/services/nativeCallJs';
// 公共样式
import '@/styles/scss/global.scss';

import { initDevtool } from './devtool';
import { initLoadScript } from './loadScript';
import { initUpdater } from './updater';

window.NativeCallJs = NativeCallJs;
// 一次性初始化，避免主题切换导致重复执行
let appPluginsInitialized = false;
export const initAppPlugins = () => {
    if (appPluginsInitialized) return;
    appPluginsInitialized = true;
    initDevtool(); // 禁用或限制开发者工具
    initUpdater(); // 检测更新
    initLoadScript(); // 动态脚本加载
};

// 兼容旧调用名（不建议继续使用）
export const useAppPlugins = initAppPlugins;

export default initAppPlugins;
