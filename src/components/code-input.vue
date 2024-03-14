<script setup lang="ts">
import {useCodeStore} from '../store'

const store = useCodeStore();

</script>

<template>
  <n-input
    v-model:value="store.code_text"
    type="textarea"
    placeholder="基本的 Textarea"
  />
</template>

<style scoped>

</style>
