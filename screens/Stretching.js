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
import VerticalProgressBar from "./VerticalProgress";
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
  const progress = 0.51;
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require(imageSource)}
          style={{
            borderWidth: 1,
            width: imageWidth,
            height: imageHeigh,
          }}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            borderRadius: 100,
            borderColor: "#000",
            borderWidth: 2,
            top: 15,
            left: 10,
            height: 50,
            width: 50,
            opacity: 0.5,
            backgroundColor: "#343434",
          }}
          title="Назад"
          onPress={() => navigation.goBack()}
        >
          <Icon></Icon>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.whiteSheet}>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
        <Text>fasdf</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  bgImage: { width: screenWidth, resizeMode: "contain" },
  whiteSheet: {
    position: "absolute",
    marginTop: imageHeigh - 20,
    backgroundColor: "white",
    width: screenWidth,
    borderRadius: 20,
  },
  progressBar: {},
});
export default ExercisesProgress;
