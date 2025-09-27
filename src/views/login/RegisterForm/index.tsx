import { useCallback, useState } from 'react';

import { Button, Checkbox, Form, Input } from 'antd-mobile';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';

import ClassIcon from '@/components/ClassIcon';

import { LoginStateEnum } from '../index';
import './index.scss';

interface RegisterFormData {
    username: string;
    mobile: string;
    sms: string;
    password: string;
    confirmPassword: string;
    policy: boolean;
}

interface RegisterFormProps {
    onStateChange: (state: LoginStateEnum) => void;
}

// 模拟发送短信验证码
const sendSmsCode = (mobile: string): Promise<void> =>
    new Promise((resolve) =>
        setTimeout(() => {
            console.log(`发送验证码到 ${mobile}`);
            resolve();
        }, 1000),
    );

const RegisterForm: React.FC<RegisterFormProps> = ({ onStateChange }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [smsLoading, setSmsLoading] = useState<boolean>(false);
    const [countdown, setCountdown] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>(false);
    const [confirmVisible, setConfirmVisible] = useState<boolean>(false);

    const handleBackToLogin = useCallback(() => {
        onStateChange(LoginStateEnum.LOGIN);
    }, [onStateChange]);

    const handlePasswordToggle = useCallback(() => {
        setVisible((prev) => !prev);
    }, []);

    const handleConfirmPasswordToggle = useCallback(() => {
        setConfirmVisible((prev) => !prev);
    }, []);

    const handleSendSms = useCallback(async () => {
        // 单独校验mobile字段
        await form.validateFields(['mobile']);

        const mobile = form.getFieldValue('mobile');
        if (!mobile) {
            console.error('请先输入手机号');
            return;
        }

        setSmsLoading(true);
        try {
            await sendSmsCode(mobile);
            setCountdown(60);
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } catch (error) {
            console.error('发送验证码失败:', error);
        } finally {
            setSmsLoading(false);
        }
    }, [form]);

    const handleSubmit = async (values: RegisterFormData) => {
        setLoading(true);
        try {
            console.log('注册表单数据:', values);
            // TODO: 实现注册逻辑
            await new Promise((resolve) => setTimeout(resolve, 2000));
            onStateChange(LoginStateEnum.LOGIN);
        } catch (error) {
            console.error('注册失败:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            className="register-warp"
            form={form}
            layout="horizontal"
            onFinish={handleSubmit}
            initialValues={{
                username: '',
                mobile: '',
                sms: '',
                password: '',
                confirmPassword: '',
                policy: false,
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
                        注册
                    </Button>

                    <Button
                        className="enter-y"
                        block
                        fill="outline"
                        color="primary"
                        size="large"
                        onClick={handleBackToLogin}
                    >
                        返回登录
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
                name="mobile"
                label={<ClassIcon name="i-ph:phone-bold" />}
                rules={[
                    { required: true, message: '手机号不能为空' },
                    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
                ]}
            >
                <Input placeholder="请输入手机号" type="tel" />
            </Form.Item>

            <Form.Item
                className="enter-y"
                name="sms"
                label={<ClassIcon name="i-ph:shield-check-bold" />}
                extra={
                    <Button
                        className="w-[80px] !p-3px"
                        size="small"
                        color="primary"
                        loading={smsLoading}
                        disabled={countdown > 0}
                        onClick={handleSendSms}
                    >
                        {countdown > 0 ? `${countdown}s` : '获取验证码'}
                    </Button>
                }
                rules={[
                    { required: true, message: '验证码不能为空' },
                    { len: 6, message: '验证码为6位数字' },
                ]}
            >
                <Input placeholder="请输入验证码" maxLength={6} />
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

            <Form.Item
                className="enter-y"
                name="confirmPassword"
                label={<ClassIcon name="i-iconamoon:lock-bold" />}
                extra={
                    <div className="cursor-pointer">
                        {confirmVisible ? (
                            <EyeOutline onClick={handleConfirmPasswordToggle} />
                        ) : (
                            <EyeInvisibleOutline onClick={handleConfirmPasswordToggle} />
                        )}
                    </div>
                }
                rules={[
                    { required: true, message: '确认密码不能为空' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('两次输入的密码不一致'));
                        },
                    }),
                ]}
            >
                <Input
                    type={confirmVisible ? 'text' : 'password'}
                    placeholder="请确认密码"
                    clearable
                />
            </Form.Item>

            <Form.Item
                className="enter-y"
                name="policy"
                valuePropName="checked"
                rules={[
                    {
                        required: true,
                        message: '勾选后才能注册',
                    },
                    {
                        validator: (_, value) => {
                            if (value === true) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('请阅读并同意用户协议'));
                        },
                    },
                ]}
            >
                <Checkbox>
                    <div className="register-options">
                        <span className="policy-text">
                            我已阅读并同意
                            <button type="button" className="policy-link">
                                《用户协议》
                            </button>
                        </span>
                    </div>
                </Checkbox>
            </Form.Item>
        </Form>
    );
};

export default RegisterForm;
