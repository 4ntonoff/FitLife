import React, { useState,useEffect } from "react";
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

const imageSource = "../../assets/img/running.jpg";
const imageWidth = screenWidth;

const imageHeigh = scaleHeight({
  source: require(imageSource),
  desiredWidth: imageWidth,
});
const ExercisesProgress = ({ navigation }) => {
  const [videoHeight, setVideoHeight] = useState(0);
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
const [settings, setSettings] = useState({});
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
          <Text style={styles.mainHeader}>Day 01 - Stretching </Text>
          <Text style={styles.mainDescription}>
            Stretching improves flexibility, range of motion, and physical
            performance. It's done before and after exercise to prevent injury,
            reduce soreness, improve posture, reduce stress, and increase blood
            flow.
          </Text>

          <View style={styles.exerciseBlock}>
            <View style={styles.exerciseFirstRow}>
              <TouchableOpacity style={styles.exerciseDot}></TouchableOpacity>
              <Text style={styles.exerciseTitle}>Side lunges</Text>
              <Text style={styles.exerciseSubTitle}>3 min</Text>
            </View>
            <View onLayout={onLayout} style={styles.exerciseSecondRow}>
              <View style={{ ...styles.bar, maxHeight: height }}></View>
              <View style={styles.exerciseDescription}>
                <View style={styles.exerciseAdviseBlock}>
                  <Icon name="rocket1"></Icon>
                  <Text style={styles.exerciseAdvise}>
                    Start slow and gradually increase your pace and distance to
                    avoid injury and build endurance.
                  </Text>
                </View>
                <View style={styles.exerciseAdviseBlock}>
                  <Icon name="rocket1"></Icon>
                  <Text style={styles.exerciseAdvise}>
                    Wear proper running shoes that fit well and provide adequate
                    support to prevent foot and ankle injuries.
                  </Text>
                </View>
                
                <View>
                  <Collapsible collapsed={isCollapsed}>
                    <Video
                      source={require("../../assets/videos/stretching/stretching3.mp4")}
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
              <Text style={styles.exerciseTitle}>Shoulders stretching</Text>
              <Text style={styles.exerciseSubTitle}>3 min</Text>
            </View>
            <View onLayout={onLayout} style={styles.exerciseSecondRow}>
              <View style={{ ...styles.bar, maxHeight: height }}></View>
              <View style={styles.exerciseDescription}>
                <View style={styles.exerciseAdviseBlock}>
                  <Icon name="rocket1"></Icon>
                  <Text style={styles.exerciseAdvise}>
                  Start with gentle stretches to gradually increase flexibility.
                  </Text>
                </View>
                <View style={styles.exerciseAdviseBlock}>
                  <Icon name="rocket1"></Icon>
                  <Text style={styles.exerciseAdvise}>
                  Warm up before stretching to prevent injury.
                  </Text>
                </View>
                <View style={styles.exerciseAdviseBlock}>
                  <Icon name="rocket1"></Icon>
                  <Text style={styles.exerciseAdvise}>
                  Listen to your body and avoid pain during stretching.
                  </Text>
                </View>
                <View>
                  <Collapsible collapsed={isCollapsed}>
                    <Video
                      source={require("../../assets/videos/stretching/stretching5.mp4")}
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
