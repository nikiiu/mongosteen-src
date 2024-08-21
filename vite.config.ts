import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import { viteMockServe } from 'vite-plugin-mock'
import { svgsprites } from './vite_plugins/svgsprites'

// https://vitejs.dev/config/
export default defineConfig((env) => {
  const { command } = env
  return {
    server: {
      base: '/mongosteen-preview',
      proxy: {
        '/api/': {
          target: 'http://121.196.236.94:8080/',
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
