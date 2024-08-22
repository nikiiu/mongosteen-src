import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import { viteMockServe } from 'vite-plugin-mock'
import { svgsprites } from './vite_plugins/svgsprites'

// https://vitejs.dev/config/
export default defineConfig((env) => {
  const { command } = env
  return {
    base: './',
    server: {
      proxy: {
        '/api/': {
          target: 'https://mangosteen2.hunger-valley.com',
          changeOrigin: true,
        },
      }
    },
    define: {
      isDev: command === 'serve'
    },
    plugins: [
      Unocss(),
      react(),
      viteMockServe(),
      svgsprites({ noOptimizeList: ['logo', 'chart', 'category', 'export', 'noty', 'calendar', 'pig'] })
    ]
  }
})
