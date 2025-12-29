import { View, Text, StyleSheet } from "react-native";
import React, { useMemo } from "react";
import {  useLocalSearchParams } from "expo-router";
import { M43x2RouteParams, } from "../../../navigation/routes";
import { OLYMPUS_CAMERAS } from "../../../data";
import { OLYMPUS_LENSES } from "../../../data/gear-wiki";
import CameraCard from "../../../components/protected-components/gear-components/gear-wiki-components/CameraCard";
import LensCard from "../../../components/protected-components/gear-components/gear-wiki-components/LensCard";
import GearCard from "../../../components/protected-components/gear-components/gear-wiki-components/GearCard";
import { FlashList } from "@shopify/flash-list";
import { useTheme } from "../../../context/themeContext";
import { ThemeType } from "../../../types/others/themeType";
import { FontSizes } from "../../../constants/typography";
import { GearCategoryEnum } from "../../../types/enums";

const ItemWikiScreen = () => {
  const { itemWiki } = useLocalSearchParams<M43x2RouteParams['gearItemWiki']>();

  const { theme, fonts } = useTheme();
  const styles = createStyles(theme, fonts);

  const itemData = useMemo(() => {
    switch (itemWiki) {
      case GearCategoryEnum.CAMERA:
        return OLYMPUS_CAMERAS;
      case GearCategoryEnum.LENS:
        return OLYMPUS_LENSES;
      default:
        return null;
    }
  }, [itemWiki]);

  const renderItem = ({ item }) => {
    if (itemWiki === GearCategoryEnum.CAMERA) {
      return <CameraCard item={item}/>;
    }
    if (itemWiki === GearCategoryEnum.LENS) {
      return <LensCard item={item}/>;
    }
    return <GearCard />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>{itemWiki}</Text>
      </View>
      <FlashList
        data={itemData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const createStyles = (theme: ThemeType, fonts: FontSizes) => {
  return StyleSheet.create({
    //------CONTAINER------
    container: {
      flex: 1,
      backgroundColor: "#F8F9FA",
    },
    header: {
      padding: 20,
      backgroundColor: "#fff",
      borderBottomWidth: 1,
      borderBottomColor: "#EEE",
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#1A1A1A",
    },
    subtitle: {
      fontSize: 14,
      color: "#666",
      marginTop: 4,
    },
    listContent: {
      padding: 20,
    },
  });
};

export default ItemWikiScreen;
