import React from "react";
import CtaButton from "../../../components/ui/button/CtaButton";
import { router } from "expo-router";
import { Routes } from "../../../navigation/routes";
import { View } from "react-native";

const GearIndexScreen = () => {
  return (
    <View>
      <CtaButton
        title="Add Gear"
        onPress={() => {
          router.push(Routes.gearWiki)
        }}
      />
    </View>
  );
};

export default GearIndexScreen;
