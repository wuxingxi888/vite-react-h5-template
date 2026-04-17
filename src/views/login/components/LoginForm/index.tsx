import { useCallback, useState } from 'react';

import { Button, Form, Input, Switch } from 'antd-mobile';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';

import ClassIcon from '@/components/ClassIcon';

import { useRouter } from '@/hooks/useRouter';

import { LoginStateEnum } from '../../index';
import styles from './index.module.scss';

interface LoginFormData {
    username: string;
    password: string;
    rememberMe?: boolean;
}

interface LoginFormProps {
    onStateChange: (state: LoginStateEnum) => void;
}

// 模拟登录 API 延迟
const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const LoginForm: React.FC<LoginFormProps> = ({ onStateChange }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(true);
    const router = useRouter();

    const handlePasswordToggle = useCallback(() => {
        setVisible((prev) => !prev);
    }, []);

    const handleRememberMeChange = useCallback((checked: boolean) => {
        setRememberMe(checked);
    }, []);

    const handleForgotPassword = useCallback(() => {
        onStateChange(LoginStateEnum.RESET_PASSWORD);
    }, [onStateChange]);

    const handleGoToRegister = useCallback(() => {
        onStateChange(LoginStateEnum.REGISTER);
    }, [onStateChange]);

    const handleLogin = useCallback(
        async (values: LoginFormData) => {
            setLoading(true);
            try {
                console.log('登录表单数据:', values);
                // 模拟登录请求
                await sleep(3000);
                // TODO: 替换为实际的登录 API
                // await loginApi(values);
                router.push('/home');
            } catch (error) {
                console.error('登录失败:', error);
            } finally {
                setLoading(false);
            }
        },
        [router],
    );

    return (
        <Form
            className={styles.loginForm}
            form={form}
            layout="horizontal"
            onFinish={handleLogin}
            initialValues={{
                username: 'admin',
                password: '123456',
                rememberMe: true,
            }}
            footer={
                <>
                    <Button
                        className="enter-y"
                        block
                        type="submit"
                        color="primary"
                        size="large"
                        loading={loading}
                    >
                        登录
                    </Button>

                    <Button
                        className="enter-y"
                        block
                        fill="outline"
                        color="primary"
                        size="large"
                        onClick={handleGoToRegister}
                    >
                        注册
                    </Button>
                </>
            }
        >
            <Form.Item
                className="enter-y"
                name="username"
                label={<ClassIcon name="i-ph:user-bold" />}
                rules={[
                    { required: true, message: '用户名不能为空' },
                    { min: 3, message: '用户名至少3个字符' },
                ]}
            >
                <Input placeholder="请输入用户名" />
            </Form.Item>

            <Form.Item
                className="enter-y"
                name="password"
                label={<ClassIcon name="i-iconamoon:lock-bold" />}
                extra={
                    <div className="cursor-pointer">
                        {visible ? (
                            <EyeOutline onClick={handlePasswordToggle} />
                        ) : (
                            <EyeInvisibleOutline onClick={handlePasswordToggle} />
                        )}
                    </div>
                }
                rules={[
                    { required: true, message: '密码不能为空' },
                    { min: 6, message: '密码至少6个字符' },
                ]}
            >
                <Input type={visible ? 'text' : 'password'} placeholder="请输入密码" clearable />
            </Form.Item>

            <div className="login-options enter-y">
                <div className="remember-me">
                    <Switch checked={rememberMe} onChange={handleRememberMeChange} />
                    <span className="remember-text">记住我</span>
                </div>
                <button type="button" className="forgot-password" onClick={handleForgotPassword}>
                    忘记密码?
                </button>
            </div>
        </Form>
    );
};

export default LoginForm;
