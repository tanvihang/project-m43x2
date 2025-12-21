import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,

} from "react-native";
import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "../../context/themeContext";
import { ThemeType } from "../../types/others/themeType";
import { FontSizes } from "../../constants/typography";
import useLanguage from "../../hooks/screens-hook/public-screen-hook/useLanguage";
import { LanguageSettingEnum } from "../../types/enums";
import { scaleValues } from "../../constants";

const LanguageScreen = () => {
  const { theme, fonts } = useTheme();
  const styles = createStyles(theme, fonts);
  const { currentLanguage, languageOptions, changeLanguage, isChanging } =
    useLanguage();

  const handleLanguageSelect = (languageCode: LanguageSettingEnum) => {
    if (languageCode !== currentLanguage && !isChanging) {
      changeLanguage(languageCode);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.languageList}>
          {languageOptions.map((language) => {
            const isSelected = language.code === currentLanguage;
            return (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.languageItem,
                  isSelected && styles.languageItemSelected,
                ]}
                onPress={() => handleLanguageSelect(language.code)}
                disabled={isChanging}
              >
                <View style={styles.languageInfo}>
                  <Text
                    style={[
                      styles.languageName,
                      isSelected && styles.languageNameSelected,
                    ]}
                  >
                    {language.nativeName}
                  </Text>
                  <Text
                    style={[
                      styles.languageSubtitle,
                      isSelected && styles.languageSubtitleSelected,
                    ]}
                  >
                    {language.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const createStyles = (theme: ThemeType, fonts: FontSizes) => {
  return StyleSheet.create({
    //------CONTAINER------
    container: {
      backgroundColor: theme.backgroundColor,
      flex: 1,
      paddingTop: scaleValues.spacing.md,
    },
    scrollView: {
      flex: 1,
    },
    //------LANGUAGE LIST------
    languageList: {
      gap: scaleValues.spacing.sm,
      paddingHorizontal: scaleValues.spacing.md,
    },
    languageItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: scaleValues.radius.roundedModal,
      padding: scaleValues.spacing.md,
      borderWidth: scaleValues.borders.medium,
      borderColor: "transparent",
    },
    languageItemSelected: {
      borderColor: theme.borderBody,
    },
    languageInfo: {
      flex: 1,
    },
    languageName: {
      color: theme.textBody,
      fontSize: fonts.body,
      marginBottom: scaleValues.spacing.xs,
    },
    languageNameSelected: {
      color: theme.textBody,
    },
    languageSubtitle: {
      fontSize: fonts.bodySmall,
      color: theme.textHelp,
    },
    languageSubtitleSelected: {
      color: theme.textHelp,
    },
  });
};

export default LanguageScreen;
