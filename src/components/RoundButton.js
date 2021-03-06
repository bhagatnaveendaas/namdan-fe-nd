import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native";
import styles from "../styles/Login";

function RoundButton({ label, handlePress }) {
    return (
        <TouchableOpacity
            style={styles.loginButton}
            onPress={handlePress}
            elevation={5}
        >
            <Text
                allowFontScaling={false}
                style={[styles.textCenter, styles.loginButtonText]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
}

export default RoundButton;
