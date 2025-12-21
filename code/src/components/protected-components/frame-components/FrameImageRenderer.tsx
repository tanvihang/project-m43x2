import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../../../context/themeContext";
import { ThemeType } from "../../../types/others/themeType";
import { FontSizes } from "../../../constants/typography";
import { Image } from "expo-image";

type FrameImageRendererProps = {
  imageUri?: string;
  exifData?: any;
};

const FrameImageRenderer = ({
  exifData,
  imageUri,
}: FrameImageRendererProps) => {
  const { theme, fonts } = useTheme();
  const styles = createStyles(theme, fonts);

  const renderMetadata = () => {
    if (!exifData) return null;

    return (
      <View style={styles.metadataContainer}>
        <Text style={styles.metadataTitle}>Image Metadata</Text>
        {Object.entries(exifData).map(([key, value]) => (
          <View key={key} style={styles.metadataRow}>
            <Text style={styles.metadataKey}>{key}:</Text>
            <Text style={styles.metadataValue}>{String(value)}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {imageUri && (
        <>
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            contentFit="contain"
          />
          {renderMetadata()}
        </>
      )}
    </View>
  );
};

const createStyles = (theme: ThemeType, fonts: FontSizes) => {
  return StyleSheet.create({
    //------CONTAINER------
    container: {
      flex: 1,
    },
    scrollContent: {
      padding: 16,
      alignItems: "center",
    },
    image: {
      flex: 1,
      width: "100%",
      height: 300,
    },
    metadataContainer: {
      width: "100%",
      backgroundColor: theme.backgroundColor,
      padding: 16,
      borderRadius: 8,
    },
    metadataTitle: {
      fontSize: fonts.body,
      fontWeight: "bold",
      color: theme.textBody,
      marginBottom: 12,
    },
    metadataRow: {
      flexDirection: "row",
      marginBottom: 8,
      flexWrap: "wrap",
    },
    metadataKey: {
      fontSize: fonts.body,
      fontWeight: "600",
      color: theme.textBody,
      marginRight: 8,
      minWidth: 120,
    },
    metadataValue: {
      fontSize: fonts.body,
      color: theme.textBody,
      flex: 1,
    },
  });
};

export default FrameImageRenderer;
