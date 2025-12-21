import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import React from "react";
import { useTheme } from "../../context/themeContext";
import { ThemeType } from "../../types/others/themeType";
import { FontSizes, fontWeights } from "../../constants/typography";
import useFontSize from "../../hooks/screens-hook/public-screen-hook/useFontSize";
import { scaleValues } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";

const FontSizeScreen = () => {
  const { theme, fonts } = useTheme();
  const styles = createStyles(theme, fonts);
  const { increaseFontSize, decreaseFontSize, canIncrease, canDecrease } =
    useFontSize();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.previewBody}>
          This is a sample of body text. The quick brown fox jumps over the lazy
          dog.
        </Text>
      </View>

      <View style={styles.controlSection}>
        <TouchableOpacity
          style={[
            styles.controlButton,
            styles.decreaseButton,
            !canDecrease && styles.controlButtonDisabled,
          ]}
          onPress={decreaseFontSize}
          disabled={!canDecrease}
        >
          <Text
            style={[
              styles.controlButtonText,
              !canDecrease && styles.controlButtonTextDisabled,
            ]}
          >
            −
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.controlButton,
            styles.increaseButton,
            !canIncrease && styles.controlButtonDisabled,
          ]}
          onPress={increaseFontSize}
          disabled={!canIncrease}
        >
          <Text
            style={[
              styles.controlButtonText,
              !canIncrease && styles.controlButtonTextDisabled,
            ]}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: ThemeType, fonts: FontSizes) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
      paddingHorizontal: scaleValues.spacing.md,
      flex: 1,
    },
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    previewBody: {
      fontSize: fonts.body,
      color: theme.textBody,
      lineHeight: fonts.body * 1.5,
      textAlign: "center",
    },
    controlSection: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      paddingBottom: scaleValues.spacing.md,
    },
    controlButton: {
      width: 64,
      height: 64,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: scaleValues.radius.full,
    },
    decreaseButton: {
      backgroundColor: "#EA575E",
    },
    increaseButton: {
      backgroundColor: "#AFEA74",
    },
    controlButtonDisabled: {
      opacity: 0.4,
    },
    controlButtonText: {
      fontSize: 40,
      fontWeight: fontWeights.thin,
      color: theme.textBody,
    },
    controlButtonTextDisabled: {
      color: theme.textDisabled,
    },
  });
};

export default FontSizeScreen;
