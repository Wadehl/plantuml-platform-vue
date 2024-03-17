<script setup lang="ts">
import {ref} from 'vue'
import {NIcon} from 'naive-ui'
import {useConfigsStore} from '@/store'

const configs = useConfigsStore();

import {
  SunnyOutline as SunnyIcon,
  MoonOutline as MoonIcon,
  SettingsOutline as SettingsIcon,
  LogoGithub as GithubIcon
} from '@vicons/ionicons5'

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
        size="32"
      >
        PlantUML Vue
      </n-gradient-text>
      <span class="font-size-8">🤗</span>
    </div>
    <div class="w-full h-full flex justify-end items-center mx-auto box-border px-4rem">
      <div v-for="item in menuItems" :key="item.key" @click="() => item.event()">
        <n-tooltip trigger="hover" v-if="item.show">
          <template #trigger>
            <n-icon :size="28" :component="item.icon" class="p-0.5rem cursor-pointer"/>
          </template>
          {{ item.label }}
        </n-tooltip>
      </div>
      <div @click="() => configs.setTheme(!configs.theme)">
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-icon :class="{'p-0.5rem': true, 'cursor-pointer': true}" :size="28"
                    :component="configs.theme ? SunnyIcon : MoonIcon"/>
          </template>
          {{ configs.theme ? '明亮模式' : '黑暗模式' }}
        </n-tooltip>
      </div>
    </div>
    <n-drawer v-model:show="setting_active" :width="300" placement="right">
      <n-drawer-content title="设置">
        <div class="font-bold font-size-4 my-2">样式设置 🫠</div>
        <n-form label-placement="left" label-width="auto">
          <n-form-item path="align" label="垂直布局">
            <n-switch v-model:value="configs.direction" size="medium" checked-value="vertical"
                      unchecked-value="horizontal">
              <template #checked-icon>
                🥳
              </template>
              <template #unchecked-icon>
                🤔
              </template>
            </n-switch>
          </n-form-item>
          <n-form-item label="主题色">
            <n-color-picker v-model:value="configs.overridesPrimaryColor" size="medium"/>
          </n-form-item>
        </n-form>
        <div class="font-bold font-size-4 my-2">标题渐变设置 🥸</div>
        <n-form label-placement="left" label-width="auto">
          <n-form-item path="align" label="渐变角度">
            <n-input-number v-model:value="configs.deg" size="medium" min="0" max="360" step="1"/>
          </n-form-item>
          <n-form-item path="align" label="标题颜色1">
            <n-color-picker v-model:value="configs.colors[0]" size="medium"/>
          </n-form-item>
          <n-form-item path="align" label="标题颜色2">
            <n-color-picker v-model:value="configs.colors[1]" size="medium"/>
          </n-form-item>
        </n-form>
        <div class="font-bold font-size-4 my-2">下载设置 😶‍🌫️</div>
        <n-form label-placement="left" label-width="auto">
          <n-form-item path="align" label="与原图等比例">
            <n-switch v-model:value="configs.isObjectFit" size="medium" :checked-value="true" :unchecked-value="false">
              <template #checked-icon>
                🥳
              </template>
              <template #unchecked-icon>
                🤔
              </template>
            </n-switch>
          </n-form-item>
          <n-form-item path="align" label="图片宽度（px）">
            <n-input-number v-model:value="configs.baseWidth" size="medium" min="0" step="1"/>
          </n-form-item>
          <n-form-item path="align" label="图片高度（px）">
            <n-input-number v-model:value="configs.baseHeight" size="medium" min="0" step="1"
                            :placeholder="configs.isObjectFit ? '原图等比例': 'please input'"
                            :disabled="configs.isObjectFit"/>
          </n-form-item>
        </n-form>
        <template #footer>
          <n-space>
            <n-button @click="configs.$reset()">重置</n-button>
            <n-button type="primary" @click="() => configs.$import()">导入</n-button>
            <n-button type="info" @click="() => configs.$export()">导出</n-button>
          </n-space>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>

</template>

<style scoped>

</style>
