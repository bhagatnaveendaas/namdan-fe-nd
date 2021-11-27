import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/Singup";

const Button = ({ label, onPress }) => {
    const [disabled, setDisabled] = React.useState(false);
    const onClick = () => {
        onPress();
        setDisabled(true);
    };
    return (
        <TouchableOpacity
            style={[styles.updateButton, {marginRight: 10}]}
            disabled={disabled}
            onPress={onClick}
        >
            <Text allowFontScaling={false} style={styles.updateButtonText}>{label}</Text>
        </TouchableOpacity>
    );
};

export default Button;
