import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import devServer from '@hono/vite-dev-server'
import build from '@hono/vite-build/cloudflare-pages'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(({ mode }) => {
    if (mode === 'client') {
        return {
            plugins: [react()],
            build: {
                outDir: 'dist',
<<<<<<< HEAD
                chunkSizeWarningLimit: 600,
                rollupOptions: {
                    output: {
                        manualChunks: {
                            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                            'xstate-vendor': ['xstate', '@xstate/react'],
                            'motion-vendor': ['motion'],
                        },
                    },
                },
            },
            esbuild: {
                logOverride: { 'css-syntax-error': 'silent' },
            },
            css: {
                postcss: './postcss.config.js',
=======
                chunkSizeWarningLimit: 500,
                rollupOptions: {
                    output: {
                        manualChunks(id) {
                            if (id.indexOf('node_modules') !== -1) {
                                return id.toString().split('node_modules/')[1].split('/')[0].toString();
                            }
                        }
                    }
                }
>>>>>>> 3e03fc60d311899ce07700181ff6b72c3def2aa9
            },
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, './src'),
                    'xstate': path.resolve(__dirname, 'node_modules/xstate'),
                    '@xstate/react': path.resolve(__dirname, 'node_modules/@xstate/react'),
                },
                dedupe: ['xstate', '@xstate/react', 'react', 'react-dom'],
            },
            optimizeDeps: {
                exclude: ['@datakit/cloudflare-login'],
            },
        }
    } else {
        return {
            plugins: [
                build({
                    entry: 'src/server/index.ts',
                })
            ],
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, './src'),
                    'xstate': path.resolve(__dirname, 'node_modules/xstate'),
                    '@xstate/react': path.resolve(__dirname, 'node_modules/@xstate/react'),
                },
                dedupe: ['xstate', '@xstate/react', 'react', 'react-dom'],
            },
            optimizeDeps: {
                exclude: ['@datakit/cloudflare-login'],
            },
            ssr: {
                noExternal: ['@datakit/cloudflare-login', 'xstate', '@xstate/react'],
            },
        }
    }
})
