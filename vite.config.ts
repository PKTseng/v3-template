import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_APP_PROXY, VITE_APP_BASE_URL } = loadEnv(mode, process.cwd())

  return {
    base: VITE_APP_BASE_URL,
    plugins: [
      vue({
        template: { transformAssetUrls }
      }),
      checker({
        vueTsc: {
          /** tsconfig 當前為增量建構，所以此處要指定使用特定的 config */
          tsconfigPath: './tsconfig.app.json'
        }
      }),
      vueJsx(),
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
      vuetify({
        autoImport: true
      }),
      ViteFonts({
        google: {
          families: [
            {
              name: 'Roboto',
              styles: 'wght@100;300;400;500;700;900'
            }
          ]
        }
      })
    ],
    define: { 'process.env': {} },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 3005,
      proxy: {
        '/bms': {
          target: VITE_APP_PROXY,
          changeOrigin: true,
          rewrite: (path) => {
            console.log(`[request proxy to] ${VITE_APP_PROXY}${path}`)
            return path
          }
        }
      }
    }
  }
})
