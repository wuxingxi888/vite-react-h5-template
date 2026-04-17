import type { ReactNode } from 'react';
import { useLocation } from 'react-router';

import { AnimatePresence, motion } from 'framer-motion';

import { useThemeStore } from '@/stores';

import { animationConfigs } from '@/constants/theme';

/**
 * 路由动画包装器组件
 * @param children 需要动画的页面内容
 * @returns 带过渡动画的容器
 */
const RouteAnimator: React.FC<{ children: ReactNode }> = ({ children }) => {
    const location = useLocation();
    const isPageAnimate = useThemeStore((state) => state.isPageAnimate);
    const pageAnimateType = useThemeStore((state) => state.pageAnimateType);

    // 获取当前选择的动画配置
    const currentAnimation =
        animationConfigs[pageAnimateType as keyof typeof animationConfigs] || animationConfigs.fade;

    // 如果不开启动画，直接返回内容
    if (!isPageAnimate) {
        return <>{children}</>;
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={currentAnimation.initial}
                animate={currentAnimation.animate}
                exit={currentAnimation.exit}
                transition={currentAnimation.transition}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default RouteAnimator;
