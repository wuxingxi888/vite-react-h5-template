import type React from 'react';

import { List } from 'antd-mobile';

import CustomNavBar from '@/components/CustomNavBar';

import useOpenInstall from '@/hooks/useOpenInstall';

const OpenInstall: React.FC = () => {
    const { openInstall } = useOpenInstall('3rqhu6');

    const onInstall = () => {
        openInstall?.install();
    };

    const onWakeup = () => {
        openInstall?.schemeWakeup();
    };

    const onWakeupOrInstall = () => {
        openInstall?.wakeupOrInstall();
    };
    return (
        <div>
            <CustomNavBar></CustomNavBar>
            <List mode="card">
                <List.Item description="调用此方法可安装APP" clickable onClick={onInstall}>
                    安装App
                </List.Item>
                <List.Item
                    description="调用此方法可在已安装情况下唤起APP"
                    clickable
                    onClick={onWakeup}
                >
                    唤起App
                </List.Item>
                <List.Item
                    description="调用此方法可唤起或安装APP"
                    clickable
                    onClick={onWakeupOrInstall}
                >
                    唤起或安装
                </List.Item>
            </List>
        </div>
    );
};
export default OpenInstall;
