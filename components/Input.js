import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { Colors } from "../helper/Colors";

const Input = ( { value, onChangeText, placeholder, keyboardType, style}) => {
    return (
        <TextInput
            style={{...styles.input, ...style}}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            keyboardType={keyboardType}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: Colors.primary,
        height: 40,
        marginVertical: 10,
        borderWidth: 1,
        padding: 10,
        borderColor: Colors.text,
    },
});

export default Input;