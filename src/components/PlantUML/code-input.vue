<script setup lang="ts">
import {useCodeStore, useConfigsStore} from '@/store'
import {onMounted, shallowRef, watch} from "vue";

import {debounce} from 'lodash-es';

// plantuml
import initMonaco from '@/utils/plantumlRegister';
import * as plantumlEncoder from 'plantuml-encoder';

const editorRef = shallowRef();

function formatCode() {
  editorRef.value?.getAction('editor.action.formatDocument').run();
}

const store = useCodeStore();
const config = useConfigsStore();

const options = {
  colorDecorators: true,
  lineHeight: 24,
  tabSize: 2,
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
}

onMounted(() => {
  $loadingBar.start();
  store.setLoading(true);
})

function ready(_e: unknown, _monaco: any) {
  $loadingBar.finish();
  store.setLoading(false);
  $message.success('Code Editor Initialization Complete!');
}

const onBeforeEditorMount = (monaco: any) => {
  // 防止重复注册
  if (
    !monaco.languages
      .getLanguages()
      .map((lang) => lang.id)
      .includes('mylang')
  ) {
    initMonaco(monaco);
    render(store.code_text);
  }
}

const render = (text: string) => {
  let svgUrl = config.baseUMLUrl;
  if (config.theme) {
    svgUrl += 'd';
  }
  const output = config.output === 'png' ? 'png/' : 'svg/';
  svgUrl += output + plantumlEncoder.encode(text);
  store.setSvgUrl(svgUrl);
}

const debouncedRender = debounce(render, 300);

watch(config, () => {
  render(store.code_text);
}, {
  deep: true,
});
</script>

<template>
  <n-flex verticle>
    <vue-monaco-editor
      v-model:value="store.code_text"
      :options="options"
      height="100%"
      width="100%"
      @beforeMount="onBeforeEditorMount"
      @mount="ready"
      @change="debouncedRender"
      language="plantuml"
      :theme="config.theme ?  'plantuml-theme-dark' : 'plantuml-theme'"
    >
      <template #default>
        <span></span>
      </template>
    </vue-monaco-editor>
  </n-flex>

</template>

<style scoped>

</style>
