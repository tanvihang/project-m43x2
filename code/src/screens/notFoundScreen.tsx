import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../context/themeContext";
import { ThemeType } from "../types/others/themeType";
import { FontSizes } from "../constants/typography";
import { SafeAreaView } from "react-native-safe-area-context";
import CtaButton from "../components/ui/button/CtaButton";
import { router } from "expo-router";

const NotFoundScreen = () => {
  const { theme, fonts } = useTheme();
  const styles = createStyles(theme, fonts);


  return (
    <SafeAreaView style={styles.container}>
      <Text>NotFoundScreen</Text>
      <CtaButton
        title ="Go Back"
        onPress={() => {
            router.back();
        }}
      />
    </SafeAreaView>
  );
};

const createStyles = (theme: ThemeType, fonts: FontSizes) => {
  return StyleSheet.create({
    //------CONTAINER------
    container: {
      backgroundColor: theme.backgroundColor,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
};

export default NotFoundScreen;
