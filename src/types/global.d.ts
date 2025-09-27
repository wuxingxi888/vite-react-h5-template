declare type Recordable<T = any> = Record<string, T>;

declare type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T;
};

declare const __APP_INFO__: {
    pkg: {
        name: string;
        version: string;
        dependencies: Recordable<string>;
        devDependencies: Recordable<string>;
    };
    lastBuildTime: string;
};

declare interface Window {
    webkit: any;
    NativeCallJs: any;
    VConsole: any;
}
