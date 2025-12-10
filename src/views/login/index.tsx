import { useEffect, useState } from 'react';

import ThemeToggle from '@/components/ThemeToggle';

import ForgetPasswordForm from './ForgetPasswordForm';
import LoginForm from './LoginForm';
import LoginTitle from './LoginTitle';
import LoginWave from './LoginWave';
import RegisterForm from './RegisterForm';

export const LoginStateEnum = {
    LOGIN: 0,
    REGISTER: 1,
    RESET_PASSWORD: 2,
} as const;

export type LoginStateEnum = (typeof LoginStateEnum)[keyof typeof LoginStateEnum];

function Login() {
    const [currentState, setCurrentState] = useState<LoginStateEnum>(LoginStateEnum.LOGIN);

    useEffect(() => {
        // 组件挂载和卸载时的清理逻辑可以在这里添加
        return () => {
            // 清理逻辑
        };
    }, []);
    const renderForm = () => {
        switch (currentState) {
            case LoginStateEnum.LOGIN:
                return <LoginForm onStateChange={setCurrentState} />;
            case LoginStateEnum.REGISTER:
                return <RegisterForm onStateChange={setCurrentState} />;
            case LoginStateEnum.RESET_PASSWORD:
                return <ForgetPasswordForm onStateChange={setCurrentState} />;
            default:
                return <LoginForm onStateChange={setCurrentState} />;
        }
    };

    return (
        <div className="h-screen flex justify-center p-8">
            <div className="w-full flex flex-col">
                <div className="absolute top-6 right-8">
                    <ThemeToggle />
                </div>
                <LoginTitle></LoginTitle>
                {renderForm()}
            </div>
            <LoginWave></LoginWave>
        </div>
    );
}

export default Login;
