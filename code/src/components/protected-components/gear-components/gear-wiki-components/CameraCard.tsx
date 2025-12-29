import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "../../../../context/themeContext";
import { ThemeType } from "../../../../types/others/themeType";
import { FontSizes } from "../../../../constants/typography";
import { CameraType } from "../../../../types/models/gear-wiki/gearType";
import { router } from "expo-router";
import { Routes, M43x2RouteParams } from "../../../../navigation/routes";

type CameraCardProps = {
    item: CameraType;
}

const CameraCard = ({item}: CameraCardProps) => {
  const { theme, fonts } = useTheme();
  const styles = createStyles(theme, fonts);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        const params: M43x2RouteParams['gearDetail'] = {
          id: item.Id,
          category: item.Category
        };
        router.push({
          pathname: Routes.gearDetail,
          params
        })
      }}
    >
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.seriesText}>{item.Series}</Text>
          <Text style={styles.modelName}>{item.ModelName}</Text>
        </View>
        <View
          style={[
            styles.badge,
            { backgroundColor: item.VisualAssets.PrimaryColor },
          ]}
        >
          <Text style={styles.badgeText}>
            {item.CoreSpecs.Sensor.Megapixels}MP
          </Text>
        </View>
      </View>

      <Text style={styles.nickname}>{item.Lore.Nickname}</Text>

      <View style={styles.specsRow}>
        <Text style={styles.specItem}>📸 {item.CoreSpecs.Sensor.Type}</Text>
        <Text style={styles.specItem}>
          ✋ {item.CoreSpecs.StabilizationStops} Stops
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (theme: ThemeType, fonts: FontSizes) => {
  return StyleSheet.create({
    card: {
      backgroundColor: "#FFF",
      borderRadius: 16,
      padding: 16,
      // 阴影效果
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 3,
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    seriesText: {
      fontSize: 12,
      fontWeight: "600",
      color: "#007AFF", // 品牌蓝
      marginBottom: 2,
    },
    modelName: {
      fontSize: 20,
      fontWeight: "700",
      color: "#333",
    },
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },
    badgeText: {
      color: "#FFF",
      fontSize: 10,
      fontWeight: "bold",
    },
    nickname: {
      fontSize: 14,
      fontStyle: "italic",
      color: "#555",
      marginTop: 8,
      marginBottom: 12,
    },
    specsRow: {
      flexDirection: "row",
      borderTopWidth: 1,
      borderTopColor: "#F0F0F0",
      paddingTop: 12,
    },
    specItem: {
      fontSize: 12,
      color: "#888",
      marginRight: 15,
    },
  });
};

export default CameraCard;
