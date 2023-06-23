import React, {
  createContext,
  useContext,
  useDebugValue,
  useEffect,
  useState,
} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerMenu from "./screens/DrawerMenu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import back from "./screens/suggested/back";
import Onboarding from "./screens/Onboarding";
import Chat from "./screens/Chat";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Settings from "./screens/Settings";
import WorkoutScreen from "./screens/suggested/WorkoutScreen";
import CardioScreen from "./screens/suggested/CardioScreen";
import Home from "./screens/Home";
import NewLegs from "./screens/suggested/NewLegs"
import { onAuthStateChanged } from "firebase/auth";
import StretchingScreen from "./screens/suggested/StretchingScreen";
import { auth } from "./config/firebase";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  useColorScheme,
  View,
  ActivityIndicator,
} from "react-native";

const Stack = createNativeStackNavigator();
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (authenticatedUser) => {
      console.log("Authentication state changed:", authenticatedUser);
      authenticatedUser ? setUser(authenticatedUser) : setUser(null);
    });

    return unsubscribeAuth;
  }, []);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

const Onboarding2 = () => {
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      const value = await AsyncStorage.getItem("onboardingDisplayed");

      if (value === null && value === "true") {
        setViewedOnboarding(false);
      } else {
        setViewedOnboarding(true);
        await AsyncStorage.setItem("onboardingDisplayed", "true");
      }
    };

    checkOnboarding();
  }, []);

  if (viewedOnboarding) {
    return (
      <Stack.Navigator initialRouteName="Onboarding1" headerMode="none">
        <Stack.Screen
          name="Onboarding1"
          component={Onboarding}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
  return null;
};

const RootNavigator = () => {
  const { user } = useContext(AuthenticatedUserContext);

  return (
    <NavigationContainer>
      {user ? <DrawerMenuStack /> : <OnboardingStack />}
    </NavigationContainer>
  );
};

const DrawerMenuStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={DrawerMenu}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerTitle: "Chat" }}
      />
      <Stack.Screen
        name="StretchingScreen"
        component={StretchingScreen}
        options={{ headerShown: false, }}
      />
      <Stack.Screen
        name="WorkoutScreen"
        component={WorkoutScreen}
        options={{ headerShown: false, }}
      />
      <Stack.Screen
        name="CardioScreen"
        component={CardioScreen}
        options={{ headerShown: false, }}
      />
      <Stack.Screen
        name="NewLegs"
        component={NewLegs}
        options={{ headerShown: false, }}
      />
      <Stack.Screen
        name="back"
        component={back}
        options={{ headerShown: false, }}
      />
    </Stack.Navigator>
  );
};

const OnboardingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Onboarding2"
        component={Onboarding2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Auth"
        component={AuthStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}
