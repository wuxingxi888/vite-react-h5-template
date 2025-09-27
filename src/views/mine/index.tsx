import { useState } from 'react';

import { ActionSheet, Divider, Image, List } from 'antd-mobile';

import ClassIcon from '@/components/ClassIcon';

import { useRouter } from '@/hooks/useRouter';

import './index.scss';

function RenderBanner() {
    return <Image className="banner !h-70 !w-full" lazy src={'https://cdn.seovx.com/d/?mom=302'} />;
}

function RenderCell() {
    const router = useRouter();

    const [logoutModal, setLogoutModal] = useState(false);

    const MENU_ITEMS = [
        { label: '个人信息', icon: 'i-mingcute:idcard-fill', onClick: () => {} },
        { label: '账号与安全', icon: 'i-material-symbols:account-box', onClick: () => {} },
        {
            label: '主题设置',
            icon: 'i-material-symbols:palette',
            onClick: () => {
                router.push('/themeSetting');
            },
        },
        { label: '隐私政策', icon: 'i-material-symbols:list-alt-rounded', onClick: () => {} },
        {
            label: '退出登录',
            icon: 'i-solar:logout-3-bold',
            onClick: () => {
                setLogoutModal(true);
            },
        },
    ];
    return (
        <div className="my-card light:!bg-transparent relative mx-6 flex flex-col items-center rounded-2xl pb-2 shadow-xl -top-18">
            <Image
                className="!h-22 !w-22 !border-2 !border-solid !absolute !-top-10 rounded-full"
                fit="cover"
                src={'https://cdn.jsdelivr.net/gh/wuxingxi888/CDN_IMG_BED/avatar.jpg'}
            />

            <div className="mt-14 flex flex-col items-center">
                <p className="mb-2 text-5 font-black">{'牛马日常'}</p>
                <p className="text-4">{'在当牛和做马之间，选择了牛马'}</p>
            </div>

            <Divider className="w-full !border-[#ebedf0] dark:!b-black"></Divider>

            <List mode="card" className="w-full">
                {MENU_ITEMS.map((item) => (
                    <List.Item
                        key={item.label}
                        className="enter-y"
                        prefix={<ClassIcon name={item.icon} className="text-[20px]" />}
                        onClick={() => item.onClick()}
                    >
                        {item.label}
                    </List.Item>
                ))}
            </List>

            <ActionSheet
                extra="确认退出登录吗"
                cancelText="取消"
                visible={logoutModal}
                actions={[
                    {
                        text: '退出登录',
                        key: 'logout',
                        onClick: () => {
                            router.replace('/login');
                        },
                    },
                ]}
                onClose={() => setLogoutModal(false)}
            />
        </div>
    );
}

function Mine() {
    return (
        <div className="mine-warp">
            <RenderBanner></RenderBanner>
            <RenderCell></RenderCell>
        </div>
    );
}

export default Mine;
