import en from './en/common.json';
import zh_tw from './zh-TW/common.json'
import zh_cn from './zh-CN/common.json'


export type AllLanguageNamespaces = {
  common: keyof typeof en;
};

export type SpecificLanguageNamespace<K extends keyof AllLanguageNamespaces> = AllLanguageNamespaces[K];


export enum Languages {
    English = 'en',
    ChineseTraditional = 'zh-TW',
    ChineseSimplified = 'zh-CN',
  }
  
  export enum Locale {
    EnglishGB = 'en-GB',
    ChineseTraditional = 'zh-TW',
    ChineseSimplified = 'zh-CN',
  }

  export const locales = {
    [Languages.English]: Locale.EnglishGB,
    [Languages.ChineseTraditional]: Locale.ChineseTraditional,
    [Languages.ChineseSimplified]: Locale.ChineseSimplified,
  } as const;

// Language resources to let i18n knows
export const resources = {
    "en" : {
        translation: en,
    },
    "zh-TW" : {
      translation: zh_tw,
    },
    "zh-CN": {
      translation: zh_cn, 
    }
};
