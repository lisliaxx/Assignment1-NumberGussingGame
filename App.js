import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from './helper/Colors';
import StartScreen from './screens/StartScreen';
import ConfirmScreen from './screens/ConfirmScreen';
import GameScreen from './screens/GameScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('start');
  const [userInfo, setUserInfo] = useState(null);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [gameKey, setGameKey] = useState(0);

  const handleRegister = (info) => {
    setUserInfo(info);
    setIsConfirmModalVisible(true);
  };

  const handleConfirm = () => {
    setIsConfirmModalVisible(false);
    setCurrentScreen('game');
  };

  const handleEdit = () => {
    setIsConfirmModalVisible(false);
  };

  const handleRestart = () => {
    setUserInfo(null);
    setCurrentScreen('start');
  };

  const handleNewGame = () => {
    setGameKey((prev) => prev + 1);
    setCurrentScreen('game');
  };

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.secondary]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {currentScreen === 'start' && (
            <StartScreen onRegister={handleRegister} initialValues={userInfo} />
          )}
          {currentScreen === 'game' && (
            <GameScreen
              userInfo={userInfo}
              onRestart={handleRestart}
              onNewGame={handleNewGame}
            />
          )}
          <ConfirmScreen
            visible={isConfirmModalVisible}
            userInfo={userInfo}
            onConfirm={handleConfirm}
            onEdit={handleEdit}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});