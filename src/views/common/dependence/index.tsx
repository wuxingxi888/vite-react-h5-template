import { List } from 'antd-mobile';

import CustomNavBar from '@/components/CustomNavBar';

const Dependence: React.FC = () => {
    const { pkg, lastBuildTime } = __APP_INFO__;

    const { dependencies, devDependencies, name, version } = pkg;

    return (
        <div className="w-full h-full p2">
            <CustomNavBar></CustomNavBar>

            <List mode="card" header={'基本信息'}>
                <List.Item extra={name}>项目名称</List.Item>
                <List.Item extra={version}>项目版本</List.Item>
                <List.Item extra={lastBuildTime}>最后编译时间</List.Item>
            </List>

            <List mode="card" header={'生产环境依赖'}>
                {Object.entries(dependencies).map(([key, value]) => (
                    <List.Item key={key} extra={value}>
                        {key}
                    </List.Item>
                ))}
            </List>

            <List mode="card" header={'开发环境依赖'}>
                {Object.entries(devDependencies).map(([key, value]) => (
                    <List.Item key={key} extra={value}>
                        {key}
                    </List.Item>
                ))}
            </List>
        </div>
    );
};

export default Dependence;
