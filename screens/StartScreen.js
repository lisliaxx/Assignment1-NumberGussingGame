import React, {useState} from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import Checkbox from 'expo-checkbox';
import {Colors} from '../helper/Colors';
import {isValidName, isValidEmail, isValidPhoneNumber} from '../helper/Validation';

const StartScreen = ( { onRegister }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    const handleRegister = () => {
        if (isValidName(name) && isValidEmail(email) && isValidPhoneNumber(phoneNumber) && isChecked) {
            onRegister(name, email, phoneNumber);
        } else {
            Alert.alert('Invalid Input', 'Please fill all the fields correctly');
        }
    };

    const handleReset = () => {
        setName('');
        setEmail('');
        setPhoneNumber('');
        setIsChecked(false);
        setNameError('');
        setEmailError('');
        setPhoneNumberError('');
    };

    const validateName = (text) => {
        setName(text);
        setNameError(isValidName(text) ? '' : 'Invalid Name');
    };

    const validateEmail = (text) => {
        setEmail(text);
        setEmailError(isValidEmail(text) ? '' : 'Invalid Email');
    }

    const validatePhoneNumber = (text) => {
        setPhoneNumber(text);
        setPhoneNumberError(isValidPhoneNumber(text) ? '' : 'Invalid Phone Number');
    }

    return (
        <Card>
            <Text style={styles.title}>Register to Play</Text>
            <Input
                value={name}
                onChangeText={validateName}
                placeholder="Name"
            />
            {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
            
            <Input
                value={email}
                onChangeText={validateEmail}
                placeholder="Email"
                keyboardType="email-address"
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <Input
                value={phoneNumber}
                onChangeText={validatePhoneNumber}
                placeholder="Phone Number"
                keyboardType="phone-pad"
            />
            {phoneNumberError ? <Text style={styles.errorText}>{phoneNumberError}</Text> : null}

            <View style={styles.checkboxContainer}>
                <Checkbox
                    value={isChecked}
                    onValueChange={setIsChecked}
                    color={isChecked ? Colors.primary : undefined}
                />
                <Text style={styles.label}>I agree to the terms and conditions</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Button 
                    title="Register" 
                    onPress={handleRegister}
                    disabled={!isChecked}
                    style={styles.button}
                     />
                <Button 
                    title="Reset" 
                    onPress={handleReset} 
                    style={styles.button}
                    />
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
    },
    label: {
        marginLeft: 8,
    }
});

export default StartScreen;