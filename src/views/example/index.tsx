import { useEffect } from 'react';

import { List, Switch } from 'antd-mobile';

import Icon from '@/components/ClassIcon';

import { useRouter } from '@/hooks/useRouter';
import { useAppStore } from '@/store/modules/useAppStore';
import useThemeStore from '@/store/modules/useThemeStore';
import { asyncLoadScript, removeScript } from '@/utils/script';

import './index.scss';

const MENU_ITEMS = [
    { label: '主题设置', route: '/themeSetting', icon: 'i-material-symbols:palette' },
    { label: '404 页演示', route: '/err404', icon: 'i-tabler:error-404' },
    { label: 'openInstall', route: '/openInstall', icon: 'i-material-symbols:apk-install-rounded' },
    { label: '项目依赖', route: '/dependence', icon: 'i-mdi:dependency' },
    { label: 'SVG图标', route: '/svgIcons', icon: 'i-hugeicons:svg-02' },
    { label: 'unoCss', route: '/unoCss', icon: 'i-simple-icons-unocss' },
    { label: 'FramerMotion', route: '/framerMotion', icon: 'i-svg-spinners-blocks-shuffle-3' },
    { label: 'FigmaDemo', route: '/figmaDemo', icon: 'i-simple-icons:figma' },
    {
        label: 'GITHUB',
        route: '/webview?title=GITHUB&url=https://github.com/wuxingxi888',
        icon: 'i-mdi:github',
    },
    {
        label: 'BLOG',
        route: '/webview?title=博客&url=https://wuxingxi.top/',
        icon: 'i-simple-icons:bloglovin',
    },
    {
        label: 'MIRACLE-WEB/UI',
        route: '/webview?title=MIRACLE-WEB/UI&url=https://wuxingxi.top/miracle/',
        icon: 'i-mingcute:components-fill',
    },
];

function Example() {
    const { themeMode, setThemeMode } = useThemeStore();

    const toggleTheme = (checked: boolean) => {
        setThemeMode(checked ? 'dark' : 'light');
    };

    const { openEruda, setOpenEruda } = useAppStore();

    // 处理 vConsole 的加载和卸载
    useEffect(() => {
        if (openEruda) {
            asyncLoadScript({
                src: 'https://cdn.bootcdn.net/ajax/libs/vConsole/3.15.1/vconsole.min.js',
                id: 'vconsole',
            }).then(() => {
                if (!window.VConsole) return;
                new window.VConsole({ theme: 'light' });
            });
        } else {
            removeScript('vconsole').then(() => {
                // 删除html根目录下所有的 #__vconsole
                const vconsoleDom = document.querySelectorAll('#__vconsole');
                vconsoleDom.forEach((item) => item.remove());
            });
        }
    }, [openEruda]);

    const toggleEruda = (checked: boolean) => {
        setOpenEruda(checked);
    };

    const router = useRouter();

    return (
        <div className="w-full h-full p-1 ">
            <List mode="card">
                <List.Item
                    extra={
                        <div className="flex items-center">
                            <Icon className="i-dark:carbon-moon i-carbon-sun" />
                            <span className="mx-2">{themeMode === 'dark' ? 'Dark' : 'Light'}</span>
                            <Switch checked={themeMode === 'dark'} onChange={toggleTheme} />
                        </div>
                    }
                >
                    🌓 暗黑模式
                </List.Item>

                <List.Item extra={<Switch checked={openEruda} onChange={toggleEruda} />}>
                    🆖 调试模式
                </List.Item>

                {MENU_ITEMS.map((item) => (
                    <List.Item
                        key={item.label}
                        prefix={<Icon name={item.icon} className="text-[20px]" />}
                        onClick={() => {
                            router.push(item.route);
                        }}
                    >
                        {item.label}
                    </List.Item>
                ))}
            </List>
        </div>
    );
}

export default Example;
