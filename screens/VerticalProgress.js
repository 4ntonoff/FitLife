import * as React from 'react';
import { ProgressBar } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 500,
    transform: [{rotate: '90deg'}],
  },
  bar: {
    width: 150,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
  },
});

const VerticalProgressBar = ({ progress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <ProgressBar
          progress={progress}
          color={'#6200ee'}
          style={{ height: 8, borderRadius: 10, }}
        />
      </View>
    </View>
  );
};

export default VerticalProgressBar;