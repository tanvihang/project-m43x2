import { View, Text } from 'react-native'
import React from 'react'
import CtaButton from '../../../components/ui/button/CtaButton'
import { useRouter } from 'expo-router'

const SignUpSelectionScreen = () => {

  const router = useRouter();

  return (
    <View>
      <CtaButton
        title='Sign Up SBRing'
        onPress={() => {
          router.navigate('/signUp/signUpSbRing')
        }}
      />
    </View>
  )
}

export default SignUpSelectionScreen