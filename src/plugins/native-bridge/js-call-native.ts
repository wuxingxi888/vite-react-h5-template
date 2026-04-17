import router from '@/routes';
import { judgeSystem } from '@/utils/browserUtils';

type AndroidBridge = {
    back?: () => void;
    xxx?: (type: number, url: string) => void;
    vvv?: () => void;
};

const { isAndroid, isiOS, isRealMobile } = judgeSystem();

function getAndroidBridge(appKey: string): AndroidBridge | undefined {
    return (window as unknown as Record<string, AndroidBridge | undefined>)[appKey];
}

/**
 * @description: 封装js调用原生App的方法
 */
export default class JsCallNative {
    static AppKey = 'android';

    /**
     * @description: 返回
     */
    static back() {
        try {
            if (!isRealMobile) {
                router.navigate(-1);
                return;
            }

            if (isAndroid) {
                getAndroidBridge(this.AppKey)?.back?.();
                return;
            }

            if (isiOS) {
                window.webkit.messageHandlers.back.postMessage({});
                return;
            }
        } catch (error) {
            router.navigate(-1);
            console.log(error);
        }

        router.navigate(-1);
    }

    /**
     * @description: xxxx
     * @param {number} type 0:xx 1:微信 2:xx
     * @param {string} url xxx
     * @return {*}
     */
    static xxx(type: number, url: string) {
        try {
            if (isAndroid) {
                getAndroidBridge(this.AppKey)?.xxx?.(type, url);
            }

            if (isiOS) {
                window.webkit.messageHandlers.xxx.postMessage({ type, url });
            }
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * @description: xxxx 无参数
     * @return {*}
     */
    static vvv() {
        try {
            if (isAndroid) {
                getAndroidBridge(this.AppKey)?.vvv?.();
            }
            if (isiOS) {
                window.webkit.messageHandlers.vvv.postMessage({});
            }
        } catch (error) {
            console.log(error);
        }
    }
}
