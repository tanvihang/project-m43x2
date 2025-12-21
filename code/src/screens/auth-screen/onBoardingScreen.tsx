import { StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../context/themeContext";
import { ThemeType } from "../../types/others/themeType";
import { FontSizes } from "../../constants/typography";
import { useRouter } from "expo-router";
import CtaButton from "../../components/ui/button/CtaButton";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

const OnBoardingScreen = () => {
  const {theme, fonts} = useTheme();
  const styles = createStyles(theme, fonts);

  const router = useRouter();

  const {t} = useTranslation('translation', {keyPrefix: 'screens.onBoarding'});

  return (
    <SafeAreaView style={styles.container}>
      <CtaButton
        title={t('signIn')}
        onPress={() => {
          router.navigate('/signIn')
        }}
      />
      <CtaButton
        title={t('signUp')}
        onPress={() => {
          router.navigate('/signUp')
        }}
      />
      <CtaButton
        title="Language"
        onPress={() => {
          router.navigate('/language')
        }}
      />
      <CtaButton
        title="Font Size"
        onPress={() => {
          router.navigate('/fontSize')
        }}
      />

    </SafeAreaView>
  );
};

const createStyles = (theme: ThemeType, fonts: FontSizes ) => {
  return StyleSheet.create({
    //------CONTAINER------
    container: {
      backgroundColor: theme.backgroundColor,
      flex: 1,
    },
  });
};

export default OnBoardingScreen;
