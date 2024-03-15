<script setup lang="ts">
import {useCodeStore, useConfigsStore} from '@/store';
import CanvasToPng from 'canvas-to-png';

const store = useCodeStore();
const configs = useConfigsStore();

const options = [
  {
    label: 'PNG',
    value: 'png'
  },
  {
    label: 'SVG',
    value: 'svg'
  }
]

const downloadPng = async () => {
  try {
    const res = await fetch(store.svgUrl);
    const svgString = await res.text();
    // 将svg转换为canvas

    // TODO: 修复bugs
    const pngBuffer: HTMLElement = CanvasToPng.convertToPNG(svgString, 800, 600);
    downloadFile(pngBuffer, 'plantuml.png', 'image/png');
  } catch (e) {
    console.error(e);
    $message.error(`下载失败: ${e}`);
  }
}

const downloadFile = (data: BlobPart | HTMLElement, filename: string, type: string) => {
  const blob = new Blob([data], {type});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
</script>

<template>
  <div class="absolute top-0 right-0">
    <n-space vertical>
      <n-popselect v-model:value="configs.output" :options="options" trigger="click">
        <n-button>{{ configs.output || '弹出选择' }}</n-button>
      </n-popselect>
      <n-button type="primary" @click="downloadPng">下载图片</n-button>
    </n-space>
  </div>

  <n-image :src="store.svgUrl" alt="svg" class="w-full flex justify-center" v-if="store.svgUrl"/>
</template>

<style scoped>

</style>
