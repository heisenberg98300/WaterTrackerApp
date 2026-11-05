import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import HomeScreen from './components/HomeScreen';

export default function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
});