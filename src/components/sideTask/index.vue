<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SidebarItem from './components/SidebarItem.vue';
import { useI18n } from 'vue-i18n';

import { uml_templates, other_templates } from './configs';

const { t } = useI18n();

import { useCodeStore, useConfigsStore } from '@/store';

const store = useCodeStore();
const configs = useConfigsStore();

const normalize_url = (encoded: string) => {
  return `${configs.baseUMLUrl}svg/${encoded}`;
};

const options = ref([]);

const initOptions = () => {
  const uml_children = Object.keys(uml_templates).map((item) => {
    return {
      label: t(item),
      key: uml_templates[item]
    };
  });
  const other_children = Object.keys(other_templates).map((item) => {
    return {
      label: t(item),
      key: other_templates[item]
    };
  });
  return [
    {
      label: t('uml'),
      key: 'uml',
      children: uml_children
    },
    {
      label: t('other'),
      key: 'other',
      children: other_children
    }
  ];
};

onMounted(() => {
  store.code_text = store.tasks[store.active_index].code;

  options.value = initOptions();
});

const handleSelect = (key: string) => {
  if (key) {
    store.addTask(key);
  }
  if (key === '') {
    store.addTask('');
  }
};
</script>

<template>
  <div class="w-full h-full">
    <div class="w-full flex items-center justify-start p-10px box-border">
      <n-space>
        <n-dropdown
          :options="options"
          placement="bottom-start"
          trigger="click"
          @select="handleSelect"
        >
          <n-button>😎 {{ $t('add_task') }}</n-button>
        </n-dropdown>
      </n-space>
    </div>
    <n-list clickable>
      <n-list-item v-for="(task, index) in store.tasks" :key="index">
        <SidebarItem
          :code="task.code"
          :encoded="normalize_url(task.encoded)"
          :delIndex="index"
          :active="index === store.active_index"
        />
      </n-list-item>
    </n-list>
  </div>
</template>

<style scoped></style>
