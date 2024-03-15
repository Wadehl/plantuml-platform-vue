import {defineStore} from "pinia";

import {ref} from "vue";

const useCodeStore = defineStore('code', () => {
  const code_text = ref('@startuml\n' +
    'A -> B\n' +
    'B --> A\n' +
    '@enduml');
  
  const svgUrl = ref('');
  const loading = ref(false);
  
  function $reset() {
    code_text.value = '@startuml\n' +
      'A -> B\n' +
      'B --> A\n' +
      '@enduml';
    svgUrl.value = '';
  }
  
  function setSvgUrl(new_url: string) {
    svgUrl.value = new_url;
  }
  
  function setLoading(new_loading: boolean) {
    loading.value = new_loading;
  }
  
  return {
    code_text,
    svgUrl,
    loading,
    setSvgUrl,
    setLoading,
    $reset
  }
}, {
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        key: 'code',
        paths: ['code_text']
      }
    ]
  }
});

export default useCodeStore;
