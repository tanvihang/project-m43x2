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
    calendar: '/(protected)/(tabs)/calendar',
    health: '/(protected)/(tabs)/health',
    discover: '/(protected)/(tabs)/discover',

    settings: '/(protected)/settings',

    //* Common
    language: '/language',
    fontSize: '/fontSize',

} satisfies Record<string, Href>;