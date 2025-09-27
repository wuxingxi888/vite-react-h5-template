import { Dialog } from 'antd-mobile';

import { useEnv as getEnv } from '@/hooks/useEnv';

import { Updater } from '@/utils/updater';

/**
 * 检测H5端更新
 */
export const initUpdater = () => {
    const { isDevMode } = getEnv();

    if (!isDevMode()) {
        const updater = new Updater({ timer: 30 * 1000 });

        updater.on('no-update', () => {
            console.log('未更新');
        });

        // 更新通知
        updater.on('update', () => {
            Dialog.confirm({
                title: '系统升级通知',
                content: '检测到当前系统版本已更新，请刷新页面后使用新版本!',
                cancelText: '稍后',
                confirmText: '立即刷新',
                onConfirm: () => window.location.reload(),
            });
        });
    }
};

// 兼容旧调用名（不建议继续使用）
export const useUpdater = initUpdater;
