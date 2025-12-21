import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../context/themeContext";
import { ThemeType } from "../../types/others/themeType";
import { FontSizes } from "../../constants/typography";
import { SafeAreaView } from "react-native-safe-area-context";
import CtaButton from "../../components/ui/button/CtaButton";
import useSignOut from "../../hooks/auth-hook/useSignOut";

const HomeScreen = () => {
  const { theme, fonts } = useTheme();
  const styles = createStyles(theme, fonts);

  const {signOut} = useSignOut();

  return (

    <SafeAreaView style={styles.container}>
      <Text>HomeScreen</Text>
      <CtaButton
        title="Sign Out"
        onPress={() => {
          signOut();
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
    },
  });
};


export default HomeScreen;
