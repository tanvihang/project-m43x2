import { createContext, useContext, useState, ReactNode } from "react";
import { useColorScheme } from 'react-native';
import { ThemeType } from "../types/others/themeType";
import { Colors } from "../constants";
import { SettingsMmkvStorage } from "../storage/mmkv";
import { FontSizeScaleEnum, ThemeSettingEnum } from "../types/enums";
import fontSizes from "../constants/typography";



type ThemeContextType = {
  // Theme mode
  themeMode: ThemeSettingEnum;
  activeTheme: 'light' | 'dark';
  setThemeMode: (mode: ThemeSettingEnum) => void;
  
  // Font size
  fontSizeScale: FontSizeScaleEnum;
  setFontSizeScale: (scale: FontSizeScaleEnum) => void;
  fonts: typeof fontSizes.medium;
  
  // Theme colors (semantic naming)
  theme: ThemeType;
};

const defaultTheme: ThemeType = {
  backgroundColor: Colors.background,

  //* Text Colors *//
  textBody: Colors.grey900,
  textWhite: Colors.grey100,
  textBlack: Colors.grey900,
  textAccent: Colors.primary600,
  textDanger: Colors.danger600,
  textHelp: Colors.accent600,
  textDisabled: Colors.grey500,

  // * Surface Colors *//
  surfaceButton: Colors.primary500,
  surfaceButtonDisabled: Colors.grey400,
  surfaceCard: Colors.grey200,
  surfaceCardPressed: Colors.grey300,
  surfaceTextInput: Colors.grey100,
  surfaceDanger: Colors.danger500,

  // * Border Colors *//
  borderAccent: Colors.accent500,
  borderBody: Colors.grey400,
  borderDivider: Colors.grey300,
  borderDanger: Colors.danger400,

  //* Health-specific Colors
  recovery: Colors.recovery,
  recoveryLight: Colors.recoveryLight,
  mildStress: Colors.mildStress,
  mildStressLight: Colors.mildStressLight,
  Stress: Colors.Stress,
  StressLight: Colors.StressLight,

  Temperature: Colors.Temperature,
  Infection: Colors.Infection,
  Menstruation: Colors.Menstruation,
  Fertile: Colors.Fertile,
};

const ThemeContext = createContext<ThemeContextType>({
  themeMode: ThemeSettingEnum.LIGHT,
  activeTheme: 'light',
  setThemeMode: () => {},
  fontSizeScale: FontSizeScaleEnum.MEDIUM,
  setFontSizeScale: () => {},
  fonts: fontSizes.medium,
  theme: defaultTheme,
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const systemTheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeSettingEnum>(() => {
    const savedTheme = SettingsMmkvStorage.getTheme();
    return savedTheme || ThemeSettingEnum.LIGHT;
  });
  const [fontSizeScale, setFontSizeScaleState] = useState<FontSizeScaleEnum>(() => {
    const savedFontSize = SettingsMmkvStorage.getFontSizeScale();
    return savedFontSize || FontSizeScaleEnum.MEDIUM;
  });

  const setThemeMode = (mode: ThemeSettingEnum) => {
    setThemeModeState(mode);
    SettingsMmkvStorage.setTheme(mode);
  };

  const setFontSizeScale = (scale: FontSizeScaleEnum) => {
    setFontSizeScaleState(scale);
    SettingsMmkvStorage.setFontSizeScale(scale);
  };

  const activeTheme = themeMode === ThemeSettingEnum.LIGHT 
    ? (systemTheme || ThemeSettingEnum.LIGHT) 
    : themeMode;

  // Get current font sizes based on scale
  const fonts = fontSizes[fontSizeScale];

  // TODO: Implement dark theme - for now using light theme
  const theme = defaultTheme;

  return (
    <ThemeContext.Provider 
      value={{ 
        themeMode, 
        activeTheme, 
        setThemeMode,
        fontSizeScale,
        setFontSizeScale,
        fonts,
        theme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
