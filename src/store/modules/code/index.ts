import { defineStore } from 'pinia';

import { ref } from 'vue';

const useCodeStore = defineStore(
  'code',
  () => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const code_text = ref('@startuml\n' + 'A -> B\n' + 'B --> A\n' + '@enduml');

    const svgUrl = ref('');
    const loading = ref(false);

    function $reset(): void {
      code_text.value = '@startuml\n' + 'A -> B\n' + 'B --> A\n' + '@enduml';
      svgUrl.value = '';
    }

    function setSvgUrl(newUrl: string): void {
      svgUrl.value = newUrl;
    }

    function setLoading(newLoading: boolean): void {
      loading.value = newLoading;
    }

    return {
      code_text,
      svgUrl,
      loading,
      setSvgUrl,
      setLoading,
      $reset
    };
  },
  {
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
  }
);

export default useCodeStore;
