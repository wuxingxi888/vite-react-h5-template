// 检测是否加载了 script脚本 文件
export const checkIsLoadScript = (src: string): boolean => {
    const scriptObjs = document.getElementsByTagName('script');
    const targetSrc = new URL(src, window.location.href).href;
    for (const sObj of scriptObjs) {
        if (sObj.src === targetSrc) {
            return true;
        }
    }
    return false;
};

// 异步加载script脚本
export const asyncLoadScript = async ({ src, id }: { src: string; id: string }): Promise<void> => {
    const targetSrc = new URL(src, window.location.href).href;
    const currentScript = document.getElementById(id) as HTMLScriptElement | null;

    if (currentScript?.src === targetSrc) {
        return;
    }

    if (currentScript) {
        currentScript.remove();
    }

    const isLoad = await checkIsLoadScript(src);
    return new Promise((resolve) => {
        if (isLoad) {
            const loadedScript = Array.from(document.getElementsByTagName('script')).find(
                (script) => script.src === targetSrc,
            );
            if (loadedScript) {
                loadedScript.id = id;
            }
            resolve();
        } else {
            const scriptNode = document.createElement('script');
            scriptNode.setAttribute('type', 'text/javascript');
            scriptNode.setAttribute('charset', 'utf-8');
            scriptNode.setAttribute('id', id);
            scriptNode.setAttribute('src', targetSrc);
            document.body.appendChild(scriptNode);
            scriptNode.onload = () => {
                resolve();
            };
            scriptNode.onerror = () => {
                scriptNode.remove();
                resolve();
            };
        }
    });
};

// 移除 script标签
export const removeScript = (id: string): Promise<void> => {
    return new Promise((resolve) => {
        const dom = document.getElementById(id) as HTMLScriptElement;
        if (dom) {
            dom.remove();
        }
        resolve();
    });
};
