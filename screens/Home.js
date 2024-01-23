import React, { useEffect, useState } from "react";

import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Button
} from "react-native";
import { Squircle } from "react-ios-corners";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
const width = Dimensions.get("window").width - 30;
export default function Home({ navigation }) {
  const username = "Alex";
  const motivation = "Sweat, achieve, repeat!";

  const [selectedMode, setSelectedMode] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const date = new Date();
  const day = date.getDate();
  // getMonth() returns a zero-based index, so we need to add 1 to get the actual month number
  let month = date.getMonth() + 1; 
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
  // Time
  const currentHour = new Date().getHours();
  let greetingMessage;

  switch (true) {
    case currentHour >= 5 && currentHour < 12:
      greetingMessage = "Good Morning";
      break;
    case currentHour >= 12 && currentHour < 18:
      greetingMessage = "Good Afternoon";
      break;
    default:
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

  console.log('SelectedMode = ' + selectedMode);
  console.log('SelectedLevel = ' + selectedLevel);
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
  return (
    <ScrollView style={{backgroundColor:'#fff'}}>
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
        <View style={styles.recomendation}>
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
                <Text style={styles.recomendation_bar_text}>10 minutes</Text>

                <View style={styles.recomendation_bar_line}></View>
                <Text style={styles.recomendation_bar_text}>{level}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.recomendation}>
          <View style={styles.recomendation_button}>
            <Image
              style={styles.recomendation_image}
              source={require("../assets/img/stretching.jpg")}
            ></Image>
            <Button
        title="Перейти на экран Details"
        onPress={() => navigation.navigate('Details')}
      />
            <LinearGradient
              colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.9)"]}
              style={styles.recomendation_image__gradient}
            />
            <View style={styles.recomendation_descBar}>
              <Text style={styles.recomendation_title}>Dr</Text>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Text style={styles.recomendation_bar_text}>10 minutes</Text>

                <View style={styles.recomendation_bar_line}></View>
                <Text style={styles.recomendation_bar_text}>{level}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.recomendation}>
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
                <Text style={styles.recomendation_bar_text}>10 minutes</Text>

                <View style={styles.recomendation_bar_line}></View>
                <Text style={styles.recomendation_bar_text}>{level}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Some other workouts:</Text>
        <View style={styles.workout}>
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
                <Text style={styles.workout_bar_text}>10 minutes</Text>

                <View style={styles.workout_bar_line}></View>
                <Text style={styles.workout_bar_text}>{level}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.workout}>
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
                <Text style={styles.workout_bar_text}>10 minutes</Text>

                <View style={styles.workout_bar_line}></View>
                <Text style={styles.workout_bar_text}>{level}</Text>
              </View>
            </View>
          </View>
        </View>
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
