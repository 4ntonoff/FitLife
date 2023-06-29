import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const CoachAI = () => {
  const [data, setData] = useState([]);
  const apiKey = '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';
  const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions';
  const [textInput, setTextInput] = useState('');

  const handleSend = async () => {
    const prompt = textInput;
    try {
      const response = await axios.post(
        apiUrl,
        {
          prompt: prompt,
          max_tokens: 1024,
          temperature: 0.5,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      const text = response.data.choices[0].text;
      setData([...data, { type: 'user', text: textInput }, { type: 'bot', text: text }]);
      setTextInput('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        style={styles.body}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', padding: 10 }}>
            <Text style={{ fontWeight: 'bold', color: item.type === 'user' ? 'green' : 'red' }}>
              {item.type === 'user' ? 'Ninza' : 'Bot'}
            </Text>
            <Text style={styles.bot}> {item.text} </Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        value={textInput}
        onChangeText={text => setTextInput(text)}
        placeholder="Ask me anything about training"
      />
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Let's do this</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    backgroundColor: 'white',
    width: '100%',
    margin: 10,
  },
  bot: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    width: '90%',
    marginBottom: 10,
    borderRadius: 10,
    height: 60,
    paddingLeft: 15,
  },
  button: {
    backgroundColor: '#03A0DC',
    width: '90%',
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 25,
    fontFamily: "Raleway-SemiBold",
    color: 'white',
    
  },
});

export default CoachAI;