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

const imageSource = "../../assets/img/back.jpg";
const imageWidth = screenWidth;

const imageHeigh = scaleHeight({
  source: require(imageSource),
  desiredWidth: imageWidth,
});
const ExercisesProgress = ({ navigation }) => {
  const [videoHeight, setVideoHeight] = useState(0);

  const screenWidth = Dimensions.get("window").width;

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
         
          <Text style={styles.mainDescription}>
            Leg exercises target large muscle groups like the quadriceps,
            hamstrings, and glutes. Strong legs provide a solid foundation for
            overall strength, stability, and athletic performance. Additionally,
            leg training can help improve balance, increase metabolism, and
            enhance overall body composition
          </Text>
          <View style={styles.exerciseBlock}>
            <View style={styles.exerciseFirstRow}>
              <TouchableOpacity style={styles.exerciseDot}></TouchableOpacity>
              <Text style={styles.exerciseTitle}>Changed squats</Text>
              <Text style={styles.exerciseSubTitle}>3 min</Text>
            </View>
            <View onLayout={onLayout} style={styles.exerciseSecondRow}>
              <View style={{ ...styles.bar, maxHeight: height }}></View>
              <View style={styles.exerciseDescription}>
                <View style={styles.exerciseAdviseBlock}>
                  <Icon name="rocket1"></Icon>
                  <Text style={styles.exerciseAdvise}>
                  Stand with feet shoulder-width apart,
                    chest up, and core engaged
                  </Text>
                </View>
                <View style={styles.exerciseAdviseBlock}>
                  <Icon name="rocket1"></Icon>
                  <Text style={styles.exerciseAdvise}>
                  Squat to parallel or slightly below,
                    engaging glutes and hamstrings.
                  </Text>
                </View>
                <View style={styles.exerciseAdviseBlock}>
                  <Icon name="rocket1"></Icon>
                  <Text style={styles.exerciseAdvise}>
                  Lower with control, maintaining
                    tension.
                  </Text>
                </View>
                <View>
                  <Collapsible collapsed={isCollapsed}>
                    <Video
                      source={require("../../assets/videos/legs/legs4.mp4")}
                      style={{
                        marginTop: 10,
                        width: screenWidth * 0.8,
                        height: screenWidth * 0.8,
                      }}
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
              <Text style={styles.exerciseTitle}>Squats</Text>
              <Text style={styles.exerciseSubTitle}>3*12</Text>
            </View>
            <View onLayout={onLayout} style={styles.exerciseSecondRow}>
              <View style={{ ...styles.bar, maxHeight: height }}></View>
              <View style={styles.exerciseDescription}>
                <View style={styles.exerciseAdviseBlock}>
                  <Icon name="rocket1"></Icon>
                  <Text style={styles.exerciseAdvise}>
                    Maintain proper form: Stand with feet shoulder-width apart,
                    chest up, and core engaged. Squat down, pushing hips back
                    and keeping knees in line with toes.
                  </Text>
                </View>
                <View style={styles.exerciseAdviseBlock}>
                  <Icon name="rocket1"></Icon>
                  <Text style={styles.exerciseAdvise}>
                    Focus on depth: Squat to parallel or slightly below,
                    engaging glutes and hamstrings. Adjust depth based on
                    comfort and any existing knee or hip issues.
                  </Text>
                </View>
                <View style={styles.exerciseAdviseBlock}>
                  <Icon name="rocket1"></Icon>
                  <Text style={styles.exerciseAdvise}>
                    Control descent, explode up: Lower with control, maintaining
                    tension. Drive through heels and explode upward, engaging
                    leg and glute muscles.
                  </Text>
                </View>
                <View>
                  <Collapsible collapsed={isCollapsed}>
                    <Video
                      source={require("../../assets/videos/legs/legs5.mp4")}
                      style={{
                        marginTop: 10,
                        width: screenWidth * 0.8,
                        height: screenWidth * 0.8,
                      }}
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
              <Text style={styles.exerciseTitle}>Legs extension</Text>
              <Text style={styles.exerciseSubTitle}>3 min</Text>
            </View>
            <View onLayout={onLayout} style={styles.exerciseSecondRow}>
              <View style={{ ...styles.bar, maxHeight: height }}></View>
              <View style={styles.exerciseDescription}>
                <View style={styles.exerciseAdviseBlock}>
                  <Icon name="rocket1"></Icon>
                  <Text style={styles.exerciseAdvise}>
                    Proper form: When performing leg extensions, sit with your
                    back against the backrest and adjust the machine so that
                    your knees align with the pivot point. Keep your core
                    engaged, maintain a neutral spine, and avoid using momentum
                    to lift the weight. Focus on using your quadriceps to extend
                    your legs fully
                  </Text>
                </View>
                <View style={styles.exerciseAdviseBlock}>
                  <Icon name="rocket1"></Icon>
                  <Text style={styles.exerciseAdvise}>
                    Control the movement: Control the movement throughout the
                    exercise, both on the way up and on the way down. Avoid
                    swinging or jerking the weight, as this can put unnecessary
                    stress on your knees. Maintain a slow and controlled pace to
                    maximize muscle engagement and minimize the risk of injury.
                  </Text>
                </View>
                <View style={styles.exerciseAdviseBlock}>
                  <Icon name="rocket1"></Icon>
                  <Text style={styles.exerciseAdvise}>
                    Adjust the weight and reps: Start with a weight that allows
                    you to perform the exercise with proper form and without
                    straining. Gradually increase the weight as you become
                    stronger and more comfortable. Aim for a moderate number of
                    repetitions, typically 8-12, to challenge your muscles
                    effectively.
                  </Text>
                </View>
                <View>
                  <Collapsible collapsed={isCollapsed}>
                    <Video
                      source={require("../../assets/videos/legs/legs3.mp4")}
                      style={{
                        marginTop: 10,
                        width: screenWidth * 0.8,
                        height: screenWidth * 0.8,
                      }}
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
              <Text style={styles.exerciseTitle}>Calves</Text>
              <Text style={styles.exerciseSubTitle}>3 min</Text>
            </View>
            <View onLayout={onLayout} style={styles.exerciseSecondRow}>
              <View style={{ ...styles.bar, maxHeight: height }}></View>
              <View style={styles.exerciseDescription}>
                <View style={styles.exerciseAdviseBlock}>
                  <Icon name="rocket1"></Icon>
                  <Text style={styles.exerciseAdvise}>
                    Progressive overload: To see progress in your calf training,
                    gradually increase the intensity of your workouts over time.
                    This can be done by increasing the weight, reps, or sets.
                    Aim to challenge your calves with each workout to stimulate
                    muscle growth and strength development.
                  </Text>
                </View>
                <View style={styles.exerciseAdviseBlock}>
                  <Icon name="rocket1"></Icon>
                  <Text style={styles.exerciseAdvise}>
                    Full range of motion: When performing calf exercises, focus
                    on achieving a full range of motion. This means lowering
                    your heels as far as possible and then rising up onto your
                    toes, contracting the calf muscles fully. This helps
                    maximize muscle activation and growth.
                  </Text>
                </View>
                <View style={styles.exerciseAdviseBlock}>
                  <Icon name="rocket1"></Icon>
                  <Text style={styles.exerciseAdvise}>
                    Variety of exercises: Incorporate a variety of calf
                    exercises into your routine to target different areas of the
                    calf muscles. Some effective exercises include calf raises
                    (both standing and seated), jump rope, and stair climbing.
                    This helps ensure balanced development and prevents
                    plateauing.
                  </Text>
                </View>
                <View>
                  <Collapsible collapsed={isCollapsed}>
                    <Video
                      source={require("../../assets/videos/legs/legs2.mp4")}
                      style={{
                        marginTop: 10,
                        width: screenWidth * 0.8,
                        height: screenWidth * 0.8,
                      }}
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
