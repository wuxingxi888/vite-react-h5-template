/**
 * @name configCdnImportPlugin
 * @description 生产环境配置cdn
 * UNPKG：https://unpkg.com
 * jsDelivr ：https://www.jsdelivr.com
 */
import { Plugin as importToCDN } from 'vite-plugin-cdn-import';

export const configCdnImportPlugin = () => {
    return importToCDN({
        modules: [
            {
                name: 'react',
                var: 'React',
                path: 'https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js',
            },
            {
                name: 'react-dom',
                var: 'ReactDOM',
                path: 'https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js',
            },
        ],
    });
};
