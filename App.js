import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Colors} from './helper/Colors';
import StartScreen from './screens/StartScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('start');
  const [userInfo, setUserInfo] = useState(null);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'start':
        return <StartScreen onRegister={handleRegister} />;
      default:
        return <StartScreen onRegister={handleRegister} />;
    }
  };

  const handleRegister = (info) => {
    setUserInfo(info);
    console.log(info);
  };

  const handleRestart = () => {
    setUserInfo(null);
    setCurrentScreen('start');
  }

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.secondary]}
      style={styles.container}
      >
        <View style={styles.content}>{renderScreen()}</View>
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});






