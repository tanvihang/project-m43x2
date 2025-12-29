import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "../../context/themeContext";
import { ThemeType } from "../../types/others/themeType";
import { FontSizes } from "../../constants/typography";
import { SafeAreaView } from "react-native-safe-area-context";
import { scaleValues } from "../../constants";

const ComputeScreen = () => {
  const { theme, fonts } = useTheme();
  const styles = createStyles(theme, fonts);

  return (
    <SafeAreaView style={styles.container}>
        <Text>Compute</Text>
    </SafeAreaView>
  );
};

const createStyles = (theme: ThemeType, fonts: FontSizes) => {
  return StyleSheet.create({
    //------CONTAINER------
    container: {
      backgroundColor: theme.backgroundColor,
      flex: 1,
      paddingHorizontal: scaleValues.spacing.md,
      paddingVertical: scaleValues.spacing.sm,
    },
  });
};

export default ComputeScreen;
