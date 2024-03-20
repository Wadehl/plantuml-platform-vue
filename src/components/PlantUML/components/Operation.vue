<script setup lang="ts">
import {PropType} from "vue";

const props = defineProps({
  icon: {
    type: Object as PropType<IconBaseProps>,
    required: true,
  }
});

const emits = defineEmits(['event']);

const handleClick = () => {
  emits('event');
}


</script>

<template>
  <n-icon
    :component="icon" size="1.5rem"
    class="cursor-pointer b-rd-4px p-.5rem"
    style="border: 1px solid var(--n-border-color); background: var(--n-color);"
    @click="handleClick"/>
</template>
