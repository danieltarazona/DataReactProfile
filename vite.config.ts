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
