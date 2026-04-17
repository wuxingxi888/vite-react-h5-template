import type React from 'react';

import { Button, Card, Space } from 'antd-mobile';

import CustomNavBar from '@/components/CustomNavBar';

import styles from './index.module.scss';

const unoCss: React.FC = () => {
    const addAnimation = () => {
        const demo = document.querySelector('.demo');
        demo?.classList.add('animate-bounce', 'animate-count-infinite', 'animate-duration-1s');
    };

    const removeAnimation = () => {
        const demo = document.querySelector('.demo');
        demo?.classList.remove('animate-bounce', 'animate-count-infinite', 'animate-duration-1s');
    };

    const changeFont = () => {
        const demo = document.querySelector('.demo');
        demo?.classList.add('font-msz');
    };

    const resetFont = () => {
        const demo = document.querySelector('.demo');
        demo?.classList.remove('font-msz');
    };

    const toggleVisibility = () => {
        const element = document.querySelector('.visibility-toggle');
        element?.classList.toggle('invisible');
    };

    return (
        <div className={`${styles.unoCssPage} w-full h-full`}>
            <CustomNavBar></CustomNavBar>

            <div className="p-2 space-y-4">
                <Card title="设置字体-动画">
                    <span className="demo text-18px animate-bounce animate-count-infinite animate-duration-1s">
                        即时按需的原子CSS引擎
                    </span>

                    <Space className="mt-2">
                        <Button color="primary" size="mini" onClick={addAnimation}>
                            添加动画
                        </Button>
                        <Button color="primary" size="mini" onClick={removeAnimation}>
                            移除动画
                        </Button>
                        <Button color="primary" size="mini" onClick={changeFont}>
                            修改字体
                        </Button>
                        <Button color="primary" size="mini" onClick={resetFont}>
                            重置字体
                        </Button>
                    </Space>
                </Card>

                <Card title="CSS图标">
                    <span className="w-3em h-3em i-ic:baseline-10k"></span>
                    <span className="w-3em h-3em i-ic:baseline-agriculture"></span>
                    <span className="w-3em h-3em i-ic:baseline-21mp"></span>
                    <span className="w-3em h-3em i-ic:baseline-60fps"></span>
                    <span className="w-3em h-3em i-ic:baseline-light-mode"></span>
                    <span className="w-3em h-3em i-ic:baseline-surfing"></span>
                </Card>

                <Card title="line-clamp-2来截断多行文本">
                    <p className="line-clamp-2">
                        Nulla dolor velit adipisicing duis excepteur esse in duis nostrud occaecat
                        mollit incididunt deserunt sunt. Ut ut sunt laborum ex occaecat eu tempor
                        labore enim adipisicing minim ad. Est in quis eu dolore occaecat excepteur
                        fugiat dolore nisi aliqua fugiat enim ut cillum. Labore enim duis nostrud
                        eu. Est ut eiusmod consequat irure quis deserunt ex. Enim laboris dolor
                        magna pariatur. Dolor et ad sint voluptate sunt elit mollit officia ad enim
                        sit consectetur enim.
                    </p>
                </Card>

                <Card title="元素之间的空间">
                    <p>
                        仅在父级上使用space-x-*, space-y-*属性，而不是在每个子级上使用gap, margin,
                        padding属性
                    </p>
                    <ul className="flex flex-row space-x-5 mt-10px">
                        <li className="size-16 bg-blue flex-center w-4em h-4em rounded-xl">
                            Item 1
                        </li>
                        <li className="size-16 bg-blue flex-center  w-4em h-4em rounded-xl">
                            Item 2
                        </li>
                        <li className="size-16 bg-blue flex-center  w-4em h-4em rounded-xl">
                            Item 3
                        </li>
                    </ul>
                </Card>

                <Card title="组悬停">
                    <div className="flex-center mt-10px">
                        <Button color="primary" className="group rounded-md">
                            <span>Click</span>
                            <span className="ml-2 inline-block group-hover:rotate-90 i-maki:arrow "></span>
                        </Button>
                    </div>
                </Card>

                <Card title="变体组 (Variant Groups)">
                    <p>使用括号语法将具有相同前缀的类组合在一起</p>
                    <div className="flex flex-col gap-2 mt-2">
                        <div className="bg-blue-500 text-white p-2 rounded hover:(bg-blue-700 text-yellow-200 border-2 border-dashed border-yellow-400)">
                            悬停变体组示例
                        </div>
                        <div className="bg-green-500 text-white p-2 rounded focus:(bg-green-700 text-yellow-200 outline-2 outline-dashed outline-yellow-400)">
                            焦点变体组示例
                        </div>
                        <div className="p-2 rounded (dark:bg-gray-700 dark:text-white) (light:bg-gray-200 light:text-black)">
                            暗黑/明亮模式变体组
                        </div>
                    </div>
                </Card>

                <Card title="快捷方式 (Shortcuts)">
                    <p>UnoCSS配置中预定义的快捷方式</p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="flex-center wh-full h-20 bg-blue-500 text-white rounded">
                            flex-center
                        </div>
                        <div className="wh-full h-20 bg-green-500 text-white rounded">
                            <div className="m-0-auto">m-0-auto</div>
                        </div>
                    </div>
                </Card>

                <Card title="CSS指令 (@apply)">
                    <p>在CSS中使用@apply指令复用UnoCSS类</p>
                    <div className="custom-style-example mt-2 p-3 rounded">
                        这个样式使用了@apply指令，将多个UnoCSS类组合成自定义CSS类
                    </div>
                </Card>

                <Card title="更多动画效果">
                    <p>UnoCSS支持多种动画效果</p>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="animate-pulse bg-blue-500 h-10 rounded flex-center text-white">
                            脉冲动画
                        </div>
                        <div className="animate-spin bg-green-500 h-10 rounded flex-center text-white">
                            旋转动画
                        </div>
                        <div className="animate-ping bg-yellow-500 h-10 rounded flex-center text-white">
                            Ping动画
                        </div>
                        <div className="animate-bounce bg-red-500 h-10 rounded flex-center text-white">
                            弹跳动画
                        </div>
                    </div>
                </Card>

                <Card title="响应式设计">
                    <p>使用响应式前缀适配不同屏幕尺寸</p>
                    <div className="mt-2 p-2 bg-blue-100 rounded">
                        <div className="bg-blue-500 text-white p-2 rounded sm:(bg-green-500 p-4) md:(bg-yellow-500 p-6) lg:(bg-red-500 p-8)">
                            <p className="hidden sm:block md:(text-lg) lg:(text-xl)">
                                调整窗口大小查看响应式效果
                            </p>
                            <p className="sm:hidden">默认样式 (xs)</p>
                        </div>
                    </div>
                </Card>

                <Card title="暗黑模式">
                    <p>UnoCSS支持暗黑模式变体</p>
                    <div className="mt-2 p-4 rounded dark:(bg-gray-800 text-white) light:(bg-gray-100 text-black)">
                        这个卡片在暗黑模式下会显示深色背景和白色文字
                    </div>
                </Card>

                <Card title="自定义输入值">
                    <p>通过使用property-[value]语法来实现</p>
                    <div className="flex-center mt-10px">
                        <h5 className="text-[#007bff] text-[2rem]">Hello World</h5>
                    </div>
                </Card>

                <Card title="可见性控制">
                    <p>使用UnoCSS控制元素可见性</p>
                    <Space className="mt-2">
                        <Button color="primary" size="mini" onClick={toggleVisibility}>
                            切换可见性
                        </Button>
                    </Space>
                    <div className="mt-2 p-2 bg-blue-500 text-white rounded visibility-toggle">
                        这个元素可以切换可见性
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default unoCss;
