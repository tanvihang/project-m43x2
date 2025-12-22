import type { Href } from "expo-router";

export const Routes = {
    //* Auth
    //* Sign Up
    signUp: '/(auth)/signUp',
    signUpOtp: '/(auth)/signUp/signUpOtp',

    //* Sign In
    signIn: '/(auth)/signIn',

    //* Others
    forgotPassword: '/(auth)/forgotPassword',
    onboarding: '/(auth)/onBoarding',

    //* Protected
    home: '/(protected)/(tabs)/home',
    frame: '/(protected)/(tabs)/frame',
    gear: '/(protected)/(tabs)/gear',
    recipe: '/(protected)/(tabs)/recipe',
    compute: '/(protected)/(tabs)/compute',

    //* Common
    language: '/language',
    fontSize: '/fontSize',

} satisfies Record<string, Href>;