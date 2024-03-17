<script setup lang="ts">
import CodeInput from "@/components/PlantUML/code-input.vue";
import ImageOutput from "@/components/PlantUML/image-output.vue";

import Header from "@/components/header/index.vue";

// hooks
import {useFullscreen} from '@vueuse/core';

import {useConfigsStore, useCodeStore} from '@/store';
import {ref, onMounted} from "vue";
import {useMediaQuery} from "@vueuse/core";

const configs = useConfigsStore();
const store = useCodeStore();

const split = ref(0.4);

onMounted(() => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)')
  if (!isLargeScreen.value) {
    split.value = 0.3;
    configs.direction = 'vertical';
  } else {
    configs.direction = 'horizontal';
  }
});

const contentRef = ref<HTMLElement | null>(null);

const {isFullscreen, toggle} = useFullscreen(contentRef);
</script>

<template>
  <AppProvider class="box-border overflow-x-hidden">
    <n-layout :native-scrollbar="false">
      <n-layout-header :bordered="true" class="h-5vh">
        <Header @toggle="toggle" v-model:is-full-screen="isFullscreen"/>
      </n-layout-header>
      <n-layout-content class="box-border p-1rem h-95vh" content-style="width: 100%; " ref="contentRef">
        <n-split v-model:size="split" :direction="configs.direction" :max="0.75" :min="0.25" class="h-full w-full">
          <template #1>
            <n-skeleton class="w-full h-full" v-if="store.loading"/>
            <CodeInput class="w-full h-full" v-show="!store.loading"/>
          </template>
          <template #2>
            <div class="w-full mx-auto my-auto box-border p-10" v-if="store.loading">
              <n-skeleton w-full h-full style="min-height: 600px"/>
            </div>
            <div class="w-full mt-1rem mx-auto relative overflow-y-auto h-full" v-if="!store.loading">
              <ImageOutput
                class="flex justify-center items-center w-full h-full"/>
            </div>
          </template>
        </n-split>
      </n-layout-content>
    </n-layout>
  </AppProvider>
</template>
