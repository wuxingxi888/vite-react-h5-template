import { useCallback, useLayoutEffect, useRef, useState } from 'react';

import { asyncLoadScript, removeScript } from '@/utils/script';

const useOpenInstall = (appKey: string) => {
    const [openInstall, setOpenInstall] = useState<OpenInstall | null>(null);
    const isMounted = useRef(true);

    const initOpenInstall = useCallback(() => {
        // 检查全局变量是否存在
        if (typeof OpenInstall === 'undefined') {
            console.error('OpenInstall SDK not loaded');
            return;
        }

        // 解析url中的所有查询参数
        const data = OpenInstall.parseUrlParams();

        new OpenInstall(
            {
                appKey,
                onready(this: OpenInstall) {
                    if (isMounted.current) {
                        setOpenInstall(this);
                        console.log('OpenInstall OI success');
                    }
                },
            },
            data,
        );
    }, [appKey]);

    useLayoutEffect(() => {
        isMounted.current = true;

        asyncLoadScript({
            src: `https://res.openinstall.com/openinstall-${appKey}.js`,
            id: 'openInstall',
        })
            .then(() => {
                if (isMounted.current) {
                    initOpenInstall();
                }
            })
            .catch((error) => {
                console.error('Failed to load OpenInstall SDK:', error);
            });

        return () => {
            isMounted.current = false;

            removeScript('openInstall');
        };
    }, [appKey, initOpenInstall]);

    return { openInstall };
};

export default useOpenInstall;
