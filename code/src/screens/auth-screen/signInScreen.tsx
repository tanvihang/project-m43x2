import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Controller } from 'react-hook-form'
import CtaButton from '../../components/ui/button/CtaButton';
import useSignIn from '../../hooks/auth-hook/useSignIn';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignInScreen = () => {

  const router = useRouter();
  const { control, handleSubmit, errors, isSubmitting } = useSignIn();
  
  return (
    <SafeAreaView style={{ padding: 20, gap: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Sign In</Text>

      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email format',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <View>
            <TextInput
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              style={{
                borderWidth: 1,
                borderColor: errors.email ? 'red' : '#ccc',
                padding: 12,
                borderRadius: 8,
              }}
              editable={!isSubmitting}
            />
            {errors.email && (
              <Text style={{ color: 'red', marginTop: 4 }}>{errors.email.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{ required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } }}
        render={({ field: { onChange, value } }) => (
          <View>
            <TextInput
              placeholder="Password"
              value={value}
              onChangeText={onChange}
              secureTextEntry
              style={{
                borderWidth: 1,
                borderColor: errors.password ? 'red' : '#ccc',
                padding: 12,
                borderRadius: 8,
              }}
              editable={!isSubmitting}
            />
            {errors.password && (
              <Text style={{ color: 'red', marginTop: 4 }}>{errors.password.message}</Text>
            )}
          </View>
        )}
      />

      <CtaButton
        title={isSubmitting ? 'Signing in...' : 'Sign In'}
        onPress={handleSubmit}
        disabled={isSubmitting}
      />

      <CtaButton
        title='Forgot password'
        onPress={() => {
          router.navigate('/forgotPassword')
        }}
      />

      <CtaButton
        title='Sign Up'
        onPress={() => {
          router.replace('/signUp')
        }}
      />
    </SafeAreaView>
  )
}

export default SignInScreen