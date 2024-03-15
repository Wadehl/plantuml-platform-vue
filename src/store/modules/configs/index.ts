import {defineStore} from "pinia";
import {ref} from "vue";

import {darkTheme} from 'naive-ui';

type Theme = typeof darkTheme | null;
type Direction = 'vertical' | 'horizontal';
type Output = 'svg' | 'png';

const useConfigsStore = defineStore('configs', () => {
  const theme = ref<Theme>(darkTheme);
  const direction = ref<Direction>('horizontal');
  const output = ref<Output>('svg');
  
  const $reset = () => {
    theme.value = null;
    direction.value = 'horizontal';
  };
  const setTheme = (new_theme: boolean) => {
    if (new_theme) {
      theme.value = darkTheme;
    } else {
      theme.value = null;
    }
  };
  const setDirection = (new_direction: Direction) => {
    direction.value = new_direction;
  }
  const setOutput = (new_output: Output) => {
    output.value = new_output;
  }
  
  return {
    theme,
    direction,
    output,
    setOutput,
    setTheme,
    setDirection,
    $reset
  };
}, {
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage
      }
    ]
  }
});

export default useConfigsStore;
