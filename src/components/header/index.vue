<script setup lang="ts">
import {ref, computed, onMounted} from 'vue'
import {NIcon} from 'naive-ui'
import {useConfigsStore} from '@/store'

import {languages, currentLanguage} from "@/locales";
import {useI18n} from "vue-i18n";

const {locale} = useI18n();

import Settings from './components/settings.vue';

const configs = useConfigsStore();

import {
  SunnyOutline as SunnyIcon,
  MoonOutline as MoonIcon,
  SettingsOutline as SettingsIcon,
  LogoGithub as GithubIcon
} from '@vicons/ionicons5'

import {
  TranslateRound as TranslateIcon
} from '@vicons/material';


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

const menuItems = ref<{
  key: string,
  label: string,
  icon: any,
  event: () => void,
  show: boolean
}[]>([
  /**
   * 这里是菜单项
   * key: 唯一标识
   * label: 标签
   * icon: 图标
   * event: 点击事件
   * show: 是否显示
   */
]);

onMounted(() => {
  menuItems.value = [
    {
      key: 'github',
      label: 'GitHub',
      icon: GithubIcon,
      event: () => {
        window.open('https://github.com/Wadehl/plantuml-platform', '_blank');
      },
      show: true
    },
    {
      key: 'settings',
      label: 'setting',
      icon: SettingsIcon,
      event: () => {
        setting_active.value = true;
      },
      show: true
    }
  ]
})

const onLanguageChange = (value: string) => {
  locale.value = value;
}

</script>

<template>
  <div class="w-full h-full flex items-center">
    <div class="w-full h-full flex justify-start items-center mx-auto box-border px-4rem">
      <n-gradient-text
        :gradient="`linear-gradient(${configs.deg}deg,${configs.colors[0]} 25%,${configs.colors[1]})`"
        size="1.5rem"
      >
        PlantUML Platform Vue
      </n-gradient-text>
      <span class="font-size-1.5rem">🤗</span>
    </div>
    <div class="w-full h-full flex justify-end items-center mx-auto box-border px-4rem">
      <div v-for="item in menuItems" :key="item.key" @click="() => item.event()">
        <n-tooltip trigger="hover" v-if="item.show">
          <template #trigger>
            <n-icon size="1.5rem" :component="item.icon" class="p-0.5rem cursor-pointer"/>
          </template>
          {{ $t(item.label) }}
        </n-tooltip>
      </div>
      <div>
        <n-popselect v-model:value="currentLanguage" :options="languages" trigger="hover"
                     @update:value="onLanguageChange">
          <n-icon size="1.5rem" :component="TranslateIcon" class="p-0.5rem cursor-pointer"/>
        </n-popselect>
      </div>
      <div @click="() => configs.setTheme(!configs.theme)">
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-icon :class="{'p-0.5rem': true, 'cursor-pointer': true}" size="1.5rem"
                    :component="configs.theme ? SunnyIcon : MoonIcon"/>
          </template>
          {{ configs.theme ? $t('light_mode') : $t('dark_mode') }}
        </n-tooltip>
      </div>
    </div>
  </div>
  <settings @toggle="toggle" v-model:is-full-screen="is_full_screen" v-model:settingActive="setting_active"/>
</template>

<style scoped>
</style>
