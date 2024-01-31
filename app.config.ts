import 'dotenv/config'

export default {
  expo: {
    name: 'hepy-shop-react-native',
    slug: 'hepy-shop-react-native',
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
      backendUrl: process.env.BACKEND_URL
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
