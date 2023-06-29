import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const { width } = Dimensions.get("window");

const OnboardingItem = ({ item }) => {
  let [fontsLoaded] = useFonts({
    'Raleway-Medium': require('../src/assets/fonts/Raleway-Medium.ttf'),
    'Raleway-Bold': require('../src/assets/fonts/Raleway-Bold.ttf'),
    'Raleway-SemiBold': require('../src/assets/fonts/Raleway-SemiBold.ttf'),
    'Raleway-Black': require('../src/assets/fonts/Raleway-Black.ttf'),
    'Raleway-Thin': require('../src/assets/fonts/Raleway-Thin.ttf'),
    'Raleway-Regular': require('../src/assets/fonts/Raleway-Regular.ttf'),
    'SulphurPoint-Regular': require('../src/assets/fonts/SulphurPoint-Regular.ttf'),
    'SulphurPoint-Bold': require('../src/assets/fonts/SulphurPoint-Bold.ttf')
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[styles.container, { width }]}>
      <Image
        style={[styles.image, { width, resizeMode: "cover" }]}
        source={item.image}
      />
      <View style={styles.text_container}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    justifyContent: "center",
    width: width,
    height: width,
  },
  title: {
    fontSize: 26,
    marginTop: 20,
    color: "#191C21",
    textAlign: "center",
    fontFamily: "Raleway-Bold",
  },
  description: {
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 10,
    color: "#303443",
    fontFamily: "Raleway-SemiBold",
  },
});

export default OnboardingItem;
