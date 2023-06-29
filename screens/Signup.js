import React, { useState, useEffect, useRef } from "react";
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
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { database } from "../config/firebase";
import { MaterialIcons } from "@expo/vector-icons";
import { set, ref, get } from "firebase/database";
import { storage } from "../config/firebase";

import * as Permissions from "expo-permissions";

import AsyncStorage from "@react-native-async-storage/async-storage";

import * as ImagePicker from "expo-image-picker";

import { AntDesign } from "@expo/vector-icons";

import { uploadBytes, getDownloadURL } from "firebase/storage";
const backImage = require("../assets/LoginBG.png");

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [image, setImage] = useState(null);
  const userIdRef = useRef();

  const onHandleLogin = () => {
    if (email !== "" && password !== "" && username !== "") {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Get the unique user ID from the userCredential object
          const userId = userCredential.user.uid;
          userIdRef.current = userId;

          // Store the username in Firebase

          set(ref(database, `users/` + userId), {
            username: username,
            email: email,
            profilePicture: image,
          })
            .then(() => {
              console.log("Username stored in Firebase successfully!");
            })
            .catch((error) => {
              console.log("Error storing username in Firebase:", error);
            });

          // Call addProfilePhoto with the userId
          pickImage();
        })
        .catch((err) => {
          Alert.alert("Signup error", err.message);
        });
    }
  };

  const getPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      return status;
    }
  };

  const pickImage = async () => {
    if (image) {
      return;
    }
    try {
      const permissionStatus = await getPermission();
      if (permissionStatus !== "granted") {
        console.log("Camera permission not granted");
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.cancelled) {
        const selectedImage = result.uri;
        if (selectedImage) {
          setImage(selectedImage); // Set the selected image URI in the state
          const uploadURL = await uploadImageAsync(selectedImage);
          addProfilePhoto(uploadURL);
        } else {
          console.log("Selected image URI is undefined");
        }
      } else {
        console.log("Image selection cancelled");
      }
    } catch (error) {
      console.log("Error @pickImage: ", error);
    }
  };

  const addProfilePhoto = async (imageUrl) => {
    try {
      if (imageUrl) {
        // Store the image URL in Firebase
        const userId = userIdRef.current;
        if (!userId) return;

        set(ref(database, `users/` + userId), {
          profilePicture: imageUrl,
        })
          .then(() => {
            console.log("Profile image stored in Firebase successfully!");
          })
          .catch((error) => {
            console.log("Error storing profile image in Firebase:", error);
          });
      }
    } catch (error) {
      console.log("Error @addProfilePhoto: ", error);
    }
  };

  // Rest of the code...

  const uploadImageAsync = async (uri) => {
    if (!uri) {
      console.log("Invalid image URI");
      return;
    }

    const storageRef = ref(storage, `images/image-${Date.now()}`);
    const response = await fetch(uri);
    const blob = await response.blob();

    try {
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      blob.close();
      return downloadURL;
    } catch (error) {
      console.log("Error uploading image: ", error);
      return null;
    }
  };
  useEffect(() => {
    const retrieveImage = async () => {
      try {
        // Retrieve the userId from the userIdRef
        const userId = userIdRef.current;
        if (!userId) return;

        const snapshot = await get(ref(database, `users/` + userId));
        // Rest of the code...
      } catch (error) {
        console.log("Error retrieving image URL: ", error);
      }
    };

    retrieveImage();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Sign Up</Text>
        <TouchableOpacity
          style={styles.profilePhotoContainer}
          onPress={pickImage}
        >
          {image ? (
            <Image style={{ flex: 1 }} source={{ uri: image }} />
          ) : (
            <View style={styles.DefaultProfilePhoto}>
              <AntDesign name="plus" size={24} color="#ffffff" />
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Enter username"
          autoCapitalize="none"
          keyboardType="default"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
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
          <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
            {" "}
            Sign Up
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
          <Text style={{ color: "gray", fontWeight: "600", fontSize: 14 }}>
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "#0A46A8", fontWeight: "600", fontSize: 14 }}>
              {" "}
              Log in
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
  ProfilePhoto: {
    marginTop: 12,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    backgroundColor: "#8e93a1",
    borderRadius: 50,
    alignSelf: "center",
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
  DefaultProfilePhoto: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
