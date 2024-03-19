import {createI18n} from "vue-i18n";
import {ref} from 'vue';

import zh_CN from "./zh-CN";
import en_US from "./en-US";

export const languages = [
  {
    label: '简体中文',
    value: 'zh-CN'
  },
  {
    label: 'English',
    value: 'en-US'
  }
];

export const currentLanguage = ref('en-US');

const i18n = createI18n({
  locale: currentLanguage.value,
  allowComposition: true,
  legacy: true,
  messages: {
    'zh-CN': zh_CN,
    'en-US': en_US
  },
  
});

export default i18n;
