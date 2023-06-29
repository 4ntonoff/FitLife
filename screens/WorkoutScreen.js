import React from "react";
import {
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { ProgressBar } from "react-native-paper";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const scaleFactor = Dimensions.get("window").scale;
const scaleHeight = ({ source, desiredWidth }) => {
  const { width, height } = Image.resolveAssetSource(source);

  return (desiredWidth / width) * height;
};

const imageSource = "../assets/img/running.jpg";
const imageWidth = screenWidth;
const imageHeigh = scaleHeight({
  source: require(imageSource),
  desiredWidth: imageWidth,
});
const ExercisesProgress = ({ navigation }) => {
  const progress = 0.5;
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
                borderColor: "#000",
                backgroundColor: "#03A0DC",
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
              <Text style={styles.btnText}>Start</Text>
              <Icon name="swapright" size={32}></Icon>
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
            <View style={styles.exerciseDynamic}>
              <TouchableOpacity style={styles.exerciseDot}></TouchableOpacity>
              <View style={styles.bar}>
                <ProgressBar
                  progress={progress}
                  color={"#03A0DC"}
                  style={{ height: 6, width: 150, borderRadius: 10 }}
                />
              </View>
            </View>
            <View style={styles.exerciseText}>
              <Text style={styles.exerciseTitle}>Running</Text>
              <View style={styles.exerciseDescription}>
                <View style={styles.exerciseAdviseBlock}>
                  <Icon name="rocket1"></Icon>
                  <Text>Start slow and gradually increase your pace and distance to avoid injury and build endurance.</Text>
                </View>
                <View style={styles.exerciseAdviseBlock}>
                  <Icon name="rocket1"></Icon>
                  <Text>Wear proper running shoes that fit well and provide adequate support to prevent foot and ankle injuries.</Text>
                </View>
                <View style={styles.exerciseAdviseBlock}>
                  <Icon name="rocket1"></Icon>
                  <Text>Incorporate strength training exercises, such as squats and lunges, to improve your running form and prevent muscle imbalances.</Text>
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
    width: 150,
    height: 6,
    top: 78,
    right: 65,
    borderRadius: 10,
    backgroundColor: "grey",
    transform: [{ rotate: "90deg" }],
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
    color: "#3e4a5c",
    textAlign: "center",
  },
  exerciseBlock: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  exerciseDynamic: {
    marginTop: 18,
    marginHorizontal: 20,
  },
  exerciseText: {
    flexDirection: "column",
    left: -140,
    top: 13,
  },
  exerciseTitle: {
    fontSize: 18,
    fontFamily:'Raleway-SemiBold'
  },
  exerciseDescription: {
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
    width: 350,
  }
});
export default ExercisesProgress;
