import Logo from '@/components/Logo';

import { useEnv } from '@/hooks/useEnv';

function LoginTitle() {
    const { getEnvConfig } = useEnv();

    const { title } = getEnvConfig();

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="logo enter-x mb-8 mt-8">
                <Logo className="!h-20 !w-20" />
            </div>
            <div className="text-darkBlue dark:text-garyWhite enter-x mb-12 text-2xl font-black">
                {title}
            </div>
        </div>
    );
}

export default LoginTitle;
