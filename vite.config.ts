import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// autoimport & naiveui
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

// unocss
import UnoCSS from 'unocss/vite';
import { presetAttributify, presetUno } from 'unocss'; // Presets

// compression
import ViteCompressionPlugin from 'vite-plugin-compression';

// visualizer
import visualizer from 'rollup-plugin-visualizer';

// eslint
import eslintPlugin from '@nabla/vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      presets: [presetAttributify(), presetUno()]
    }),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ]
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    }),
    eslintPlugin(),
    ViteCompressionPlugin({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url))
    }
  }
});
