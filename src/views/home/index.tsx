import { Space } from 'antd-mobile';
import { motion } from 'framer-motion';

import Logo from '@/components/Logo';

import { useEnv } from '@/hooks/useEnv';

const Header = () => {
    const { getEnvConfig } = useEnv();
    // 环境变量在运行时不会改变，直接调用即可
    const title = getEnvConfig().title;

    return (
        <header className="flex flex-col items-center mt-20">
            {/* 3D 立体旋转 */}
            <motion.div
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                transition={{ duration: 3 }}
                className="w-20 h-20"
            >
                <Logo className="!h-20 !w-20" />
            </motion.div>

            <h1 className="font-[阿里妈妈东方大楷_regular,_serif] text-darkBlue dark:text-garyWhite mb-4 mt-5 text-center text-2xl font-black">
                {title}
            </h1>
            <p className="text-color-regular text-[14px]">简单完善.开箱即用 🎁</p>
        </header>
    );
};

Header.displayName = 'Header';

const Intro = () => {
    const { getEnvConfig } = useEnv();
    // 环境变量在运行时不会改变，直接调用即可
    const title = getEnvConfig().title;

    return (
        <section className="mt-[30px]">
            <h3 className="font-black text-[18px] dark:text-garyWhite">简介</h3>
            <p className="text-color-regular text-[14px] leading-[26px] mt-[10px]">
                {title} 是一个基于前端前沿技术栈、干净、开箱即用的前端H5解决方案。
                提供完善的前端H5开发环境，快速启动项目，为专注业务实现与开发，提高开发效率而生，也可用于学习参考。
            </p>
        </section>
    );
};

Intro.displayName = 'Intro';

const STACKS = [
    {
        src: 'https://img.shields.io/badge/-React.js-4FC08D?&logo=React&logoColor=white',
        alt: 'react.js',
    },
    {
        src: 'https://img.shields.io/badge/-Vite-646CFF?logo=Vite&logoColor=white',
        alt: 'Vite',
    },
    {
        src: 'https://img.shields.io/badge/-TypeScript-007ACC?logo=typescript&logoColor=white',
        alt: 'TypeScript',
    },
    {
        src: 'https://img.shields.io/badge/-UnoCSS-666?logo=UnoCSS&logoColor=white',
        alt: 'UnoCSS',
    },
    {
        src: 'https://img.shields.io/badge/-pnpm-F69220?logo=pnpm&logoColor=white',
        alt: 'pnpm',
    },
    {
        src: 'https://img.shields.io/badge/-Sass-CC6699?logo=sass&logoColor=white',
        alt: 'Sass',
    },
] as const;

const Technical = () => {
    return (
        <section className="mt-[30px]">
            <h3 className="font-black text-[18px] dark:text-garyWhite">技术栈</h3>
            <Space wrap className="mt-[10px]">
                {STACKS.map((item) => (
                    <img src={item.src} alt={item.alt} key={item.src} />
                ))}
            </Space>
        </section>
    );
};

Technical.displayName = 'Technical';

const SCHEME = [
    {
        src: 'https://img.shields.io/badge/-ESLint-4B32C3?logo=ESLint&logoColor=white',
        alt: 'ESLint',
    },
    {
        src: 'https://img.shields.io/badge/-Prettier-F7B93E?logo=Prettier&logoColor=white',
        alt: 'Prettier',
    },
    {
        src: 'https://img.shields.io/badge/-commitlint-666?logo=commitlint&logoColor=white',
        alt: 'commitlint',
    },
    {
        src: 'https://img.shields.io/badge/-lint-666?logo=lint&logoColor=white',
        alt: 'lint',
    },
] as const;

const Scheme = () => {
    return (
        <section className="mt-[30px]">
            <h3 className="font-black text-[18px] dark:text-garyWhite">协同方案</h3>
            <Space wrap className="mt-[10px]">
                {SCHEME.map((item) => (
                    <img src={item.src} alt={item.alt} key={item.src} />
                ))}
            </Space>
        </section>
    );
};

Scheme.displayName = 'Scheme';

const MERITS = [
    '💡 基于React18、antd-mobile、Vite7、TypeScript、UnoCSS等最新技术栈开发',
    '✨ 完善的Eslint + Prettier项目协同方案,开箱即用',
    '🔥 使用 Git Hook 进行 Lint Commit,规范化提交',
    '🌠 使用 React 函数式组件与 Hooks 开发',
    '⚡️  轻量快速的热重载,无论应用程序大小如何,都始终极快的模块热重载(HMR)',
    '🔩 具备主题配置及黑暗主题适配，且持久化保存',
    '🛠️ 丰富的 Vite 插件,集成大部分 Vite 插件，无需繁琐配置，开箱即用',
    '📊 内置 useEcharts hooks,满足大部分图表展示，只需要写你的 Options',
    '⌛️ 内置JS与原生（Android/iOS）交互的封装',
    '🤔 内置openInstall,完成App渠道引流传参功能',
    '📦 plop代码模版一键生成，节约开发时间',
    '🥳 完善的登录系统、路由、Axios配置,所有基础设施已搭建完毕，你可以直接开发你的业务需求',
] as const;

const Merits = () => {
    return (
        <section className="mt-[30px]">
            <h3 className="font-black text-[18px] dark:text-garyWhite">优点</h3>
            <ul className="mt-[10px]">
                {MERITS.map((merit) => (
                    <li key={merit} className="text-color-regular text-[14px] leading-[26px]">
                        {merit}
                    </li>
                ))}
            </ul>
        </section>
    );
};

Merits.displayName = 'Merits';
function Home() {
    return (
        <div className="w-full p-[15px]">
            <Header />
            <Intro />
            <Technical />
            <Scheme />
            <Merits />
        </div>
    );
}

export default Home;
