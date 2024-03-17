<script setup lang="ts">
import {computed} from "vue";

import {useConfigsStore} from '@/store'

const props = defineProps({
  isFullScreen: {
    type: Boolean,
    default: false
  },
  settingActive: {
    type: Boolean,
    default: false
  }
});

const configs = useConfigsStore();

const emits = defineEmits(['toggle', 'update:isFullScreen', 'update:settingActive']);

const settingFullscreen = computed({
  get: () => props.isFullScreen,
  set: (val) => {
    emits('toggle');
    emits('update:isFullScreen', val);
  }
});

const setting_active = computed({
  get: () => props.settingActive,
  set: (val) => {
    emits('update:settingActive', val);
  }
});


</script>

<template>
  <n-drawer v-model:show="setting_active" :default-width="350" placement="right" resizable>
    <n-drawer-content title="设置" :native-scrollbar="false" closable>
      <n-tabs type="segment" default-value="style" animated>
        <n-tab-pane name="style" tab="样式设置 🫠">
          <div class="font-bold font-size-4 my-2">布局设置 🎡</div>
          <n-form label-align="left" label-placement="left" label-width="auto">
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
            <n-form-item path="align" label="全屏模式">
              <n-switch v-model:value="settingFullscreen" size="medium" :checked-value="true"
                        :unchecked-value="false">
                <template #checked-icon>
                  🥳
                </template>
                <template #unchecked-icon>
                  🤔
                </template>
              </n-switch>
            </n-form-item>
          </n-form>
          <div class="font-bold font-size-4 my-2">主题设置 🌈</div>
          <n-form label-align="left" label-placement="left" label-width="auto">
            <n-form-item label="主题色">
              <n-color-picker v-model:value="configs.overridesPrimaryColor" size="medium"/>
            </n-form-item>
            <n-form-item label="主题色（hover）">
              <n-color-picker v-model:value="configs.overridesPrimaryColorHover" size="medium"/>
            </n-form-item>
            <n-form-item label="主题色（pressed）">
              <n-color-picker v-model:value="configs.overridesPrimaryColorPressed" size="medium"/>
            </n-form-item>
          </n-form>
          <div class="font-bold font-size-4 my-2">标题渐变设置 🥸</div>
          <n-form label-align="left" label-placement="left" label-width="auto">
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
        </n-tab-pane>
        <n-tab-pane name="download" tab="下载设置 😶‍🌫️">
          <div class="font-bold font-size-4 my-2">SVG设置 😶️</div>
          <n-form label-align="left" label-placement="left" label-width="auto">
            <n-form-item path="align" label="与原图等比例">
              <n-switch v-model:value="configs.isObjectFit" size="medium" :checked-value="true"
                        :unchecked-value="false">
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
        </n-tab-pane>
        <n-tab-pane name="operation" tab="配置操作 😤">
          <div class="font-bold font-size-4 my-2">导出操作 😎</div>
          <n-form label-align="left" label-placement="left" label-width="auto">
            <n-form-item label="">
              <n-space class="w-full" vertical>
                <n-button class="w-full" type="primary" @click="() => configs.$import()">导入 🌠</n-button>
                <n-button class="w-full" type="info" @click="() => configs.$export()">导出 💫</n-button>
              </n-space>
            </n-form-item>
          </n-form>
        </n-tab-pane>
      </n-tabs>
      <template #footer>
        <n-space>
          <n-button @click="configs.$reset()">重置</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>

</style>
