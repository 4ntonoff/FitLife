import React, { useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { CheckBox } from "react-native-elements";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const { width, height } = Dimensions.get("window");
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

export default function App() {
  const [checkedStatus, setCheckedStatus] = useState(
    Array.from({ length: 7 }, () => false)
  );
  const [warnText, setWarnText] = useState("");

  const handleToggle = (index) => {
    const newCheckedStatus = [...checkedStatus];
    newCheckedStatus[index] = !newCheckedStatus[index];
    setCheckedStatus(newCheckedStatus);
    console.log("Current checked status:", newCheckedStatus);
    const countTrue = newCheckedStatus.filter(Boolean);
    console.log(countTrue.length);
    if (countTrue.length === 0) {
      setWarnText("asdf11"); // Update warnText using the setWarnText function
    } else {
      setWarnText("asdf12"); // Update warnText using the setWarnText function
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.checkBoxGrid}>
        {checkedStatus.map((checked, index) => (
          <CustomCheckBox
            key={index}
            index={index}
            checked={checked}
            onToggle={handleToggle}
          />
        ))}
      </View>
      <Text>{warnText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    width: ((width - 70) * 0.9) / 7,
    height: ((width - 70) * 0.9) / 7,
    backgroundColor: "#03A0DC",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#03A0DC",
    borderWidth: 2,
    borderRadius: 10,
  },
  uncheckedBox: {
    marginHorizontal: -5,
    width: ((width - 70) * 0.9) / 7,
    height: ((width - 70) * 0.9) / 7,
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
});
