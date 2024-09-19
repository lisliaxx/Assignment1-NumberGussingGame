import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native';
import Button from '../components/Button';
import Card from '../components/Card';
import { Colors } from '../helper/Colors';

const GameScreen = ({ userInfo, onRestart, onNewGame }) => {
  const [chosenNumber, setChosenNumber] = useState(null);
  const [gameState, setGameState] = useState('instruction'); 
  const [timer, setTimer] = useState(60);
  const [attempts, setAttempts] = useState(4);
  const [guess, setGuess] = useState('');
  const [hintUsed, setHintUsed] = useState(false);
  const [guessDirection, setGuessDirection] = useState('');
  const [gameOverStatus, setGameOverStatus] = useState('');

  useEffect(() => {
    resetGame();
    }, [userInfo]);

    useEffect(() => {
        let interval;
        if (gameState === 'playing') {
          interval = setInterval(() => {
            setTimer((prevTimer) => {
              if (prevTimer === 1) {
                clearInterval(interval);
                endGame('time');
                return 0;
              }
              return prevTimer - 1;
            });
          }, 1000);
        }
        return () => clearInterval(interval);
      }, [gameState]);

  const resetGame = () => {
    if (userInfo && userInfo.phoneNumber) {
      const lastDigit = parseInt(userInfo.phoneNumber.slice(-1));
      const possibleNumbers = Array.from({ length: 10 }, (_, i) => (i + 1) * lastDigit).filter(n => n <= 100);
      const randomIndex = Math.floor(Math.random() * possibleNumbers.length);
      setChosenNumber(possibleNumbers[randomIndex]);
    }
    setGameState('instruction');
    setTimer(60);
    setAttempts(4);
    setGuess('');
    setHintUsed(false);
    setGuessDirection('');
  };

  const startGame = () => {
    setGameState('playing');
    };

  const submitGuess = () => {
    const guessNumber = parseInt(guess);
    if (isNaN(guessNumber) || guessNumber < 1 || guessNumber > 100) {
      Alert.alert('Invalid Input', 'Please enter a number between 1 and 100.');
      return;
    }

    setAttempts(prevAttempts => prevAttempts - 1);

    if (guessNumber === chosenNumber) {
      setGameState('guessed');
    } else if (attempts === 1) {
      endGame('attempts');
    } else {
        setGuessDirection(guessNumber < chosenNumber ? 'higher' : 'lower');
        setGameState('incorrect');
    }
    setGuess('');
  };

  const useHint = () => {
    if (!hintUsed) {
      const hintText = `The number is ${chosenNumber % 2 === 0 ? 'even' : 'odd'}.`;
      Alert.alert('Hint', hintText);
      setHintUsed(true);
    } else {
      Alert.alert('Hint already used', 'You can only use one hint per game.');
    }
  };

  const endGame = (reason) => {
    setGameState('over');
    setGameOverStatus(reason);
  };

  const handleNewGame = () => {
    resetGame();
    onNewGame();
    };

  const renderInstructionScreen = () => (
    <Card style={styles.card}>
      <Text style={styles.title}>
        Guess a number between 1 & 100 that is multiply of {userInfo?.phoneNumber.slice(-1)}
      </Text>
      <Text style={styles.subtitle}>
        You have 60 seconds and 4 attempts to guess the number.
      </Text>
      <Button title="Start Game" onPress={startGame} style={styles.button} />
    </Card>
  );

  const renderPlayingScreen = () => (
    <Card style={styles.card}>
      <Text style={styles.title}>
        Guess a number between 1 & 100 that is multiply of {userInfo?.phoneNumber.slice(-1)}
      </Text>
      <TextInput
        style={styles.input}
        value={guess}
        onChangeText={setGuess}
        keyboardType="number-pad"
        placeholder="Enter your guess"
      />
      <Text style={styles.infoText}>Attempts left: {attempts}</Text>
      <Text style={styles.infoText}>Timer: {timer}s</Text>
      <Button title="Use a Hint" onPress={useHint} style={styles.button} />
      <Button title="Submit guess" onPress={submitGuess} style={styles.button} />
    </Card>
  );

  const renderIncorrectScreen = () => (
    <Card style={styles.card}>
      <Text style={styles.title}>You did not guess correct!</Text>
      <Text style={styles.subtitle}>You should guess {guessDirection}.</Text>
      <Button title="TRY AGAIN" onPress={() => setGameState('playing')} style={styles.button} />
      <Button title="END THE GAME" onPress={() => endGame('end')} style={styles.button} />
    </Card>
  );

  const renderGuessedScreen = () => (
    <Card style={styles.card}>
      <Text style={styles.title}>You guessed correct!</Text>
      <Text style={styles.subtitle}>Attempts used: {4 - attempts}</Text>
      <Image
        source={{ uri: `https://picsum.photos/id/${chosenNumber}/100/100` }}
        alt='Random image'
        style={styles.image}
      />
      <Button title="New Game" onPress={handleNewGame} style={styles.button} />
    </Card>
  );

  const renderGameOverScreen = () => (
    <Card style={styles.card}>
      <Text style={styles.title}>The game is over!</Text>
      <Image
        source={require('../images/sad.png')}
        alt='Sad face'
        style={styles.sadFace}
      />
      <Text style={styles.subtitle}> {
        gameOverStatus === 'time' ? 'You are out of time' : 
        gameOverStatus === 'attempts' ? 'You are out of attempts' : 
        gameOverStatus === 'end' ? 'Game ended by user': ''
        }
      </Text>
      <Button title="New Game" onPress={handleNewGame} style={styles.button} />
    </Card>
  );

  return (
    <View style={styles.container}>
      <Button title="Restart" onPress={onRestart} style={styles.restartButton} />
      {gameState === 'instruction' && renderInstructionScreen()}
      {gameState === 'playing' && renderPlayingScreen()}
      {gameState === 'incorrect' && renderIncorrectScreen()}
      {gameState === 'guessed' && renderGuessedScreen()}
      {gameState === 'over' && renderGameOverScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 60,
  },
  restartButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(200, 200, 200, 0.8)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'purple',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: 'purple',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'purple',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    width: '100%',
  },
  infoText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'yellow',
    marginTop: 10,
    width: '100%',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  sadFace: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default GameScreen;