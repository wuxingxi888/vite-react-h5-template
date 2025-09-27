import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { asyncLoadScript, removeScript } from '@/utils/script';

interface State {
    openEruda: boolean;
}

type Action = {
    setOpenEruda: (openEruda: boolean) => void;
};

// 创建带有Immer中间件的zustand存储
export const useAppStore = create<State & Action>()(
    immer(
        persist(
            (set) => ({
                openEruda: false,
                setOpenEruda: (openEruda) =>
                    set((state) => {
                        state.openEruda = openEruda;
                        if (openEruda) {
                            asyncLoadScript({
                                src: 'https://cdn.bootcdn.net/ajax/libs/vConsole/3.15.1/vconsole.min.js',
                                id: 'vconsole',
                            }).then(() => {
                                new window.VConsole({ theme: 'light' });
                            });
                        } else {
                            removeScript('vconsole').then(() => {
                                // 删除html根目录下所有的 #__vconsole
                                const VconsoleDom = document.querySelectorAll('#__vconsole');
                                console.log('VconsoleDom', document);
                                VconsoleDom.forEach((item) => item.remove());
                            });
                        }
                    }),
            }),
            {
                name: 'app-app-store',
                storage: createJSONStorage(() => localStorage),
                partialize(state) {
                    return {
                        openEruda: state.openEruda,
                    };
                },
            },
        ),
    ),
);
