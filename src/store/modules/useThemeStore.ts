import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { type IThemeState, setting } from '@/utils/const/theme';

type Action = {
    setThemeMode: (mode: 'light' | 'dark') => void;
    setThemeColor: (color: string) => void;
    setIsPageAnimate: (isPageAnimate: boolean) => void;
    setPageAnimateType: (type: string) => void;
};

const { themeMode, themeColor, themeColorList, isPageAnimate, pageAnimateType } = setting;

const useThemeStore = create<IThemeState & Action>()(
    immer(
        persist(
            (set) => ({
                themeMode,
                themeColor,
                themeColorList,
                isPageAnimate,
                pageAnimateType,
                setThemeMode: (mode) =>
                    set((state) => {
                        state.themeMode = mode;
                    }),
                setThemeColor: (color) =>
                    set((state) => {
                        state.themeColor = color;
                    }),
                setIsPageAnimate: (isPageAnimate) =>
                    set((state) => {
                        state.isPageAnimate = isPageAnimate;
                    }),
                setPageAnimateType: (type) =>
                    set((state) => {
                        state.pageAnimateType = type;
                    }),
            }),
            {
                name: 'app-theme-store',
                storage: createJSONStorage(() => localStorage),
                partialize(state) {
                    return {
                        themeMode: state.themeMode,
                        themeColor: state.themeColor,
                        isPageAnimate: state.isPageAnimate,
                        pageAnimateType: state.pageAnimateType,
                    };
                },
            },
        ),
    ),
);

export default useThemeStore;
