import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../helper/Colors";

const Card = ( { children, style }) => {
    return (
        <View style={{...styles.card, ...style}}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        shadowColor: Colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: Colors.background,
        padding: 20,
        borderRadius: 10,
    },
});

export default Card;