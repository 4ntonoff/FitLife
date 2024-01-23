import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback
} from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { TouchableOpacity, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { getDatabase, ref, set,onValue } from "firebase/database";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database, firestore } from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../colors';

export default function Chat () {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const onSignOut = () =>{
      signOut(auth).catch(error => console.log(error));
  }
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        const db = getDatabase();
       
        const profileImageRef = ref(db, `users/${userId}/profilePicture`);
        onValue(profileImageRef, (snapshot) => {
          const profilePicture = snapshot.val();
          if (profilePicture) {
            setProfilePicture(profilePicture);
          }
        });
      }
    });
    // Clean up the subscription when the component unmounts
    
    return () => unsubscribe();
  }, []);

  useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{
              marginRight: 10
            }}
            onPress={onSignOut}
          >
            <AntDesign name="logout" size={24} color={colors.gray} style={{marginRight: 10}}/>
          </TouchableOpacity>
        )
      });
    }, [navigation]);

useLayoutEffect(() => {

  const collectionRef = collection(firestore, 'chats');
  const q = query(collectionRef, orderBy('createdAt', 'desc'));

const unsubscribe = onSnapshot(q, querySnapshot => {
  console.log('querySnapshot unsusbscribe');
    setMessages(
      querySnapshot.docs.map(doc => ({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user
      }))
    );
  });
return unsubscribe;
}, []);

const onSend = useCallback((messages = [])=>{
  setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

  const { _id, createdAt, text, user } = messages[0];    
      addDoc(collection(firestore, 'chats'), {
        _id,
        createdAt,
        text,
        user
      });
    }, []);
  




    return (
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        showUserAvatar={true}
        onSend={messages => onSend(messages)}
        messagesContainerStyle={{
          backgroundColor: '#fff'
        }}
        textInputStyle={{
          backgroundColor: '#fff',
          borderRadius: 20,
        }}
        user={{
          _id: auth?.currentUser?.email,
          avatar: profilePicture,
        }}
      />
    );
}
