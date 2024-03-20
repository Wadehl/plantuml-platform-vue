<script setup lang="ts">
import {useCodeStore, useConfigsStore} from '@/store'
import {ref, onMounted, shallowRef, watch} from "vue";

import {useI18n} from "vue-i18n";

import {debounce} from 'lodash-es';
import {useClipboard} from "@vueuse/core";

// plantuml
import initMonaco from '@/utils/plantumlRegister';
import * as plantumlEncoder from 'plantuml-encoder';

import {CopySelect20Regular as CopyIcon, ArrowUpload20Filled as UploadIcon} from '@vicons/fluent';

import Operation from "./components/Operation.vue";

const {t} = useI18n();

const editorRef = shallowRef();

const store = useCodeStore();
const config = useConfigsStore();

const {copy, isSupported} = useClipboard({
  source: store.code_text,
});

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
      .map((lang: { id: string }) => lang.id)
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

const copied = ref('');
const copy_failed = ref('');

onMounted(() => {
  copied.value = t('copied');
  copy_failed.value = t('copy_failed');
})


const handleCopy = () => {
  if (isSupported) {
    copy();
    $message.success(copied);
  } else {
    $message.error(copy_failed);
  }
}

const opacity = ref(0);

const uploadCode = async () => {
  /**
   * 上传代码文件，保存到store.code_text
   * Accept: .puml, .plantuml, .txt, .json
   */
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.puml, .plantuml, .txt, .json';
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        return new Promise((resolve, reject) => {
          if (e.target?.result) {
            store.code_text = e.target?.result as string;
            render(store.code_text);
            resolve(null);
            $message.success('File uploaded successfully');
          } else {
            reject(null);
            $message.error('File upload failed');
          }
        });
      }
      reader.readAsText(file);
    }
  }
  input.click();
}
</script>

<template>
  <div class="position-relative">
    <div class="position-absolute top-3% right-13% z-100"
         hover="transition-all duration-300 ease-in-out opacity-100"
         :class="[`opacity-${opacity * 100}`]"
    >
      <n-space>
        <Operation
          :icon="CopyIcon"
          key="copy"
          @event="handleCopy"
          />
        <Operation
          :icon="UploadIcon"
          key="upload_code"
          @event="uploadCode"
        />
      </n-space>
    </div>
    <vue-monaco-editor
      ref="editorRef"
      v-model:value="store.code_text"
      :options="options"
      height="100%"
      width="100%"
      @beforeMount="onBeforeEditorMount"
      @mount="ready"
      @change="debouncedRender"
      language="plantuml"
      :theme="config.theme ?  'plantuml-theme-dark' : 'plantuml-theme'"
      @mouseenter="opacity = 1"
      @mouseleave="opacity = 0"
    >
      <template #default>
        <span></span>
      </template>
    </vue-monaco-editor>
  </div>
</template>

<style scoped>

</style>
