import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Dimensions,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { auth } from "../config/firebase";
import { color } from "../colors";

const backImage = require("../assets/LoginBG.png");

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { height } = Dimensions.get("window").height;

  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log("Login success");
          // Set isAnotherUserLoggedIn to true to indicate that another user has logged in
        })
        .catch((err) => Alert.alert("Login error", err.message));
    }
  };

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Log In</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
          <Text
            style={{ fontFamily: "Raleway-Bold", color: "#fff", fontSize: 18 }}
          >
            {" "}
            Log In
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: "gray",
              fontFamily: "Raleway-Medium",
              fontSize: 14,
            }}
          >
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text
              style={{
                color: "#0A46A8",
                fontFamily: "Raleway-Bold",
                fontSize: 14,
              }}
            >
              {" "}
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontFamily: "Raleway-Medium",
    color: "#191C21",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    borderBottomColor: "#8e93a1",
    borderBottomWidth: 0.8,
    marginTop: 10,
    height: 42,
    fontFamily: "Raleway-SemiBold",
  },
  backImage: {
    width: "100%",
    height: 340,
    top: 0,
    resizeMode: "cover",
  },
  whiteSheet: {
    width: "100%",
    height: "75%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    top: "30%",
    width: "80%",
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: "#0B81FC",
    height: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});
