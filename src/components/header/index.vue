<script setup lang="ts">
import {ref} from 'vue'
import {NIcon} from 'naive-ui'
import {useConfigsStore} from '@/store'

const configs = useConfigsStore();

import {
  SunnyOutline as SunnyIcon,
  MoonOutline as MoonIcon,
  SettingsOutline as SettingsIcon,
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
        {{ configs.theme ? '明亮模式' : '暗夜模式' }}
      </n-tooltip>
    </div>
  </div>
  <n-drawer v-model:show="setting_active" :width="300" placement="right">
    <n-drawer-content title="设置">
      <n-form label-placement="left" label-width="auto">
        <n-form-item path="align" label="方向">
          <n-space align="center">
            <span>水平</span>
            <n-switch v-model:value="configs.direction" size="medium" checked-value="vertical"
                      unchecked-value="horizontal">
              <!--              <template #checked-icon>-->
              <!--                🤔-->
              <!--              </template>-->
              <!--              <template #unchecked-icon>-->
              <!--                😂-->
              <!--              </template>-->
            </n-switch>
            <span>垂直</span>
          </n-space>
        </n-form-item>
      </n-form>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>

</style>
