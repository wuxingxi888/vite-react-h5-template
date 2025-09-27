/**
 * @name configVisualizerConfig
 * @description 打包体积分析
 */
import { visualizer } from 'rollup-plugin-visualizer';
import type { Plugin } from 'vite';

export function configVisualizerConfig() {
    return visualizer({
        filename: './node_modules/.cache/visualizer/stats.html',
        open: true,
        gzipSize: true,
        // brotliSize: true
    }) as Plugin;
}
