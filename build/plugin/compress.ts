import type { PluginOption } from 'vite'
import compressPlugin from 'vite-plugin-compression'

export function configCompressPlugin(
    compress: 'gzip' | 'brotli' | 'none',
    deleteOriginFile = false
): PluginOption | PluginOption[] {
    const compressList = compress.split(',')

    const plugins: PluginOption[] = []

    if (compressList.includes('gzip')) {
        plugins.push(
            compressPlugin({
                ext: '.gz',
                deleteOriginFile
            })
        )
    }

    if (compressList.includes('brotli')) {
        plugins.push(
            compressPlugin({
                ext: '.br',
                algorithm: 'brotliCompress',
                deleteOriginFile
            })
        )
    }
    return plugins
}
