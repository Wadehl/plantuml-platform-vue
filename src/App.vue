<script setup lang="ts">
import CodeInput from "@/components/PlantUML/code-input.vue";
import ImageOutput from "@/components/PlantUML/image-output.vue";

import Header from "@/components/header/index.vue";

import {useConfigsStore, useCodeStore} from '@/store';

const configs = useConfigsStore();
const store = useCodeStore();

</script>

<template>
  <AppProvider class="box-border py-0.5rem w-100vw h-100vh overflow-hidden">
    <n-layout :native-scrollbar="false">
      <n-layout-header :bordered="true">
        <Header/>
      </n-layout-header>
      <n-layout-content class="box-border p-1rem" content-style="width: 100%; height: 680px;">
        <n-split :direction="configs.direction" :max="0.75" :min="0.25" class="h-full w-full">
          <template #1>
            <n-skeleton class="w-full h-full" v-if="store.loading"/>
            <CodeInput class="w-full h-full" v-show="!store.loading"/>
          </template>
          <template #2>
            <div class="w-full h-600px mx-auto my-auto box-border p-10" v-if="store.loading">
              <n-skeleton w-full h-full/>
            </div>
            <ImageOutput
              :class="{'w-full': configs.direction === 'horizontal','h-full': configs.direction === 'vertical'}"
              class="flex justify-center items-center" v-if="!store.loading"/>
          </template>
        </n-split>
      </n-layout-content>
    </n-layout>
  </AppProvider>
</template>
