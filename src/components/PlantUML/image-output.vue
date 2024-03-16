<script setup lang="ts">
import {ref} from 'vue';
import {useCodeStore, useConfigsStore} from '@/store';

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
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = `data:image/svg+xml;base64,${btoa(svgString)}`;

    img.onload = function () {
      const expectWidth = 800;
      const rate = img.width / expectWidth;
      if (rate < 1) {
        canvas.width = expectWidth;
        canvas.height = img.height / rate;
      } else {
        canvas.width = img.width;
        canvas.height = img.height;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const pngData = canvas.toDataURL('image/png');
      downloadFile(pngData, 'plantuml.png');
    }
  } catch (e) {
    console.error(e);
    $message.error(`下载失败: ${e}`);
  }
}

const downloadFile = (pngData: string, filename: string) => {
  const a = document.createElement('a');
  a.href = pngData;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(pngData);
}

const download_options = [
  {
    label: '原生png下载',
    key: 0,
  },
  {
    label: '原生svg下载',
    key: 1,
  },
  {
    label: 'svg转png下载',
    key: 2,
  }
]

const download_loading = ref(false);

const handleSelect = async (key: string | number) => {
  try {
    download_loading.value = true;
    if (key === 0) {
      const split_url = store.svgUrl.split('/');
      split_url[split_url.length - 2] = split_url[split_url.length - 2].replace('svg', 'png');
      const url = split_url.join('/');
      const blob = await fetch(url).then(res => res.blob());
      const download_url = URL.createObjectURL(blob);
      downloadFile(download_url, 'plantuml.png', 'image/png');
    } else if (key === 1) {
      const res = await fetch(store.svgUrl);
      const svgString = await res.text();
      // 转blob
      const blob = new Blob([svgString], {type: 'image/svg+xml'});
      const url = URL.createObjectURL(blob);
      downloadFile(url, 'plantuml.svg');
    } else if (key === 2) {
      await downloadPng();
    }
  } finally {
    download_loading.value = false;
  }
}
</script>

<template>
  <div class="absolute top-0 right-0">
    <n-space class="m-5">
      <n-popselect v-model:value="configs.output" :options="options" trigger="click">
        <n-button>{{ configs.output || '弹出选择' }}</n-button>
      </n-popselect>
      <n-dropdown trigger="hover" :options="download_options" @select="handleSelect">
        <n-button :loading="download_loading">下载图片</n-button>
      </n-dropdown>
    </n-space>
  </div>

  <n-image object-fit="contain" :src="store.svgUrl" alt="svg" class="w-full flex justify-center" width="80%"
           v-if="store.svgUrl" :show-toolbar="true"
           :previewed-img-props="{ style: { objectFit: 'cover' } }"/>
</template>

<style scoped>

</style>
