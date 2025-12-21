import { StorageService } from '../storageService';
import { STORAGE_KEYS } from '../storageKeys';
import { FontSizeScaleEnum, LanguageSettingEnum, ThemeSettingEnum } from '../../../types/enums';

export const SettingsMmkvStorage = {
  setTheme: (theme: ThemeSettingEnum) => 
    StorageService.setString(STORAGE_KEYS.SETTINGS.THEME, theme),
  
  getTheme: () => 
    StorageService.getString(STORAGE_KEYS.SETTINGS.THEME) as ThemeSettingEnum | null,
  
  setLanguage: (language: LanguageSettingEnum) => 
    StorageService.setString(STORAGE_KEYS.SETTINGS.LANGUAGE, language),
  
  getLanguage: () => 
    StorageService.getString(STORAGE_KEYS.SETTINGS.LANGUAGE) as LanguageSettingEnum | null,
  
  setFontSizeScale: (scale: FontSizeScaleEnum) => 
    StorageService.setString(STORAGE_KEYS.SETTINGS.FONT_SIZE_SCALE, scale),
  
  getFontSizeScale: () => 
    StorageService.getString(STORAGE_KEYS.SETTINGS.FONT_SIZE_SCALE) as FontSizeScaleEnum | null,
};
