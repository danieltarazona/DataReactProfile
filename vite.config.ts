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
            },
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, './src'),
                },
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
                },
            },
        }
    }
})
