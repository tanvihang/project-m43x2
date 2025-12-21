import Constants from 'expo-constants';

// Get all API endpoints from Expo config
const extra = Constants.expoConfig?.extra;

export const API_CONFIG = {
  GRAPH_QL_API: extra?.graphQLApi,
  VITALZ_API: extra?.vitalzApi,
  JC_RING_RAW_SERVICE_API: extra?.jcRingRawServiceApi,
  USER_INSIGHTS_API: extra?.userInsightsApi,
  INBODY_API: extra?.inbodyApi,
} as const;

export const ENVIRONMENT = extra?.environment || 'production';

// Log current environment (for debugging)
if (__DEV__) {
  console.log('🌍 Environment:', ENVIRONMENT);
  console.log('📡 API Config:', API_CONFIG);
}
