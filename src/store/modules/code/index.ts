import { defineStore } from 'pinia';

import { ref } from 'vue';
import * as plantumlEncoder from 'plantuml-encoder';

export interface Task {
  code: string;
  encoded: string;
}

const useCodeStore = defineStore(
  'code',
  () => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const code_text = ref('@startuml\n' + 'A -> B\n' + 'B --> A\n' + '@enduml');

    const svgUrl = ref('');
    const loading = ref(false);

    const tasks = ref<Task[]>([
      {
        code: '@startuml\n' + 'A -> B\n' + 'B --> A\n' + '@enduml',
        encoded: 'SoWkIImgAStDuN9KqBLJSE9oKj05qevS3gbvAK1X0000'
      }
    ]);

    const active_index = ref(0);

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

    function addTask(code: string): void {
      const encoded = plantumlEncoder.encode(code);
      tasks.value.unshift({
        code,
        encoded
      });
      loadTask(0);
    }

    function removeTask(index: number): void {
      if (tasks.value.length === 1) {
        $message.warning('Cannot remove the last task');
        return;
      }
      if (index === active_index.value) {
        active_index.value = 0;
      }
      tasks.value.splice(index, 1);
    }

    function loadTask(index: number): void {
      code_text.value = tasks.value[index].code;
      active_index.value = index;
    }

    function updateTask(index: number, code: string): void {
      tasks.value[index].code = code;
      tasks.value[index].encoded = plantumlEncoder.encode(code);
    }

    return {
      active_index,
      tasks,
      code_text,
      svgUrl,
      loading,
      setSvgUrl,
      setLoading,
      addTask,
      removeTask,
      updateTask,
      loadTask,
      $reset
    };
  },
  {
    persist: {
      enabled: true,
      storage: localStorage,
      key: 'code',
      paths: ['code_text', 'task', 'active_index']
    }
  }
);

export default useCodeStore;
