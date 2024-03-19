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
    <n-drawer-content :title="$t('setting')" :native-scrollbar="false" closable>
      <n-tabs type="segment" default-value="style" animated>
        <n-tab-pane name="style" :tab="$t('setting_style') + '🫠'">
          <div class="font-bold font-size-4 my-2">{{ $t('setting_layout') + '🎡' }}</div>
          <n-form label-align="left" label-placement="left" label-width="auto">
            <n-form-item path="align" :label="$t('vertical_layout')">
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
            <n-form-item path="align" :label="$t('fullscreen')">
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
          <div class="font-bold font-size-4 my-2">{{ $t('setting_theme') + '🌈' }}</div>
          <n-form label-align="left" label-placement="left" label-width="auto">
            <n-form-item :label="$t('primary_color')">
              <n-color-picker v-model:value="configs.overridesPrimaryColor" size="medium"/>
            </n-form-item>
            <n-form-item :label="$t('primary_color_hover')">
              <n-color-picker v-model:value="configs.overridesPrimaryColorHover" size="medium"/>
            </n-form-item>
            <n-form-item :label="$t('primary_color_pressed')">
              <n-color-picker v-model:value="configs.overridesPrimaryColorPressed" size="medium"/>
            </n-form-item>
          </n-form>
          <div class="font-bold font-size-4 my-2">{{ $t('setting_title_gradient') + '🥸' }}</div>
          <n-form label-align="left" label-placement="left" label-width="auto">
            <n-form-item path="align" :label="$t('gradient_angle')">
              <n-input-number v-model:value="configs.deg" size="medium" min="0" max="360" step="1"/>
            </n-form-item>
            <n-form-item path="align" :label="$t('gradient_color_1')">
              <n-color-picker v-model:value="configs.colors[0]" size="medium"/>
            </n-form-item>
            <n-form-item path="align" :label="$t('gradient_color_2')">
              <n-color-picker v-model:value="configs.colors[1]" size="medium"/>
            </n-form-item>
          </n-form>
        </n-tab-pane>
        <n-tab-pane name="download" :tab="$t('setting_download') + '😶‍🌫️'">
          <div class="font-bold font-size-4 my-2 cursor-help">{{ $t('setting_plantuml') }}
            <n-popover trigger="hover">
              <template #trigger>
                <span class="cursor-help">🤓</span>
              </template>
              <span>{{ $t('plantuml_hint') }}</span>
            </n-popover>
          </div>
          <n-form label-align="left" label-placement="left" label-width="auto">
            <n-alert class="my-.5rem" title="WARNING⚠️" type="warning" closable :show-icon="false">
              Do not change the default value unless you know what you are doing.
            </n-alert>
            <n-form-item path="align" :label="$t('server_url')">
              <n-input v-model:value="configs.baseUMLUrl" size="medium" :clearable="true"/>
            </n-form-item>
          </n-form>
          <div class="font-bold font-size-4 my-2">{{ $t('setting_export') }} 😶</div>
          <n-form label-align="left" label-placement="left" label-width="auto">
            <n-form-item path="align" :label="$t('object_fit_contain')">
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
            <n-form-item path="align" :label="$t('image_width')">
              <n-input-number v-model:value="configs.baseWidth" size="medium" min="0" step="1"/>
            </n-form-item>
            <n-form-item path="align" :label="$t('image_height')">
              <n-input-number v-model:value="configs.baseHeight" size="medium" min="0" step="1"
                              :placeholder="configs.isObjectFit ? $t(`object_fit_contain`): 'please input'"
                              :disabled="configs.isObjectFit"/>
            </n-form-item>
          </n-form>
        </n-tab-pane>
        <n-tab-pane name="operation" :tab="$t('setting_operation') + '😤'">
          <div class="font-bold font-size-4 my-2">{{ $t('setting_export_local') + '😎' }}</div>
          <n-form label-align="left" label-placement="left" label-width="auto">
            <n-form-item label="">
              <n-space class="w-full" vertical>
                <n-button class="w-full" type="primary" @click="() => configs.$import()">{{ $t('import_local') }} 🌠
                </n-button>
                <n-button class="w-full" type="info" @click="() => configs.$export()">{{ $t('export_local') }} 💫
                </n-button>
              </n-space>
            </n-form-item>
          </n-form>
        </n-tab-pane>
      </n-tabs>
      <template #footer>
        <n-space>
          <n-button @click="configs.$reset()">{{ $t('reset') }}</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>

</style>
