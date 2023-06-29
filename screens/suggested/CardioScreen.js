import React, { useState, useEffect } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import {
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { ProgressBar } from "react-native-paper";
import { Video } from "expo-av";
import Collapsible from "react-native-collapsible";
import Icon from "react-native-vector-icons/AntDesign";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const scaleFactor = Dimensions.get("window").scale;
const scaleHeight = ({ source, desiredWidth }) => {
  const { width, height } = Image.resolveAssetSource(source);
  return (desiredWidth / width) * height;
};

const imageSource = "../../assets/img/running2.jpg";
const imageWidth = screenWidth;

const imageHeigh = scaleHeight({
  source: require(imageSource),
  desiredWidth: imageWidth,
});
const ExercisesProgress = ({ navigation }) => {
  const [videoHeight, setVideoHeight] = useState(0);

  const screenWidth = Dimensions.get('window').width;

  const handleReadyForDisplay = (event) => {
    const { width, height } = event.naturalSize;
    setVideoHeight(screenWidth * (height / width));
  };
  const progress = 0.5;
  const toggleAccordion = () => {
    setIsCollapsed(!isCollapsed);
  };
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const [layout, setLayout] = useState(null);

  const [height, setHeight] = useState(0);
  console.log(height);
  const onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height);
  };
  const [settings, setSettings] = useState({});
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
  const selectedLevel = settings?.level;
  return (
    <View style={styles.container}>
      <View style={styles.bgImage}>
        <Image
          source={require(imageSource)}
          style={{
            borderWidth: 1,
            width: imageWidth,
            height: imageHeigh,
          }}
        />
      </View>
      <ScrollView style={styles.whiteSheet}>
        <View
          style={{
            width: 1,
            height: imageHeigh - 30,
            backgroundColor: "white",
            opacity: 0,
          }}
        ></View>
        <View
          style={{
            minHeight: screenHeight,
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <View
            style={{
              width: screenWidth,
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 25,
            }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 100,
                borderColor: "#000",
                borderWidth: 2,
                alignContent: "center",
                alignItems: "center",
                justifyContent: "space-around",
                flexDirection: "row",
                height: 50,
                width: screenWidth / 2 - 40,
              }}
              title="Назад"
              onPress={() => navigation.goBack()}
            >
              <Icon name="swapleft" size={32}></Icon>
              <Text style={styles.btnText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 100,
                alignContent: "center",
                alignItems: "center",
                backgroundColor: "#03A0DC",
                justifyContent: "space-around",
                flexDirection: "row",
                height: 50,
                width: screenWidth / 2 - 40,
              }}
              title="Назад"
              onPress={toggleAccordion}
            >
              <Text style={styles.btnText}>Details</Text>
              <Icon name="info" size={32}></Icon>
            </TouchableOpacity>
          </View>
          <Text style={styles.mainHeader}>Day 01 - Cardio </Text>
          <Text style={styles.mainDescription}>
          Cardio training, also known as aerobic exercise, offers a wide range of benefits including improved heart health, weight management, increased energy levels, and mood enhancement. Engaging in activities such as running, cycling, or dancing can boost your overall fitness, endurance, and well-being.          </Text>

          <View style={styles.exerciseBlock}>
            <View style={styles.exerciseFirstRow}>
              <TouchableOpacity style={styles.exerciseDot}></TouchableOpacity>
              <Text style={styles.exerciseTitle}>ABS</Text>
              <Text style={styles.exerciseSubTitle}>3*12</Text>
            </View>
            <View onLayout={onLayout} style={styles.exerciseSecondRow}>
              <View style={{ ...styles.bar, maxHeight: height }}></View>
              <View style={styles.exerciseDescription}>
                <View style={styles.exerciseAdviseBlock}>
                  <Icon name="rocket1"></Icon>
                  <Text style={styles.exerciseAdvise}>
                  When performing abdominal exercises, maintain proper form by engaging your core muscles.
                  </Text>
                </View>
                <View style={styles.exerciseAdviseBlock}>
                  <Icon name="rocket1"></Icon>
                  <Text style={styles.exerciseAdvise}>
                  Start with exercises suitable for your fitness level, such as crunches or bicycle crunches.
                  </Text>
                </View>
                <View style={styles.exerciseAdviseBlock}>
                  <Icon name="rocket1"></Icon>
                  <Text style={styles.exerciseAdvise}>
                  Remember that achieving visible abs also requires reducing overall body fat through a combination of regular cardiovascular exercise
                  </Text>
                </View>
                <View>
                  <Collapsible collapsed={isCollapsed}>
                    <Video
                      source={require("../../assets/videos/cardio/cardio2.mp4")}
                      style={{ marginTop: 10, width: screenWidth * 0.8 , height: screenWidth * 0.8}}
                      useNativeControls={false}
                      resizeMode="contain"
                      shouldPlay={true}
                      isLooping={true}
                    />
                  </Collapsible>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.exerciseBlock}>
            <View style={styles.exerciseFirstRow}>
              <TouchableOpacity style={styles.exerciseDot}></TouchableOpacity>
              <Text style={styles.exerciseTitle}>Plank</Text>
              <Text style={styles.exerciseSubTitle}>3 min</Text>
            </View>
            <View onLayout={onLayout} style={styles.exerciseSecondRow}>
              <View style={{ ...styles.bar, maxHeight: height }}></View>
              <View style={styles.exerciseDescription}>
                <View style={styles.exerciseAdviseBlock}>
                  <Icon name="rocket1"></Icon>
                  <Text style={styles.exerciseAdvise}>
                  Start with proper form: Align your hands directly under your shoulders, engage your core, and maintain a straight line from your head to your heels to maximize the effectiveness of the plank exercise.                  </Text>
                </View>
                <View style={styles.exerciseAdviseBlock}>
                  <Icon name="rocket1"></Icon>
                  <Text style={styles.exerciseAdvise}>
                  Progress gradually: Begin with shorter durations and gradually increase the time as your core strength improves, aiming for a goal of holding the plank for at least 60 seconds to reap the full benefits.                  </Text>
                </View>
                <View style={styles.exerciseAdviseBlock}>
                  <Icon name="rocket1"></Icon>
                  <Text style={styles.exerciseAdvise}>
                  Challenge yourself: Add variations like side planks or dynamic movements to target different muscle groups and keep your plank workouts engaging and challenging.                  </Text>
                </View>
                <View>
                  <Collapsible collapsed={isCollapsed}>
                    <Video
                      source={require("../../assets/videos/cardio/cardio3.mp4")}
                      style={{ marginTop: 10, width: screenWidth * 0.8 , height: screenWidth * 0.8}}
                      useNativeControls={false}
                      resizeMode="contain"
                      shouldPlay={true}
                      isLooping={true}
                    />
                  </Collapsible>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  bgImage: { position: "absolute", width: screenWidth },
  whiteSheet: {
    width: screenWidth,
    minHeight: screenHeight,
  },
  bar: {
    width: 6,
    borderRadius: 10,
    backgroundColor: "#02597a",
  },
  btnText: {
    fontSize: 18,
    fontFamily: "Raleway-SemiBold",
    marginBottom: 5,
  },
  mainHeader: {
    fontSize: 24,
    fontFamily: "Raleway-Bold",
    alignSelf: "center",
    marginTop: 18,
  },
  mainDescription: {
    fontSize: 14,
    fontFamily: "Raleway-Medium",
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 24,

    color: "#3e4a5c",
    textAlign: "center",
  },
  exerciseBlock: {
    marginTop: -13,
    marginLeft: 18,
    flexDirection: "column",
    alignContent: "flex-start",
    alignItems: "flex-start",
  },
  exerciseFirstRow: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  exerciseSecondRow: {
    flexDirection: "row",
    marginLeft: 7,
    marginTop: 4,
  },
  exerciseTitle: {
    fontSize: 18,
    marginLeft: 8,
    fontFamily: "Raleway-SemiBold",
  },
  exerciseSubTitle: {
    fontSize: 14,
    marginLeft: 8,
    color: "#3e4a5c",
    fontFamily: "Raleway-SemiBold",
  },
  exerciseAdvise: {
    marginTop: -5,
    fontFamily: "Raleway-Regular",
  },
  exerciseDot: {
    width: 20,
    height: 20,
    backgroundColor: "#03A0DC",
    borderRadius: 100,
  },
  exerciseAdviseBlock: {
    flexDirection: "row",
    gap: 5,
    marginTop: 8,
    marginLeft: 8,
    width: 350,
  },
  exerciseAccordionButton: {
    alignSelf: "center",
    marginTop: 8,
    backgroundColor: "grey",
    width: 200,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default ExercisesProgress;
