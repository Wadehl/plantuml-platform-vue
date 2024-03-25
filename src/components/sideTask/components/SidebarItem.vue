<script setup lang="ts">
import {
  ClearOutlined as ClearIcon,
  EditOutlined as EditIcon
} from '@vicons/antd';
import { useCodeStore } from '@/store';

const store = useCodeStore();

defineProps({
  code: {
    type: String,
    required: true
  },
  encoded: {
    type: String
  },
  delIndex: {
    type: Number
  },
  active: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div
    class="sidebar-item select-none"
    :class="{ active }"
    @click="store.loadTask(delIndex)"
  >
    <n-image
      height="100%"
      object-fit="scale-down"
      :src="encoded"
      :alt="code"
      lazy
      class="h-full overflow-hidden"
    />
    <n-popover>
      <template #trigger>
        <n-button
          type="info"
          quaternary
          class="position-absolute right-0 top-0 z-9999"
        >
          <n-icon :component="EditIcon" size="1em" />
        </n-button>
      </template>
      {{ $t('use_this') }}
    </n-popover>

    <n-popconfirm @positive-click="store.removeTask(delIndex)">
      <template #trigger>
        <n-button
          quaternary
          class="position-absolute right-0 bottom-0 cursor-pointer z-9999"
        >
          <n-icon :component="ClearIcon" size="1em" />
        </n-button>
      </template>
      {{ $t('sure_to_delete') }}
    </n-popconfirm>
  </div>
</template>

<style scoped></style>
