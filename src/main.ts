import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import 'virtual:uno.css';

import pinia from './store';
import i18n from './locales';

// 通用字体
import 'vfonts/Roboto.css';
// 等宽字体
import 'vfonts/FiraCode.css';

// monaco-vue
import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor';

// 公共组件
import AppProvider from '@/components/AppProvider/index.vue';

createApp(App)
  .component('AppProvider', AppProvider)
  .use(pinia)
  .use(VueMonacoEditorPlugin, {
    paths: {
      vs: 'https://cdn.bootcdn.net/ajax/libs/monaco-editor/0.43.0/min/vs'
    }
  })
  .use(i18n)
  .mount('#app');
