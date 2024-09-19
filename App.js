import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from './helper/Colors';
import StartScreen from './screens/StartScreen';
import ConfirmScreen from './screens/ConfirmScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('start');
  const [userInfo, setUserInfo] = useState(null);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

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
    setCurrentScreen('start');
  };

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.secondary]}
      style={styles.container}
    >
      <View style={styles.content}>
        {currentScreen === 'start' && (
          <StartScreen onRegister={handleRegister} initialValues={userInfo} />
        )}
        {currentScreen === 'game' && (
          <Text>Game Screen</Text>
        )}
        <ConfirmScreen
          visible={isConfirmModalVisible}
          userInfo={userInfo}
          onConfirm={handleConfirm}
          onEdit={handleEdit}
        />
      </View>
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
    width: '100%',
  },
});
