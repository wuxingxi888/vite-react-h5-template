/**
 * Package file volume analysis
 */
import visualizer from 'rollup-plugin-visualizer'

export function configVisualizerConfig(VITE_REPORT) {
    if (VITE_REPORT) {
        return visualizer({
            filename: './node_modules/.cache/visualizer/stats.html',
            open: true,
            gzipSize: true,
            brotliSize: true
        })
    } else {
        return []
    }
}
