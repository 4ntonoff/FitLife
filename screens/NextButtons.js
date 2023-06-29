import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import Svg, { G, Circle } from "react-native-svg";

const NextButton = ({ percentage, scrollTo }) => {
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);

  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener(
      (value) => {
        const strokeDashoffset =
          circumference - (circumference * value.value) / 100;

        if (progressRef?.current) {
          progressRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      [percentage]
    );
    return () => {
      progressAnimation.removeAllListeners();
    };
  }, []);
  return (
    <View style={{ marginBottom: 20 }}>
      <Svg width={size} height={size}>
        <G fill="#00000000" rotation="-90" origin={center}>
          <Circle
            stroke="#e6e7e8"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />

          <Circle
            ref={progressRef}
            stroke="#0994F5"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
          />
        </G>
      </Svg>
      <TouchableOpacity
        onPress={scrollTo}
        style={styles.button}
        activeOpacity={0.6}
      >
        <Icon name="arrowright" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "#0994F5",
    borderRadius: 100,
  },
});
export default NextButton;
