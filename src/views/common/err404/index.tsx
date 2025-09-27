import { Button, ErrorBlock } from 'antd-mobile';

import { useRouter } from '@/hooks/useRouter';

function Err404() {
    const router = useRouter();

    return (
        <div className="w-full h-screen bg-white dark:bg-black flex justify-center">
            <ErrorBlock fullPage>
                <Button block color="primary" onClick={() => router.back()}>
                    返回
                </Button>
            </ErrorBlock>
        </div>
    );
}

export default Err404;
