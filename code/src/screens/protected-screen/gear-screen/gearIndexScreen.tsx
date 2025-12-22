import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CtaButton from "../../../components/ui/button/CtaButton";
import { router } from "expo-router";

const GearIndexScreen = () => {
  return (
    <SafeAreaView>
      <CtaButton
        title="Add Gear"
        onPress={() => {
          router.push('/(protected)/(tabs)/gear/cameraWiki')
        }}
      />
    </SafeAreaView>
  );
};

export default GearIndexScreen;
