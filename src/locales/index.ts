import { createI18n } from 'vue-i18n';
import { ref, watch } from 'vue';

import zh_CN from './zh-CN';
import en_US from './en-US';

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

export const currentLanguage = ref<'zh-CN' | 'en-US'>('en-US');

const i18n = createI18n({
  locale: currentLanguage.value,
  allowComposition: true,
  legacy: false,
  messages: {
    'zh-CN': zh_CN,
    'en-US': en_US
  }
});

export const saveLanguage = (lang: string) => {
  localStorage.setItem('language', lang);
};

export const loadLanguage = () => {
  function getLocalLanguage() {
    const lang = localStorage.getItem('language');
    if (lang) {
      return lang;
    }
    return false;
  }

  function getBrowserLanguage() {
    const lang = navigator.language;
    if (lang) {
      return lang;
    }
    return false;
  }

  const lang = getLocalLanguage() || getBrowserLanguage() || 'en-US';
  currentLanguage.value = lang as 'zh-CN' | 'en-US';
};

watch(currentLanguage, (lang: 'zh-CN' | 'en-US') => {
  i18n.global.locale.value = lang;
  saveLanguage(lang);
});

export default i18n;
