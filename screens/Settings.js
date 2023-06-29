import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import { database } from "../config/firebase";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { TouchableOpacity } from "react-native";
import { CheckBox } from "react-native-elements";
import { getDatabase, ref, set } from "firebase/database";


import { getStorage,  uploadBytes, getDownloadURL } from "firebase/storage";
const { width, height } = Dimensions.get("window");
const statusBarHeight = StatusBar.currentHeight;
const iconsDimmension = width * 0.1;
const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const CustomCheckBox = ({ index, checked, onToggle }) => {
  return (
    <CheckBox
      containerStyle={styles.checkBoxContainer}
      checked={checked}
      onPress={() => onToggle(index)}
      checkedIcon={
        <View style={styles.checkedBox}>
          <Text style={styles.checkedText}>{daysOfWeek[index]}</Text>
        </View>
      }
      uncheckedIcon={
        <View style={styles.uncheckedBox}>
          <Text style={styles.uncheckedText}>{daysOfWeek[index]}</Text>
        </View>
      }
    />
  );
};

const Settings = () => {
  const [checkedStatus, setCheckedStatus] = useState(
    Array.from({ length: 7 }, () => false)
  );

  const [warnText, setWarnText] = useState("");
  const [selectedButtonLvl, setSelectedButtonLvl] = useState();
  const [selectedButtonMode, setSelectedButtonMode] = useState();




  const handleLevelSelection = async (level,newCheckedStatus) => {
    setSelectedButtonLvl(level);
    try {
      await AsyncStorage.setItem("selectedLevel", level);
      // Store the selected level in Firebase Realtime Database
      set(ref(database, `settings/`), {level: level, mode: selectedButtonMode});
    } catch (error) {
      console.log("Error saving selected level:", error);
    }
  };
  const handleModeSelection = async (mode) => {
    setSelectedButtonMode(mode);
    try {
      await AsyncStorage.setItem("selectedMode", mode);
      // Store the selected mode in Firebase Realtime Database
      set(ref(database, `settings/`), {level: selectedButtonLvl, mode: mode});
    } catch (error) {
      console.log("Error saving selected mode:", error);
    }
  };
  const handleToggle = async (index) => {
    const newCheckedStatus = [...checkedStatus];
    newCheckedStatus[index] = !newCheckedStatus[index];
    
    setCheckedStatus(newCheckedStatus);
    console.log("Current checked status:", newCheckedStatus);
    const countTrue = newCheckedStatus.filter(Boolean);
    console.log(countTrue.length);
    if (countTrue.length === 0) {
      setWarnText("You can select multiple days by clicking on each day"); // Update warnText using the setWarnText function
    } else if (countTrue.length > 0 & countTrue.length <= 2 ){
      setWarnText(countTrue.length + ' days per week is a good starting point, build a foundation of strength, and gradually progress towards your fitness goals.'); // Update warnText using the setWarnText function
    } else if (countTrue.length === 3 ){
      setWarnText("By dedicating three days per week to your fitness endeavors, you'll forge a path towards a stronger body"); // Update warnText using the setWarnText function
    } else if (countTrue.length === 4 ){
      setWarnText("Embarking on a four-day-per-week regimen is ideal for advanced users, as it provides an intensified focus and increased frequency, allowing you to push your limits and make substantial progress towards your fitness goals."); // Update warnText using the setWarnText function
    } else if (countTrue.length === 5 ){
      setWarnText("Approach a five-day-per-week regimen with caution, as it can pose risks and demands, especially for non-advanced individuals.\nSTRICTLY NOT RECOMENDED"); // Update warnText using the setWarnText function
    } else if (countTrue.length >=6 ){
      setWarnText("Suitable for advanced individuals with expert guidance, emphasizing recovery to minimize dangers.\nSTRICTLY NOT RECOMENDED"); // Update warnText using the setWarnText function
    }
    try {
      // Update Firebase Realtime Database with the new checked status
      set(ref(database, `settings/currentstatus`), newCheckedStatus);
    } catch (error) {
      console.log("Error updating checked status:", error);
    }
  };

  useEffect(() => {
    const retrieveSelectedValues = async () => {
      try {
        const selectedLevel = await AsyncStorage.getItem("selectedLevel");
        const selectedMode = await AsyncStorage.getItem("selectedMode");
       
        setSelectedButtonLvl(selectedLevel);
        setSelectedButtonMode(selectedMode);
      
      } catch (error) {
        console.log("Error retrieving selected values:", error);
      }
    };

    retrieveSelectedValues();
  }, []);
  
  

  //Selected buttn
  () => setSelectedButton("lvl1");
  console.log(selectedButtonLvl);
  console.log(selectedButtonMode);

  //Difficulty info
  let lvlDescription = "";
  if (selectedButtonLvl === "lvl1") {
    lvlDescription =
      "Beginners are just starting out and need to focus on building a foundation of strength and endurance. ";
  } else if (selectedButtonLvl === "lvl2") {
    lvlDescription =
      "Intermediates have a good base and can start to incorporate more challenging exercises and techniques. ";
  } else if (selectedButtonLvl === "lvl3") {
    lvlDescription =
      "Advanced athletes have a high level of fitness and can push themselves to new limits with intense workouts and specialized training.";
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Text style={styles.mainHeader}>Settings</Text>

      <View style={styles.dashLine}></View>

      <Text style={styles.header}>Select the training days:</Text>
      <View style={styles.checkBoxGrid}>
        {checkedStatus.map((checked, index) => (
          <CustomCheckBox
            style={{ margin: 0 }}
            key={index}
            index={index}
            checked={checked}
            onToggle={handleToggle}
          />
        ))}
      </View>
      <Text style={styles.description}>{warnText}</Text>
      <View style={styles.dashLine}></View>

      <Text style={styles.header}>The level of physical fitness:</Text>
      <View style={styles.radioGroupLvl}>
        <TouchableOpacity
          style={[
            styles.radioButtonLvl,
            selectedButtonLvl === "lvl1" && styles.radioButtonSelected,
          ]}
          onPress={() => handleLevelSelection("lvl1")}
        >
          <Image
            style={styles.icon}
            source={require("../assets/IC/IC_Begginer.png")}
          ></Image>
          <Text style={styles.labelLvl}>Beginner</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.radioButtonLvl,
            selectedButtonLvl === "lvl2" && styles.radioButtonSelected,
          ]}
          onPress={() => handleLevelSelection("lvl2")}
        >
          <Image
            style={styles.icon}
            source={require("../assets/IC/IC_Medium.png")}
          ></Image>
          <Text style={styles.labelLvl}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.radioButtonLvl,
            selectedButtonLvl === "lvl3" && styles.radioButtonSelected,
          ]}
          onPress={() => handleLevelSelection("lvl3")}
        >
          <Image
            style={styles.icon}
            source={require("../assets/IC/IC_Advanced.png")}
          ></Image>
          <Text style={styles.labelLvl}>Advanced</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{lvlDescription}</Text>

      <View style={styles.dashLine}></View>

      <Text style={styles.header}>Select mode:</Text>
      <View style={styles.radioGroupMode}>
        <TouchableOpacity
          style={[
            styles.radioButtonMode,
            selectedButtonMode === "mode1" && styles.radioButtonSelected,
          ]}
          onPress={() => handleModeSelection("mode1")}
        >
          <Image
            style={styles.iconLvl}
            source={require("../assets/IC/IC_MuscleGain.png")}
          ></Image>
          <Text style={styles.labelLvl}>Muscle gain</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.radioButtonMode,
            selectedButtonMode === "mode2" && styles.radioButtonSelected,
          ]}
          onPress={() => handleModeSelection("mode2")}
        >
          <Image
            style={styles.iconLvl}
            source={require("../assets/IC/IC_FatBurn.png")}
          ></Image>
          <Text style={styles.labelLvl}>Fat burning</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.radioButtonMode,
            selectedButtonMode === "mode3" && styles.radioButtonSelected,
          ]}
          onPress={() => handleModeSelection("mode3")}
        >
          <Image
            style={styles.iconLvl}
            source={require("../assets/IC/IC_HealthCare.png")}
          ></Image>
          <Text style={styles.labelLvl}>Health care</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.radioButtonMode,
            selectedButtonMode === "mode4" && styles.radioButtonSelected,
          ]}
          onPress={() => handleModeSelection("mode4")}
        >
          <Image
            style={styles.iconLvl}
            source={require("../assets/IC/IC_Begginer.png")}
          ></Image>
          <Text style={styles.labelLvl}>Physical improvement</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width * 0.9,
    alignSelf: "center",
  },
  checkBoxGrid: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    marginTop: 20,
  },
  checkBoxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  checkedBox: {
    marginHorizontal: -5,
    width: (width - 70) * 0.9 / 7,
    height: (width - 70) * 0.9 / 7,
    backgroundColor: "#03A0DC",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#03A0DC",
    borderWidth: 2,
    borderRadius: 10,
  },
  uncheckedBox: {
    marginHorizontal: -5,
    width: (width - 70) * 0.9 / 7,
    height: (width - 70) * 0.9 / 7,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#03A0DC",
    borderWidth: 2,
    borderRadius: 10,
  },
  checkedText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "Raleway-SemiBold",
  },
  uncheckedText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "Raleway-SemiBold",
  },
  dashLine: {
    backgroundColor: "#C5C9CC",
    width: width,
    marginVertical: 30,
    height: 0.5,
  },
  mainHeader: {
    fontSize: 42,
    marginBottom: 20,
    marginTop: 20,
    fontFamily: "Raleway-Bold",
    alignSelf: "flex-start",
  },
  header: {
    fontSize: 24,
    fontFamily: "Raleway-SemiBold",
    alignSelf: "flex-start",
  },
  profilePhotoContainer: {
    backgroundColor: "#e1e2e6",
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: "center",
    marginTop: 16,
    overflow: "hidden",
  },
  DefaultProfilePhoto: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  description: {
    color: "#7B7B7B",
    fontSize: 15,
    alignSelf: "flex-start",
    marginTop: 10,
    lineHeight: 20,
    fontFamily: "Raleway-SemiBold",
  },
  radioGroupLvl: {
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#03A0DC",
    marginTop: 20,
  },
  radioGroupMode: {
    flexDirection: "column",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#03A0DC",
    marginVertical: 20,
  },
  radioButtonLvl: {
    width: (width * 0.9) / 3,
    height: (width * 0.9) / 3,
    borderEndWidth: 0.5,
    borderEndColor: "#D6D6D6",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonMode: {
    flex: 1,
    flexDirection: "row",
    width: width,
    height: width * 0.2,
    borderBottomWidth: 0.5,
    borderBottomColor: "#D6D6D6",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  radioButtonSelected: {
    backgroundColor: "#03A0DC",
  },
  labelLvl: {
    marginTop: 5,
    color: "#000",
    fontSize: 16,
    fontFamily: "Raleway-SemiBold",
  },
  labelMode: {
    marginTop: 5,
    color: "#000",
    fontSize: 16,
  },
  icon: {
    width: iconsDimmension,
    height: iconsDimmension,
  },
  iconLvl: {
    width: iconsDimmension,
    height: iconsDimmension,
    marginLeft: 20,
    marginEnd: 20,
  },
});

export default Settings;