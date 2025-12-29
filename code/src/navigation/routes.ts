import type { Href } from "expo-router";
import { GearCategoryEnum } from "../types/enums";

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

    setting: '/(protected)/settings',
    developerPlayground: '/(protected)/settings/developer-playground',
    errorPlayground: '/(protected)/settings/developer-playground/errorPlayground',

    //* Gear
    gearWiki: '/(protected)/(tabs)/gear/gearWiki',
    gearDetail: '/(protected)/(tabs)/gear/detail/[id]',
    gearItemWiki: '/(protected)/(tabs)/gear/[itemWiki]',

    //* Common
    language: '/language',
    fontSize: '/fontSize',

} satisfies Record<string, Href>;

export type M43x2RouteParams = {
    gearDetail: {
        id: string;
        category: GearCategoryEnum;
    },
    gearItemWiki: {
        itemWiki: GearCategoryEnum;
    }
}
