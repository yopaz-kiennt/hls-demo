import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
    const isProduction = mode === 'production' ? true : false;

    return {
        plugins: [
            laravel({
                input: 'resources/js/app.js',
                refresh: true,
            }),
            vue({
                template: {
                    transformAssetUrls: {
                        base: null,
                        includeAbsolute: false,
                    },
                },
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'resources/js'),
                '@css': path.resolve(__dirname, 'resources/css'),
                '@sass': path.resolve(__dirname, 'resources/sass'),
            },
        },
        server: {
            https: isProduction ? true : false,
            host: true,
            strictPort: true,
            port: 5173,
            hmr: {
                host: 'localhost',
                protocol: 'ws',
            },
            watch: {
                usePolling: true,
            },
        },
    };
});
