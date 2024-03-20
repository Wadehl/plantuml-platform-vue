import { defineStore } from 'pinia';
import { ref } from 'vue';

import { darkTheme } from 'naive-ui';

type Theme = typeof darkTheme | null;
type Direction = 'vertical' | 'horizontal';
type Output = 'svg' | 'png';

const useConfigsStore = defineStore(
  'configs',
  () => {
    const theme = ref<Theme>(darkTheme);
    const direction = ref<Direction>('horizontal');
    const output = ref<Output>('svg');
    const baseWidth = ref(800);
    const baseHeight = ref<number | undefined>(undefined);
    const baseUMLUrl = ref('https://www.plantuml.com/plantuml/');
    const isObjectFit = ref(true);
    const deg = ref(315);
    const colors = ref(['#42d392', '#647eff']);
    const overridesPrimaryColor = ref('#18a058');
    const overridesPrimaryColorHover = ref('#36ad6a');
    const overridesPrimaryColorPressed = ref('#0c7a43');

    const $reset = (): void => {
      theme.value = null;
      direction.value = 'horizontal';
      baseWidth.value = 800;
      baseHeight.value = undefined;
      isObjectFit.value = true;
      deg.value = 315;
      colors.value = ['#42d392', '#647eff'];
      overridesPrimaryColor.value = '#18a058';
      overridesPrimaryColorHover.value = '#36ad6a';
      overridesPrimaryColorPressed.value = '#0c7a43';
      baseUMLUrl.value = 'https://www.plantuml.com/plantuml/';
    };

    const $export = (): void => {
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

      const blob = new Blob([JSON.stringify(config)], {
        type: 'application/json'
      });
      const url: string = URL.createObjectURL(blob);
      if (url !== '') {
        const a = document.createElement('a');
        a.href = url;
        a.download = 'plantuml-editor-config.json';
        a.click();
        URL.revokeObjectURL(url);
      }
    };

    const $import = (): void => {
      /**
       * 导入配置
       */

      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.onchange = (e) => {
        const file: File | undefined = (e.target as HTMLInputElement)
          .files?.[0];
        if (file != null) {
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
          };
          reader.readAsText(file);
          $message.success('导入成功');
        }
      };
      input.click();
    };

    const setTheme = (newTheme: boolean): void => {
      if (newTheme) {
        theme.value = darkTheme;
      } else {
        theme.value = null;
      }
    };
    const setDirection = (newDirection: Direction): void => {
      direction.value = newDirection;
    };
    const setOutput = (newOutput: Output): void => {
      output.value = new_output;
    };

    return {
      deg,
      colors,
      baseWidth,
      baseHeight,
      isObjectFit,
      theme,
      direction,
      output,
      baseUMLUrl,
      overridesPrimaryColor,
      overridesPrimaryColorHover,
      overridesPrimaryColorPressed,
      setOutput,
      setTheme,
      setDirection,
      $reset,
      $export,
      $import
    };
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          storage: localStorage
        }
      ]
    }
  }
);

export default useConfigsStore;
