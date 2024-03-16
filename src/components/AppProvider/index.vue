<template>
  <n-config-provider :theme="configs.theme" :theme-overrides="themeOverrides">
    <n-global-style/>
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <n-scrollbar style="max-height: 100vh">
              <slot></slot>
              <NaiveProviderContent/>
            </n-scrollbar>
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
<!--    <n-theme-editor></n-theme-editor>-->
  </n-config-provider>
</template>

<script lang="ts" setup>
import {defineComponent, h, computed} from 'vue'
import {useLoadingBar, useDialog, useMessage, useNotification } from 'naive-ui';
import {useConfigsStore} from '@/store';

const configs = useConfigsStore();
const themeOverrides = computed(() => ({
  common: {
    primaryColor: configs.overridesPrimaryColor,
  },
  Button: {
    hoverColor: configs.overridesPrimaryColor,
  }
}));


// 挂载naive组件的方法至window, 以便在全局使用
function setupNaiveTools() {
  window.$loadingBar = useLoadingBar()
  window.$dialog = useDialog()
  window.$message = useMessage()
  window.$notification = useNotification()
}

const NaiveProviderContent = defineComponent({
  setup() {
    setupNaiveTools()
  },
  render() {
    return h('div')
  },
})
</script>
