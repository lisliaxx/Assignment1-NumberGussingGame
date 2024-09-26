import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "../helper/Colors";

const Button = ( { title, onPress, style, disabled }) => {
    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.disabled, style]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        alignItems: 'center',
        width: '100%',
    },
    text: {
        color: Colors.text,
        fontSize: 18,
    },
    disabled: {
        backgroundColor: Colors.disabled,
    },
});

export default Button; 