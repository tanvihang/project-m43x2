import { View, Text } from 'react-native'
import React from 'react'
import CtaButton from '../../../../components/ui/button/CtaButton'
import { router } from 'expo-router'
import { Routes } from '../../../../navigation/routes'

const DeveloperPlaygroundIndexScreen = () => {
  return (
    <View>
      <CtaButton
        title='Error Playground'
        onPress={() => {
          router.push(Routes.errorPlayground)
        }}
      />
    </View>
  )
}

export default DeveloperPlaygroundIndexScreen