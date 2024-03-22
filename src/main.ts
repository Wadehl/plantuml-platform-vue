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

import {
  loader,
  install as VueMonacoEditorPlugin
} from '@guolao/vue-monaco-editor';

import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import PUmlWorker from '@sinm/monaco-plantuml/lib/puml.worker?worker';

const worker = new PUmlWorker();

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker();
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker();
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker();
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker();
    }
    if (label === 'plantuml' || label === 'puml') {
      return worker;
    }
    return new editorWorker();
  }
};

loader.config({ monaco });

// 公共组件
import AppProvider from '@/components/AppProvider/index.vue';

const app = createApp(App);

app
  .component('AppProvider', AppProvider)
  .use(pinia)
  .use(VueMonacoEditorPlugin, {})
  .use(i18n)
  .mount('#app');
