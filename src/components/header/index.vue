<script setup lang="ts">
import {ref, computed} from 'vue'
import {NIcon} from 'naive-ui'
import {useConfigsStore} from '@/store'

import Settings from './components/settings.vue';

const configs = useConfigsStore();

import {
  SunnyOutline as SunnyIcon,
  MoonOutline as MoonIcon,
  SettingsOutline as SettingsIcon,
  LogoGithub as GithubIcon
} from '@vicons/ionicons5'


const props = defineProps({
  isFullScreen: {
    type: Boolean,
    default: false
  }
});

const is_full_screen = computed({
  get: () => props.isFullScreen,
  set: (val) => {
    emits('toggle');
    emits('update:isFullScreen', val);
  }
});

const emits = defineEmits(['toggle', 'update:isFullScreen']);

const toggle = () => {
  emits('toggle');
}

const setting_active = ref(false);

const menuItems = ref([
  /**
   * 这里是菜单项
   * key: 唯一标识
   * label: 标签
   * icon: 图标
   * event: 点击事件
   */
  {
    key: 'github',
    label: 'GitHub',
    icon: GithubIcon,
    event: () => {
      window.open('https://github.com/Wadehl/plantuml-platform', '_blank');
    },
    show: true
  },
  // {
  //   key: 'fullScreen',
  //   label: '全屏',
  //   event: () => {
  //     emits('toggle');
  //   },
  //   icon: FullScreenIcon,
  //   show: true
  // },
  {
    key: 'settings',
    label: '设置',
    icon: SettingsIcon,
    event: () => {
      setting_active.value = true;
    },
    show: true
  }
]);

</script>

<template>
  <div class="w-full h-full flex items-center">
    <div class="w-full h-full flex justify-start items-center mx-auto box-border px-4rem">
      <n-gradient-text
        :gradient="`linear-gradient(${configs.deg}deg,${configs.colors[0]} 25%,${configs.colors[1]})`"
        size="1.5rem"
      >
        PlantUML Vue
      </n-gradient-text>
      <span class="font-size-1.5rem">🤗</span>
    </div>
    <div class="w-full h-full flex justify-end items-center mx-auto box-border px-4rem">
      <div v-for="item in menuItems" :key="item.key" @click="() => item.event()">
        <n-tooltip trigger="hover" v-if="item.show">
          <template #trigger>
            <n-icon size="1.5rem" :component="item.icon" class="p-0.5rem cursor-pointer"/>
          </template>
          {{ item.label }}
        </n-tooltip>
      </div>
      <div @click="() => configs.setTheme(!configs.theme)">
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-icon :class="{'p-0.5rem': true, 'cursor-pointer': true}" size="1.5rem"
                    :component="configs.theme ? SunnyIcon : MoonIcon"/>
          </template>
          {{ configs.theme ? '明亮模式' : '黑暗模式' }}
        </n-tooltip>
      </div>
    </div>
  </div>
  <settings @toggle="toggle" v-model:is-full-screen="is_full_screen" v-model:settingActive="setting_active"/>
</template>

<style scoped>
</style>
