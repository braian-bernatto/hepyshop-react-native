import 'dotenv/config'

export default {
  expo: {
    name: 'hepy-shop-react-native',
    slug: 'hepy-shop-react-native',
    description: 'Compra los mejores productos al mejor precio',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff'
      }
    },
    web: {
      favicon: './assets/favicon.png'
    },
    extra: {
      backendUrl: process.env.EXPO_PUBLIC_BACKEND_URL,
      eas: {
        projectId: '0c694743-7c5e-4271-8067-24241dbc4c47'
      }
    },
    updates: {
      url: 'https://u.expo.dev/0c694743-7c5e-4271-8067-24241dbc4c47'
    },
    runtimeVersion: {
      policy: 'appVersion'
    },
    plugins: [
      [
        'expo-image-picker',
        {
          photosPermission:
            'Permite a HepyShop acceder a tu galeria para alzar foto de tus productos'
        }
      ]
    ]
  }
}
