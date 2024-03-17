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
  const baseWidth = ref(800);
  const baseHeight = ref<number | undefined>(undefined);
  const isObjectFit = ref(true);
  const deg = ref(315);
  const colors = ref(['#42d392', '#647eff']);
  const overridesPrimaryColor = ref('#42d392')
  
  const $reset = () => {
    theme.value = null;
    direction.value = 'horizontal';
    baseWidth.value = 800;
    baseHeight.value = undefined;
    isObjectFit.value = true;
    deg.value = 315;
    colors.value = ['#42d392', '#647eff'];
    overridesPrimaryColor.value = '#42d392';
  };
  
  const $export = () => {
    /**
     * 导出配置为json
     */
    
    const config = {
      theme: theme.value,
      direction: direction.value,
      baseWidth: baseWidth.value,
      baseHeight: baseHeight.value,
      isObjectFit: isObjectFit.value,
      deg: deg.value,
      colors: colors.value,
      overridesPrimaryColor: overridesPrimaryColor.value
    };
    
    const blob = new Blob([JSON.stringify(config)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement
    if (url) {
      window.open(url);
      URL.revokeObjectURL(url);
    }
  }
  
  const $import = () => {
    /**
     * 导入配置
     */
    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const config = JSON.parse(e.target?.result as string);
          theme.value = config.theme;
          direction.value = config.direction;
          baseWidth.value = config.baseWidth;
          baseHeight.value = config.baseHeight;
          isObjectFit.value = config.isObjectFit;
          deg.value = config.deg;
          colors.value = config.colors;
          overridesPrimaryColor.value = config.overridesPrimaryColor;
        }
        reader.readAsText(file);
      }
    }
  }
  
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
    deg,
    colors,
    baseWidth,
    baseHeight,
    isObjectFit,
    theme,
    direction,
    output,
    overridesPrimaryColor,
    setOutput,
    setTheme,
    setDirection,
    $reset,
    $export,
    $import
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
