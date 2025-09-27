import type React from 'react';

import { Divider, Grid } from 'antd-mobile';

import CustomNavBar from '@/components/CustomNavBar';
import Icon from '@/components/SvgIcon';

const SvgDemo: React.FC = () => {
    const svgList = ['logo', 'email', 'excel', 'img', 'mobile', 'pc', 'pdf', 'sdk', 'wps'];

    return (
        <div className="w-full h-full">
            <CustomNavBar></CustomNavBar>

            <Divider>提示：svg图标存放在assets/svgs目录下</Divider>

            <Grid columns={4} gap={8}>
                {svgList.map((item) => (
                    <Grid.Item key={item} className="flex justify-center items-center">
                        <Icon name={item} className="!h-40px !w-40px" />
                    </Grid.Item>
                ))}
            </Grid>
        </div>
    );
};

export default SvgDemo;
