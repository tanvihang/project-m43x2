import {
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";
import { useTheme } from "../../context/themeContext";
import { ThemeType } from "../../types/others/themeType";
import { FontSizes } from "../../constants/typography";
import { SafeAreaView } from "react-native-safe-area-context";
import useImageMetaData from "../../hooks/screens-hook/protected-screen-hook/frame-screen-hook/useImageMetaData";
import FrameImageRenderer from "../../components/protected-components/frame-components/FrameImageRenderer";
import { scaleValues } from "../../constants";

const FrameScreen = () => {
  const { theme, fonts } = useTheme();
  const styles = createStyles(theme, fonts);

  const { exifData, imageUri, pickImage } = useImageMetaData();

  return (
    <SafeAreaView style={styles.container}>
        <FrameImageRenderer exifData={exifData} imageUri={imageUri}/>
        <Button title="Select Your Proudest Image" onPress={pickImage} />

    </SafeAreaView>
  );
};

const createStyles = (theme: ThemeType, fonts: FontSizes) => {
  return StyleSheet.create({
    //------CONTAINER------
    container: {
      backgroundColor: theme.backgroundColor,
      flex: 1,
      paddingHorizontal: scaleValues.spacing.md
    },

  });
};

export default FrameScreen;
