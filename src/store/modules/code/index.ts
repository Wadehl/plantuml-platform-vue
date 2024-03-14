import {defineStore} from "pinia";

import {ref} from "vue";

const useCodeStore = defineStore('code', () => {
  const code_text = ref('');
  
  function $reset() {
    code_text.value = '';
  }
  
  return {
    code_text,
    $reset
  }
});

export default useCodeStore;
