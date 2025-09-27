import { useCallback, useState } from 'react';

import { Button, Form, Input } from 'antd-mobile';

import ClassIcon from '@/components/ClassIcon';

import { LoginStateEnum } from '../index';
import './index.scss';

interface ForgetPasswordFormData {
    username: string;
    mobile: string;
    sms: string;
}

interface ForgetPasswordFormProps {
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

const ForgetPasswordForm: React.FC<ForgetPasswordFormProps> = ({ onStateChange }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [smsLoading, setSmsLoading] = useState<boolean>(false);
    const [countdown, setCountdown] = useState<number>(0);

    const handleBackToLogin = useCallback(() => {
        onStateChange(LoginStateEnum.LOGIN);
    }, [onStateChange]);

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

    const handleSubmit = async (values: ForgetPasswordFormData) => {
        setLoading(true);
        try {
            console.log('忘记密码表单数据:', values);
            // TODO: 实现忘记密码逻辑
            await new Promise((resolve) => setTimeout(resolve, 2000));
            onStateChange(LoginStateEnum.LOGIN);
        } catch (error) {
            console.error('提交失败:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            className="forget-password-warp"
            form={form}
            layout="horizontal"
            onFinish={handleSubmit}
            initialValues={{
                username: 'admin',
                mobile: '12345678900',
                sms: '123456',
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
                        重置密码
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
        </Form>
    );
};

export default ForgetPasswordForm;
