/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useRef } from "react";
import { auth } from "../config/firebase";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import {
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  useColorScheme,
  View,
  Alert,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NavigationContainer,
  NavigationHelpersContext,
  useNavigation,
  DrawerActions,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WeightChart from "./WeightChart";

import { signOut } from "firebase/auth";

import Chat from "./Chat";
import { onAuthStateChanged } from "firebase/auth";

//Tab Icons
import CoachAI from "./CoachAI";
import home from "../assets/IC_Home.png";
import logout from "../assets/IC_Logout.png";
import chat from "../assets/IC_Chat.png";
import menu from "../assets/IC_Menu.png";
import ai from "../assets/IC/IC_Ai.png";
import settingsicon from "../assets/IC/IC_Setting.png";
import Home from "./Home";
import Onboarding from "./Onboarding";

import Settings from "./Settings";
const width = Dimensions.get("window").width - 30;
export default function App({ navigation }) {
  const [username, setUsername] = useState("");
  //Home part
  const motivation = "Sweat, achieve, repeat!";
  const date = new Date();
  const day = date.getDate();
  let month = date.getMonth() + 1; // getMonth() returns a zero-based index, so we need to add 1 to get the actual month number
  switch (month) {
    case 1:
      month = "January";
      break;
    case 2:
      month = "February";
      break;
    case 3:
      month = "March";
      break;
    case 4:
      month = "April";
      break;
    case 5:
      month = "May";
      break;
    case 6:
      month = "June";
      break;
    case 7:
      month = "July";
      break;
    case 8:
      month = "August";
      break;
    case 9:
      month = "September";
      break;
    case 10:
      month = "October";
      break;
    case 11:
      month = "November";
      break;
    case 12:
      month = "December";
      break;
    default:
      month = "Invalid month";
  }
  const [currentTab, setCurrentTab] = useState("Home");
  //time
  const currentHour = new Date().getHours();
  let greetingMessage;

  if (currentHour >= 5 && currentHour < 12) {
    greetingMessage = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    greetingMessage = "Good Afternoon";
  } else {
    greetingMessage = "Good Evening";
  }
  useEffect(() => {
    const retrieveData = async () => {
      try {
        const storedMode = await AsyncStorage.getItem("selectedMode");
        const storedLevel = await AsyncStorage.getItem("selectedLevel");
        if (storedMode) {
          setSelectedMode(storedMode);
        }
        if (storedLevel) {
          setSelectedLevel(storedLevel);
        }
      } catch (error) {
        console.log("Error retrieving selected values:", error);
      }
    };

    retrieveData();
  }, []);

  console.log(selectedMode);
  console.log(selectedLevel);
  //Animatia
  const [showMenu, setShowMenu] = React.useState(false);
  const offsetValue = useRef(new Animated.Value(0)).current;
  //prima valoare trebuie sa fie 1
  const scaleValue = useRef(new Animated.Value(1)).current;
  const Stack = createNativeStackNavigator();

  const [profilePicture, setProfilePicture] = useState(null);
  const [settings, setSettings] = useState({});

  // Retrieve the data from the database
  useEffect(() => {
    const database = getDatabase();
    const settingsRef = ref(database, "settings/");

    const unsubscribe = onValue(settingsRef, (snapshot) => {
      const data = snapshot.val();
      setSettings(data);
    });

    // Clean up the event listener
    return () => unsubscribe();
  }, []);

  // Access the retrieved values in your component
  const selectedLevel = settings?.level;

  // Use the selectedLevel in the switch statement
  let level;
  switch (selectedLevel) {
    case "lvl1":
      level = "Beginner";
      break;
    case "lvl2":
      level = "Medium";
      break;
    case "lvl3":
      level = "Advanced";
      break;
    default:
      level = "Level";
  }
  const selectedMode = settings?.mode;

  console.log(selectedMode);
  console.log(selectedLevel);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        const db = getDatabase();
        const usernameRef = ref(db, `users/${userId}/username`);
        onValue(usernameRef, (snapshot) => {
          const username = snapshot.val();
          if (username) {
            setUsername(username);
          }
        });
        const profileImageRef = ref(db, `users/${userId}/profilePicture`);
        onValue(profileImageRef, (snapshot) => {
          const profilePicture = snapshot.val();
          if (profilePicture) {
            setProfilePicture(profilePicture);
          }
        });
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);
  switch (selectedLevel) {
    case "lvl1":
      level = "Beginner";
      break;
    case "lvl2":
      level = "Medium";
      break;
    case "lvl3":
      level = "Advanced";
      break;
    default:
      level = "Level";
  }
  const calculateWorkoutDuration = (level) => {
    if (level === "Beginner") {
      return 10; // 10 minutes for beginner level
    } else if (level === "Medium") {
      return 20; // 20 minutes for medium level
    } else if (level === "Advanced") {
      return 40; // 30 minutes for advanced level
    } else {
      return 0; // Default duration if level is not recognized
    }
  };
  const calculateWorkoutDuration2 = (level) => {
    if (level === "Beginner") {
      return 50;
    } else if (level === "Medium") {
      return 60;
    } else if (level === "Advanced") {
      return 80;
    } else {
      return 0; // Default duration if level is not recognized
    }
  };
  return (
    <SafeAreaView style={styles.drawerContainer}>
      <View style={{ justifyContent: "flex-start", padding: 20 }}>
        <Image
          source={{ uri: profilePicture }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
          }}
        ></Image>

        <View key={username}>
          <Text
            style={{
              fontSize: 20,
              color: "white",
              marginTop: 30,
              marginBottom: 10,
              fontFamily: "Raleway-Bold",
            }}
          >
            {username}
          </Text>
        </View>

        <View style={{ fontFamily: "Raleway-Bold", flexGrow: 1 }}>
          {
            // Tab bar buttons
          }

          {TabButton(
            currentTab,
            setCurrentTab,
            "Home",
            home,
            showMenu,
            setShowMenu,
            scaleValue,
            offsetValue
          )}
          {TabButton(
            currentTab,
            setCurrentTab,
            "Chat",
            chat,
            showMenu,
            setShowMenu,
            scaleValue,
            offsetValue
          )}
          {TabButton(
            currentTab,
            setCurrentTab,
            "Settings",
            settingsicon,
            showMenu,
            setShowMenu,
            scaleValue,
            offsetValue
          )}
          {TabButton(
            currentTab,
            setCurrentTab,
            "CoachAI",
            ai,
            showMenu,
            setShowMenu,
            scaleValue,
            offsetValue
          )}
        </View>

        <View>{TabButton(currentTab, setCurrentTab, "LogOut", logout)}</View>
      </View>

      {
        // overlay viewf
      }
      <Animated.View
        style={{
          flexGrow: 1,
          backgroundColor: "white",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          paddingVertical: 0,
          borderRadius: showMenu ? 25 : 0,
          //transforming view
          transform: [
            {
              scale: scaleValue,
            },
            {
              translateX: offsetValue,
            },
          ],
        }}
      >
        {
          //menu button
        }
        <TouchableOpacity
          onPress={() => {
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.88,
              duration: 150,
              useNativeDriver: true,
            }).start();

            Animated.timing(offsetValue, {
              toValue: showMenu ? 0 : 220,
              duration: 300,
              useNativeDriver: true,
            }).start();

            setShowMenu(!showMenu); //zamarocika asta pentru click
          }}
        >
          <Image
            source={menu}
            style={{
              width: 40,
              height: 40,
              tintColor: "black",
              marginTop: 20,
              marginLeft: 10,
              marginBottom: 12,
            }}
          ></Image>
        </TouchableOpacity>

        {currentTab === "Home" ? (
          <ScrollView style={{ backgroundColor: "#fff" }}>
            <View style={styles.container}>
              <Text style={styles.greeting}>
                {greetingMessage}, {username} 👋
              </Text>
              <Text style={styles.motivation}>{motivation}</Text>

              <Text style={styles.header}>Suggested workout:</Text>
            </View>
            <ScrollView
              style={{ margin: 0 }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("StretchingScreen")}
                style={styles.recomendation}
              >
                <View style={styles.recomendation_button}>
                  <Image
                    style={styles.recomendation_image}
                    source={require("../assets/img/stretching.jpg")}
                  ></Image>
                  <LinearGradient
                    colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.9)"]}
                    style={styles.recomendation_image__gradient}
                  />
                  <View style={styles.recomendation_descBar}>
                    <Text style={styles.recomendation_title}>Stretching</Text>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <Text style={styles.recomendation_bar_text}>
                      {calculateWorkoutDuration(level)} minutes
                      </Text>

                      <View style={styles.recomendation_bar_line}></View>
                      <Text style={styles.recomendation_bar_text}>{level}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("WorkoutScreen")}
                style={styles.recomendation}
              >
                <View style={styles.recomendation_button}>
                  <Image
                    style={styles.recomendation_image}
                    source={require("../assets/img/legs.jpg")}
                  ></Image>
                  <LinearGradient
                    colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.9)"]}
                    style={styles.recomendation_image__gradient}
                  />
                  <View style={styles.recomendation_descBar}>
                    <Text style={styles.recomendation_title}>Legs</Text>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <Text style={styles.recomendation_bar_text}>
                      {calculateWorkoutDuration2(level)} minutes
                      </Text>

                      <View style={styles.recomendation_bar_line}></View>
                      <Text style={styles.recomendation_bar_text}>{level}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("CardioScreen")}
                style={styles.recomendation}
              >
                <View style={styles.recomendation_button}>
                  <Image
                    style={styles.recomendation_image}
                    source={require("../assets/img/running2.jpg")}
                  ></Image>
                  <LinearGradient
                    colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.9)"]}
                    style={styles.recomendation_image__gradient}
                  />
                  <View style={styles.recomendation_descBar}>
                    <Text style={styles.recomendation_title}>Cardio</Text>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <Text style={styles.recomendation_bar_text}>
                      {calculateWorkoutDuration(level)} minutes
                      </Text>

                      <View style={styles.recomendation_bar_line}></View>
                      <Text style={styles.recomendation_bar_text}>{level}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </ScrollView>
            <View style={styles.container}>
              <Text style={styles.header}>Some other workouts:</Text>
              <TouchableOpacity style={styles.workout}
              onPress={() => navigation.navigate("NewLegs")}>
                <View style={styles.workout_button}>
                  <Image
                    style={styles.workout_image}
                    source={require("../assets/img/squats.jpg")}
                  ></Image>
                  <LinearGradient
                    colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.9)"]}
                    style={styles.workout_image__gradient}
                  />
                  <View style={styles.workout_descBar}>
                    <Text style={styles.workout_title}>Legs</Text>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <Text style={styles.workout_bar_text}>35 minutes</Text>

                      <View style={styles.workout_bar_line}></View>
                      <Text style={styles.workout_bar_text}>{level}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.workout}
               onPress={() => navigation.navigate("back")}>
                <View style={styles.workout_button}>
                  <Image
                    style={styles.workout_image}
                    source={require("../assets/img/back.jpg")}
                  ></Image>
                  <LinearGradient
                    colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.9)"]}
                    style={styles.workout_image__gradient}
                  />
                  <View style={styles.workout_descBar}>
                    <Text style={styles.workout_title}>Back</Text>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <Text style={styles.workout_bar_text}>40 minutes</Text>

                      <View style={styles.workout_bar_line}></View>
                      <Text style={styles.workout_bar_text}>{level}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.workout}
               onPress={() => navigation.navigate("back")}>
                <View style={styles.workout_button}>
                  <Image
                    style={styles.workout_image}
                    source={require("../assets/img/chest.jpg")}
                  ></Image>
                  <LinearGradient
                    colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.9)"]}
                    style={styles.workout_image__gradient}
                  />
                  <View style={styles.workout_descBar}>
                    <Text style={styles.workout_title}>Chest</Text>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <Text style={styles.workout_bar_text}>35 minutes</Text>

                      <View style={styles.workout_bar_line}></View>
                      <Text style={styles.workout_bar_text}>{level}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.workout}
               onPress={() => navigation.navigate("back")}>
                <View style={styles.workout_button}>
                  <Image
                    style={styles.workout_image}
                    source={require("../assets/img/abs2.jpg")}
                  ></Image>
                  <LinearGradient
                    colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.9)"]}
                    style={styles.workout_image__gradient}
                  />
                  <View style={styles.workout_descBar}>
                    <Text style={styles.workout_title}>Chest</Text>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <Text style={styles.workout_bar_text}>35 minutes</Text>

                      <View style={styles.workout_bar_line}></View>
                      <Text style={styles.workout_bar_text}>{level}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.workout}
               onPress={() => navigation.navigate("back")}>
                <View style={styles.workout_button}>
                  <Image
                    style={styles.workout_image}
                    source={require("../assets/img/shoulders1.jpg")}
                  ></Image>
                  <LinearGradient
                    colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.9)"]}
                    style={styles.workout_image__gradient}
                  />
                  <View style={styles.workout_descBar}>
                    <Text style={styles.workout_title}>Shoulders</Text>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <Text style={styles.workout_bar_text}>35 minutes</Text>

                      <View style={styles.workout_bar_line}></View>
                      <Text style={styles.workout_bar_text}>{level}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : currentTab === "Chat" ? (
          <Chat />
        ) : currentTab === "Settings" ? (
          <Settings />
        ) : currentTab === "CoachAI" ? (
          <CoachAI />
        ) : null}
      </Animated.View>
    </SafeAreaView>
  );
}

//for multiple buttons

const TabButton = (
  currentTab,
  setCurrentTab,
  title,
  image,
  showMenu,
  setShowMenu,
  scaleValue,
  offsetValue
) => {
  const navigation = useNavigation();

  const onPressHandler = () => {
    if (title === "LogOut") {
      signOut(auth)
        .then(() => {
          // Log out successful
          navigation.reset({
            index: 0,
            routes: [{ name: Onboarding }],
          });
        })
        .catch((error) => {
          // An error occurred during logout
          console.log(error);
          // Display an error message or handle the error as desired
        });
    } else {
      setCurrentTab(title);
      if (showMenu) {
        setShowMenu(false);
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start();
        Animated.timing(offsetValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          if (navigation.canGoBack()) {
            navigation.dispatch(DrawerActions.closeDrawer());
          }
        });
      }
    }
  };

  return (
    <TouchableOpacity onPress={onPressHandler}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 8,
          backgroundColor: currentTab == title ? "white" : "transparent",
          paddingLeft: 20,
          paddingRight: 30,
          borderRadius: 8,
          marginTop: 15,
        }}
      >
        <Image
          source={image}
          style={{
            width: 25,
            height: 25,
            tintColor: currentTab == title ? "#5359D1" : "white",
          }}
        ></Image>

        <Text
          style={{
            fontSize: 15,
            fontFamily: "Raleway-Bold",
            paddingLeft: 15,
            color: currentTab == title ? "#5359D1" : "white",
          }}
        >
          {" "}
          {title}{" "}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: "#5359D1",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  tinyLogo: {
    width: "50%",
    height: 100,
    opacity: 0.5,
  },
  blankContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#5359D1",
    justifyContent: "center",
  },

  //Home part
  container: {
    flex: 1,
    width: "90%",
    marginLeft: 15,
    backgroundColor: "#fff",
  },
  greeting: {
    fontFamily: "Raleway-Bold",
    fontSize: 20,
    marginTop: 14,
    color: "#3e4a5c",
  },
  motivation: {
    fontFamily: "Raleway-Bold",
    fontSize: 32,
    marginTop: 16,
    lineHeight: 30,
  },
  recomendation: {
    width: width,
    position: "relative",
    marginRight: -30,
  },
  header: {
    fontFamily: "Raleway-SemiBold",
    marginTop: 24,
  },
  recomendation_button: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    marginHorizontal: 12,
    backgroundColor: "#0B2239",
    borderRadius: 30,
    width: width - 50,
    height: width * 0.6 + 10,
  },
  recomendation_image: {
    width: width - 60,
    height: width * 0.6,
    borderColor: "white",
    borderWidth: 5,
    borderRadius: 26,
  },
  recomendation_image__gradient: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: 10,
    height: width / 2.5,
    borderRadius: 22,
  },
  recomendation_descBar: {
    flex: 1,
    flexDirection: "column",
    position: "absolute",
    width: width - 40,
    left: 30,
    bottom: 25,
  },
  recomendation_bar_text: {
    fontSize: 16,
    fontFamily: "SulphurPoint-Bold",
    color: "white",
  },
  recomendation_title: {
    position: "absolute",
    fontSize: 24,
    fontFamily: "SulphurPoint-Bold",
    color: "white",
    bottom: 35,
    left: 0,
  },
  recomendation_bar_line: {
    width: 1,
    height: 22,
    opacity: 0.6,
    backgroundColor: "white",
    marginHorizontal: 10,
  },

  workout: {
    width: width,
    position: "relative",
  },
  workout_button: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    backgroundColor: "#0B2239",
    borderRadius: 30,
    width: width,
    height: width * 0.3,
  },
  workout_image: {
    width: width,
    height: width * 0.3,
    borderColor: "white",
    borderRadius: 26,
  },
  workout_image__gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: width * 0.3,
    borderRadius: 22,
  },
  workout_descBar: {
    flex: 1,
    flexDirection: "column",
    position: "absolute",
    width: width - 40,
    left: 25,
    bottom: 20,
  },
  workout_bar_text: {
    fontSize: 16,
    fontFamily: "SulphurPoint-Bold",
    color: "white",
  },
  workout_title: {
    position: "absolute",
    fontSize: 24,
    fontFamily: "SulphurPoint-Bold",
    color: "white",
    bottom: 35,
    left: 0,
  },
  workout_bar_line: {
    width: 1,
    height: 22,
    opacity: 0.6,
    backgroundColor: "white",
    marginHorizontal: 10,
  },
});
