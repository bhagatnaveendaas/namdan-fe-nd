import React from "react";
import {
    KeyboardAvoidingView,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import styles from "../styles/Singup";

const KeyboardAvoidingWrapper = ({ children }) => {
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <ScrollView style={styles.mainContainer}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    {children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default KeyboardAvoidingWrapper;
