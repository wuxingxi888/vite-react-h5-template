import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

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
