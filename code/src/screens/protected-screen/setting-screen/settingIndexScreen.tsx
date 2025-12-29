import { View, Text } from 'react-native'
import React from 'react'
import CtaButton from '../../../components/ui/button/CtaButton'
import { router } from 'expo-router'
import { Routes } from '../../../navigation/routes'

const SettingIndexScreen = () => {
  return (
    <View>
      <CtaButton
        title = "Developer Playground"
        onPress={() => {
          router.push(Routes.developerPlayground)
        }}
      />
    </View>
  )
}

export default SettingIndexScreen