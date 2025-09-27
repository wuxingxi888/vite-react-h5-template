/**
 * 浏览器环境信息类型定义
 */
type BrowserInfo = {
    engine: string; // 内核: webkit gecko presto trident
    engineVs: string; // 内核版本
    platform: string; // 平台: desktop mobile
    supporter: string; // 载体: chrome safari firefox opera iexplore edge
    supporterVs: string; // 载体版本
    system: string; // 系统: windows macos linux android ios
    systemVs: string; // 系统版本
    shell?: string; // 外壳: wechat qq uc 360 2345 sougou liebao maxthon
    shellVs?: string; // 外壳版本
    isRealMobile?: boolean; // 是否为真实移动设备
    isPC?: boolean; // 是否为PC浏览器
    isSimulator?: boolean; // 是否为PC模拟移动设备
    deviceType?: string; // 设备类型: real-mobile | pc | simulator
    screenSize?: string; // 屏幕尺寸
    devicePixelRatio?: number; // 设备像素比
    userAgent?: string; // 完整用户代理字符串
};

/**
 * 获取浏览器类型和基本信息
 * @returns {BrowserInfo} 浏览器信息对象
 */
export function getBrowserInfo(): BrowserInfo {
    const ua = navigator.userAgent.toLowerCase();
    const testUa = (regexp: RegExp) => regexp.test(ua);
    const testVs = (regexp: RegExp) =>
        ua
            .match(regexp)?.[0]
            ?.replace(/[^0-9|_.]/g, '')
            .replace(/_/g, '.') || 'unknown';

    // 系统及版本
    const systems = [
        { name: 'windows', regex: /windows|win32|win64|wow32|wow64/g },
        { name: 'macos', regex: /macintosh|macintel/g },
        { name: 'linux', regex: /x11/g },
        { name: 'android', regex: /android|adr/g },
        { name: 'ios', regex: /ios|iphone|ipad|ipod|iwatch/g },
    ];
    const system = systems.find((sys) => testUa(sys.regex))?.name || 'unknown';

    const systemVersions = {
        windows: testVs(/windows nt [\d._]+/g),
        macos: testVs(/os x [\d._]+/g),
        android: testVs(/android [\d._]+/g),
        ios: testVs(/os [\d._]+/g),
        linux: 'unknown',
    };

    // 限制 system 的类型
    const systemKey = system as keyof typeof systemVersions;
    const systemVs = systemVersions[systemKey] || 'unknown';

    // 平台
    const platform = ['windows', 'macos', 'linux'].includes(system) ? 'desktop' : 'mobile';

    // 内核和载体
    const engines = [
        { name: 'webkit', regex: /applewebkit/g },
        { name: 'gecko', regex: /gecko/g },
        { name: 'presto', regex: /presto/g },
        { name: 'trident', regex: /trident|compatible|msie/g },
    ];
    const engine = engines.find((eng) => testUa(eng.regex))?.name || 'unknown';
    const engineVs = testVs(new RegExp(`${engine}/[\\d._]+`, 'g')) || 'unknown';

    const supporters = [
        { name: 'chrome', regex: /chrome/g },
        { name: 'safari', regex: /safari/g },
        { name: 'firefox', regex: /firefox/g },
        { name: 'opera', regex: /opr/g },
        { name: 'edge', regex: /edge/g },
        { name: 'iexplore', regex: /(msie|rv:)/g },
    ];
    const supporter = supporters.find((sup) => testUa(sup.regex))?.name || 'unknown';
    const supporterVs = testVs(new RegExp(`${supporter}/[\\d._]+`, 'g')) || 'unknown';

    // 外壳及版本
    const shells = [
        { name: 'wechat', regex: /micromessenger/g },
        { name: 'qq', regex: /qqbrowser/g },
        { name: 'uc', regex: /ucbrowser/g },
        { name: '360', regex: /qihu 360se/g },
        { name: '2345', regex: /2345explorer/g },
        { name: 'sougou', regex: /metasr/g },
        { name: 'liebao', regex: /lbbrowser/g },
        { name: 'maxthon', regex: /maxthon/g },
    ];
    const shellInfo = shells.find((sh) => testUa(sh.regex)) || {
        name: 'none',
        regex: null,
    };
    const shell = shellInfo.name;
    const shellVs = shell !== 'none' ? testVs(shellInfo.regex!) : 'unknown';

    // 环境检测
    const envDetection = detectEnvironment();

    // 返回结果
    const result: BrowserInfo = {
        engine,
        engineVs,
        platform,
        supporter,
        supporterVs,
        system,
        systemVs,
        isRealMobile: envDetection.isRealMobile,
        isPC: envDetection.isPC,
        isSimulator: envDetection.isSimulator,
        deviceType: envDetection.deviceType,
        screenSize: envDetection.screenSize,
        devicePixelRatio: envDetection.devicePixelRatio,
        userAgent: navigator.userAgent,
    };

    if (shell !== 'none') {
        result.shell = shell;
        result.shellVs = shellVs;
    }

    return result;
}

/**
 * 检测当前环境类型（真实手机/PC/模拟器）
 * @returns {Object} 环境检测结果
 */
export function detectEnvironment() {
    const methods = getDetectionMethods();

    const isRealMobile =
        methods.userAgent &&
        methods.touchSupport &&
        methods.smallScreen &&
        methods.highDPR &&
        !methods.hasMouse &&
        !methods.hasHover;

    const isPC = !methods.userAgent || (methods.hasMouse && methods.hasHover);

    const isSimulator =
        methods.userAgent &&
        (methods.hasMouse ||
            methods.hasHover ||
            (methods.smallScreen && !methods.highDPR) ||
            !methods.mobilePlatform);

    let deviceType = 'unknown';
    if (isRealMobile) deviceType = 'real-mobile';
    else if (isPC) deviceType = 'pc';
    else if (isSimulator) deviceType = 'simulator';

    return {
        isRealMobile,
        isPC,
        isSimulator,
        deviceType,
        screenSize: methods.screenSize,
        devicePixelRatio: methods.devicePixelRatio,
    };
}

/**
 * 获取所有检测方法的原始结果
 * @returns {Object} 包含所有检测方法结果的对象
 */
export function getDetectionMethods() {
    const ua = navigator.userAgent;
    const { platform } = navigator;

    return {
        // User Agent检测
        userAgent: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua),

        // 触摸支持检测
        touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0,

        // 屏幕尺寸检测
        smallScreen: window.innerWidth <= 768 && window.innerHeight <= 1024,

        // 设备像素比检测
        highDPR: window.devicePixelRatio >= 1.5,

        // 鼠标/指针检测
        hasMouse: matchMedia('(pointer:fine)').matches,
        hasHover: matchMedia('(hover:hover)').matches,

        // 平台检测
        mobilePlatform: /iPhone|iPad|iPod|Android|BlackBerry|Windows Phone/i.test(platform),

        // 应用安装方式检测（仅移动端应用有效）
        standalone: window.matchMedia('(display-mode: standalone)').matches,

        // 电池状态检测（移动设备通常有电池）
        hasBattery: 'getBattery' in navigator,

        // 原始数据
        screenSize: `${window.innerWidth} × ${window.innerHeight}px`,
        devicePixelRatio: window.devicePixelRatio,
    };
}

/**
 * 获取详细的检测数据（用于调试或显示）
 * @returns {Object} 包含详细检测数据的对象
 */
export function getDetailedDetection() {
    const methods = getDetectionMethods();
    const envDetection = detectEnvironment();

    return {
        ...envDetection,
        details: {
            userAgent: {
                description: '用户代理包含移动设备关键词',
                value: methods.userAgent ? '是' : '否',
                raw: methods.userAgent,
            },
            touchSupport: {
                description: '支持触摸事件',
                value: methods.touchSupport ? '是' : '否',
                raw: methods.touchSupport,
            },
            smallScreen: {
                description: '屏幕尺寸 ≤ 768x1024',
                value: methods.smallScreen ? '是' : '否',
                raw: methods.smallScreen,
            },
            highDPR: {
                description: '设备像素比 ≥ 1.5',
                value: methods.highDPR
                    ? `是 (${methods.devicePixelRatio})`
                    : `否 (${methods.devicePixelRatio})`,
                raw: methods.highDPR,
            },
            hasMouse: {
                description: '检测到鼠标/精确指针',
                value: methods.hasMouse ? '是' : '否',
                raw: methods.hasMouse,
            },
            hasHover: {
                description: '支持悬停交互',
                value: methods.hasHover ? '是' : '否',
                raw: methods.hasHover,
            },
            mobilePlatform: {
                description: '平台信息包含移动设备关键词',
                value: methods.mobilePlatform ? '是' : '否',
                raw: methods.mobilePlatform,
            },
            standalone: {
                description: 'PWA独立应用模式',
                value: methods.standalone ? '是' : '否',
                raw: methods.standalone,
            },
            hasBattery: {
                description: '设备有电池',
                value: methods.hasBattery ? '是' : '否',
                raw: methods.hasBattery,
            },
            userAgentString: {
                description: '完整用户代理字符串',
                value: navigator.userAgent,
                raw: navigator.userAgent,
            },
            platformInfo: {
                description: '设备平台信息',
                value: navigator.platform,
                raw: navigator.platform,
            },
            screenSize: {
                description: '当前视口尺寸',
                value: methods.screenSize,
                raw: { width: window.innerWidth, height: window.innerHeight },
            },
        },
    };
}

/**
 * 判断当前设备和浏览器环境
 *
 * 此函数通过解析用户代理（User Agent）字符串来检测当前设备类型和环境
 *
 * @returns {Object} 返回一个包含以下属性的对象：
 * - isAndroid: {boolean} 是否为Android设备
 * - isiOS: {boolean} 是否为iOS设备
 * - isWeChat: {boolean} 是否为微信浏览器
 */
export function judgeSystem() {
    // 获取用户代理字符串
    const u = navigator.userAgent;

    // 判断是否为Android设备
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;

    // 判断是否为iOS设备
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

    // 判断是否为微信浏览器
    const isWeChat = /MicroMessenger/i.test(navigator.userAgent);

    // 判断是否为手机模式
    const { isRealMobile } = getBrowserInfo();

    // 判断是否为PC模式
    const { isPC } = getBrowserInfo();

    // 判断是否是PC模拟移动设备
    const { isSimulator } = getBrowserInfo();

    // 设备类型
    const { deviceType } = getBrowserInfo();

    // 返回设备和浏览器环境信息
    return {
        isAndroid,
        isiOS,
        isWeChat,
        isRealMobile,
        isPC,
        isSimulator,
        deviceType,
    };
}
