interface Options {
    timer?: number;
}

export class Updater {
    oldScript: string[]; // 存储第一次值也就是script 的hash 信息

    newScript: string[]; // 获取新的值 也就是新的script 的hash信息

    dispatch: Record<string, Array<() => void>>; // 小型发布订阅通知用户更新了

    timer: NodeJS.Timeout | null = null;

    constructor(options: Options) {
        this.oldScript = [];
        this.newScript = [];
        this.dispatch = {};
        void this.start(options?.timer);
    }

    async start(time?: number): Promise<void> {
        await this.init();
        this.timing(time);
    }

    async init(): Promise<void> {
        try {
            const html: string = await this.getHtml();
            this.oldScript = this.parseScript(html);
        } catch (error) {
            console.error('Error initializing Updater:', error);
        }
    }

    async getHtml(): Promise<string> {
        const baseUrl = new URL(import.meta.env.BASE_URL, window.location.origin);
        const html = await fetch(baseUrl.toString(), { cache: 'no-store' }).then((res) =>
            res.text(),
        );
        return html;
    }

    parseScript(html: string): string[] {
        const reg = new RegExp(/<script(?:\s+[^>]*)?>(.*?)<\/script\s*>/gi); // script正则
        return html.match(reg) ?? []; // 匹配script标签
    }

    // 发布订阅通知
    on(key: 'no-update' | 'update', fn: () => void): this {
        (this.dispatch[key] || (this.dispatch[key] = [])).push(fn);
        return this;
    }

    compare(oldArr: string[], newArr: string[]): void {
        const base = oldArr.length;
        const arr = Array.from(new Set(oldArr.concat(newArr)));
        // 如果新旧length一样无更新
        if (arr.length === base) {
            this.dispatch['no-update']?.forEach((fn) => fn());
        } else {
            // 否则通知更新
            this.dispatch.update?.forEach((fn) => fn());
            this.oldScript = [...newArr];
        }
    }

    timing(time = 10000): void {
        // 轮询
        this.timer = setInterval(async () => {
            try {
                const newHtml = await this.getHtml();
                this.newScript = this.parseScript(newHtml);
                this.compare(this.oldScript, this.newScript);
            } catch (error) {
                console.error('Error during polling:', error);
            }
        }, time);
    }

    // 取消轮询
    stopTiming(): void {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
}
