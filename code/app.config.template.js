

const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_STAGING = process.env.APP_VARIANT === 'staging';

// Define all your API endpoints here
const getApiConfig = () => {
  if (IS_DEV) {
    return {
      openWeatherMapApi: 'PLACE_HOLDER_API_URL',
      openWeatherMapApiKey: 'PLACE_HOLDER_API_KEY'
    };
  }
  
  if (IS_STAGING) {
    return {
      openWeatherMapApi: 'PLACE_HOLDER_API_URL',
      openWeatherMapApiKey: 'PLACE_HOLDER_API_KEY'
    };
  }
  
  // Production
  return {
      openWeatherMapApi: 'PLACE_HOLDER_API_URL',
      openWeatherMapApiKey: 'PLACE_HOLDER_API_KEY'
  };
};

export default {
  expo: {
    name: IS_DEV ? 'M43x2Mobile (DEV)' : IS_STAGING ? 'M43x2Mobile (STG)' : 'M43x2Mobile',
    slug: 'M43x2Mobile',
    version: '1.0.0',
    plugins: [
      'expo-router',
    ],
    scheme: 'm43x2mobile',
    ios: {
      "bundleIdentifier": "com.atpical.m43x2mobile",
      "icon": "./assets/images/icon.png"
    },
    android: {
      "package": "com.atpical.m43x2mobile",
      "icon": "./assets/images/icon.png"
    },
    extra: {
      ...getApiConfig(),
      environment: IS_DEV ? 'development' : IS_STAGING ? 'staging' : 'production',
    },
  },
};
