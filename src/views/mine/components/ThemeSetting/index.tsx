import { useState } from 'react';

import { Divider, List, Picker, Switch } from 'antd-mobile';

import ClassIcon from '@/components/ClassIcon';
import CustomNavBar from '@/components/CustomNavBar';

import { useThemeStore } from '@/stores';

import { animates } from '@/constants/theme';

import styles from './index.module.scss';

const RenderThemeMode = () => {
    const themeMode = useThemeStore((state) => state.themeMode);
    const setThemeMode = useThemeStore((state) => state.setThemeMode);

    const toggleTheme = (checked: boolean) => {
        setThemeMode(checked ? 'dark' : 'light');
    };
    return (
        <>
            <Divider>主题模式</Divider>

            <List mode="card">
                <List.Item extra={<Switch checked={themeMode === 'dark'} onChange={toggleTheme} />}>
                    暗黑模式
                </List.Item>
            </List>
        </>
    );
};

const RenderThemeColor = () => {
    const themeColor = useThemeStore((state) => state.themeColor);
    const themeColorList = useThemeStore((state) => state.themeColorList);
    const setThemeColor = useThemeStore((state) => state.setThemeColor);

    return (
        <>
            <Divider>系统主题色</Divider>
            <div className="flex-center">
                <div className="grid grid-cols-8 gap-2">
                    {themeColorList.map((item) => (
                        <span
                            key={item}
                            className="w-8 h-8 rounded-md border-2 border-white flex-center"
                            style={{ backgroundColor: item }}
                            onClick={() => {
                                setThemeColor(item);
                            }}
                        >
                            {item === themeColor && (
                                <ClassIcon
                                    name="i-ic:sharp-check"
                                    className="text-white text-2xl"
                                />
                            )}
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
};

const RenderThemeAnimation = () => {
    const isPageAnimate = useThemeStore((state) => state.isPageAnimate);
    const setIsPageAnimate = useThemeStore((state) => state.setIsPageAnimate);
    const pageAnimateType = useThemeStore((state) => state.pageAnimateType);
    const setPageAnimateType = useThemeStore((state) => state.setPageAnimateType);

    const togglePageAnimate = (checked: boolean) => {
        setIsPageAnimate(checked);
    };

    const [visible, setVisible] = useState(false);

    const animateLabel = animates.find((item) => item.value === pageAnimateType)?.label;

    return (
        <>
            <Divider>页面切换动画</Divider>

            <List mode="card">
                <List.Item extra={<Switch checked={isPageAnimate} onChange={togglePageAnimate} />}>
                    路由动画
                </List.Item>

                <List.Item
                    arrowIcon
                    disabled={!isPageAnimate}
                    onClick={() => setVisible(true)}
                    extra={<div>{animateLabel}</div>}
                >
                    动画类型
                </List.Item>
            </List>

            <Picker
                columns={[animates]}
                visible={visible}
                value={[pageAnimateType]}
                onConfirm={(value) => {
                    if (value[0] && typeof value[0] === 'string') {
                        setPageAnimateType(value[0]);
                    }
                    setVisible(false);
                }}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </>
    );
};

function ThemeSetting() {
    return (
        <div className={styles.themeSetting}>
            <CustomNavBar></CustomNavBar>

            <RenderThemeMode></RenderThemeMode>

            <RenderThemeColor></RenderThemeColor>

            <RenderThemeAnimation></RenderThemeAnimation>
        </div>
    );
}

export default ThemeSetting;
