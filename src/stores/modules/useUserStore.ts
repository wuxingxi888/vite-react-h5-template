import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type UserInfo = {
    username: string;
    avatar: string;
};

interface State {
    token: string;
    userInfo: UserInfo;
}

type Action = {
    updateToken: (token: string) => void;
    updateUserName: (username: string) => void;
    updateUserInfo?: (userInfo: UserInfo) => void;
};

// 创建带有Immer中间件的zustand存储
export const useUserStore = create<State & Action>()(
    immer(
        persist(
            (set) => ({
                token: '',
                userInfo: { username: 'react', avatar: 'https://picsum.photos/200/300' },
                updateToken: (token) =>
                    set((state) => {
                        state.token = token;
                    }),
                updateUserName: (username) =>
                    set((state) => {
                        state.userInfo.username = username;
                    }),
            }),
            {
                name: 'app-user-store',
                storage: createJSONStorage(() => localStorage),
                partialize(state) {
                    return {
                        token: state.token,
                        userInfo: state.userInfo,
                    };
                },
            },
        ),
    ),
);
