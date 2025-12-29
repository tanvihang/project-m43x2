import { View, Text } from 'react-native'
import React from 'react'
import CtaButton from '../../../components/ui/button/CtaButton'
import { router } from 'expo-router'
import { M43x2RouteParams, Routes } from '../../../navigation/routes'
import { GearCategoryEnum } from '../../../types/enums'

const GearWikiScreen = () => {
  return (
    <View>
      <CtaButton
        title = "Camera Wiki"
        onPress={() => {

          const params: M43x2RouteParams['gearItemWiki'] = {
            itemWiki: GearCategoryEnum.CAMERA
          }

          router.push({pathname: Routes.gearItemWiki, params})
        }}
      />
      <CtaButton
        title = "Lens Wiki"
        onPress={() => {

          const params: M43x2RouteParams['gearItemWiki'] = {
            itemWiki: GearCategoryEnum.LENS
          }

          router.push({pathname: Routes.gearItemWiki, params})
        }}
      />
    </View>
  )
}

export default GearWikiScreen