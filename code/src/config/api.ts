import Constants from 'expo-constants';

// Get all API endpoints from Expo config
const extra = Constants.expoConfig?.extra;

export const API_CONFIG = {
  SENTRY_SDN: extra?.sentrySdn,
  OPEN_WEATHER_MAP_API: extra?.openWeatherMapApi,
  OPEN_WEATHER_MAP_API_KEY: extra?.openWeatherMapApiKey,
} as const;

export const ENVIRONMENT = extra?.environment || 'production';

// Log current environment (for debugging)
if (__DEV__) {
  console.log('🌍 Environment:', ENVIRONMENT);
  console.log('📡 API Config:', API_CONFIG);
}
