import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SettingsMmkvStorage } from '../../../storage/mmkv';
import { LanguageSettingEnum } from '../../../types/enums';

export interface LanguageOption {
  code: LanguageSettingEnum;
  name: string;
  nativeName: string;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    code: LanguageSettingEnum.EN,
    name: 'English',
    nativeName: '🇺🇸 English',
  },
  {
    code: LanguageSettingEnum.ZH_TW,
    name: 'Traditional Chinese',
    nativeName: '🇹🇼 繁體中文',
  },
  {
    code: LanguageSettingEnum.ZH_CN,
    name: 'Simplified Chinese',
    nativeName: '🇨🇳 简体中文',
  },
];

const useLanguage = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageSettingEnum>(
    LanguageSettingEnum.EN
  );
  const [isChanging, setIsChanging] = useState(false);

  // Load saved language on mount
  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = SettingsMmkvStorage.getLanguage();
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage);
        await i18n.changeLanguage(savedLanguage);
      } else {
        // Set default language
        const defaultLang = LanguageSettingEnum.EN;
        setCurrentLanguage(defaultLang);
        SettingsMmkvStorage.setLanguage(defaultLang);
      }
    };

    loadLanguage();
  }, [i18n]);

  const changeLanguage = async (languageCode: LanguageSettingEnum) => {
    try {
      setIsChanging(true);
      await i18n.changeLanguage(languageCode);
      SettingsMmkvStorage.setLanguage(languageCode);
      setCurrentLanguage(languageCode);
    } catch (error) {
      console.error('Error changing language:', error);
    } finally {
      setIsChanging(false);
    }
  };

  const getCurrentLanguageOption = (): LanguageOption | undefined => {
    return LANGUAGE_OPTIONS.find(lang => lang.code === currentLanguage);
  };

  return {
    currentLanguage,
    languageOptions: LANGUAGE_OPTIONS,
    changeLanguage,
    isChanging,
    getCurrentLanguageOption,
  };
};

export default useLanguage;