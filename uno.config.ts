import { defineConfig, presetAttributify, presetUno } from 'unocss';
import presetIcons from '@unocss/preset-icons';

export default defineConfig({
  presets: [presetAttributify(), presetUno(), presetIcons({})],
  shortcuts: {
    'sidebar-item':
      'w-15rem h-13rem p-2.3rem ms-.6rem rounded shadow-md .drop-shadow box-border overflow-hidden position-relative justify-center items-center text-center transition-all duration-120 ease-in-out',
    active: 'p-1.8rem border-solid'
  }
});
