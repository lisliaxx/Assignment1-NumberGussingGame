import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";

const ConfirmScreen = ({ visible, userInfo, onConfirm, onEdit }) => {

    console.log("ConfirmScreen rendered with userInfo:", userInfo); 
    if (!userInfo) return null;

    return (
        <Modal transparent={true} animationType="fade" visible={visible}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Hello {userInfo.name}</Text>
                    <Text style={styles.subtitle}>Here is the information you entered:</Text>
                    <Text style={styles.info}>{userInfo.email}</Text>
                    <Text style={styles.info}>{userInfo.phoneNumber}</Text>
                    <Text style={styles.instruction}>
                        If it is not correct, please go back and edit them.
                    </Text>
                    
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, styles.goBackButton]} onPress={onEdit}>
                            <Text style={styles.buttonText}>Go back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.continueButton]} onPress={onConfirm}>
                            <Text style={styles.buttonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>    
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'purple',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: 'purple',
        marginBottom: 10,
        textAlign: 'center',
    },
    info: {
        fontSize: 16,
        color: 'purple',
        marginBottom: 5,
        textAlign: 'center',
    },
    instruction: {
        fontSize: 16,
        color: 'purple',
        marginTop: 10,
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        padding: 10,
        borderRadius: 5,
        width: '45%',
    },
    goBackButton: {
        backgroundColor: 'pink',
    },
    continueButton: {
        backgroundColor: 'blue',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default ConfirmScreen;