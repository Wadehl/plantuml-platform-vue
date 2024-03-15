<script setup lang="ts">
import {defineComponent, h, ref} from 'vue'
import {NIcon, darkTheme} from 'naive-ui'
import type {MenuOption} from 'naive-ui'
import {useConfigsStore} from '@/store'

const configs = useConfigsStore();

import {
  SunnyOutline as SunnyIcon,
  MoonOutline as MoonIcon
} from '@vicons/ionicons5'


const menuItems = ref([
  /**
   * 这里是菜单项
   * key: 唯一标识
   * label: 标签
   * icon: 图标
   * event: 点击事件
   */
]);

</script>

<template>
  <div class="w-full h-full flex justify-end items-center mx-auto box-border px-4rem">
    <div v-for="item in menuItems" :key="item.key" @click="() => item.event()">
      <n-tooltip trigger="hover" v-if="item.show">
        <template #trigger>
          <n-icon :size="32" :component="item.icon" class="p-0.5rem cursor-pointer"/>
        </template>
        {{ item.label }}
      </n-tooltip>
    </div>
    <div @click="() => configs.setTheme(!configs.theme)">
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-icon :class="{'p-0.5rem': true, 'cursor-pointer': true}">
            <n-icon :size="32" :component="configs.theme ? SunnyIcon : MoonIcon"/>
          </n-icon>
        </template>
        {{ configs.theme ? '明亮模式' : '暗夜模式' }}
      </n-tooltip>
    </div>
  </div>
</template>

<style scoped>

</style>
