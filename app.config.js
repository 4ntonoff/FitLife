import 'dotenv/config'

export default {
  "expo": {
    "name": "fitlife",
    "slug": "fitlife",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/AppLogo.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/AppLogo.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/AppLogo.png",
        "backgroundColor": "#ffffff00"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID
  }
}
}
