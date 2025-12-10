import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { NavBar, type NavBarProps } from 'antd-mobile';

import { useRouter } from '@/hooks/useRouter';

import './index.scss';

// 扩展的属性接口
export interface CustomNavBarProps extends NavBarProps {
    /** 自定义返回按钮点击事件 */
    onBackClick?: () => void;
    /** 是否固定定位 */
    fixed?: boolean;
    /** 背景颜色 */
    backgroundColor?: string;
    /** 文字颜色 */
    textColor?: string;
    /** 自定义样式 */
    customStyle?: React.CSSProperties;
}

const CustomNavBar: React.FC<CustomNavBarProps> = (props) => {
    const navBarRef = useRef<HTMLDivElement>(null);
    const [navBarHeight, setNavBarHeight] = useState(0);

    const {
        onBackClick,
        fixed = true,
        backgroundColor,
        textColor,
        customStyle,
        children,
        ...navBarProps
    } = props;

    const router = useRouter();

    // 获取导航栏高度
    useLayoutEffect(() => {
        if (fixed && navBarRef.current) {
            const height = navBarRef.current.offsetHeight;
            setNavBarHeight(height);
        }
    }, [fixed]);

    // 处理返回按钮点击
    const handleBack = () => {
        if (onBackClick) {
            onBackClick();
        } else {
            router.back();
        }
    };

    // 合并样式
    const navbarStyle: React.CSSProperties = useMemo(
        () => ({
            ...customStyle,
            ...(backgroundColor && { backgroundColor }),
            ...(textColor && { color: textColor }),
        }),
        [customStyle, backgroundColor, textColor],
    );

    return (
        <>
            <div
                ref={navBarRef}
                className={`custom-navbar-container ${fixed ? 'custom-navbar-fixed' : ''}`}
            >
                <NavBar {...navBarProps} style={navbarStyle} onBack={handleBack}>
                    {children || document.title}
                </NavBar>
            </div>
            {fixed && <div style={{ height: `${navBarHeight}px` }} />}
        </>
    );
};

export default CustomNavBar;
