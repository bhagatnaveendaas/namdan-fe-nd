import React, { memo } from "react";
import { Text, TouchableOpacity } from "react-native";

const Button = memo(
    ({ buttonStyle, disabled = false, textStyle, text, onPress }) => {
        return (
            <TouchableOpacity
                style={buttonStyle}
                onPress={onPress}
                disabled={disabled}
            >
                <Text allowFontScaling={false} style={textStyle}>
                    {text}
                </Text>
            </TouchableOpacity>
        );
    }
);

export default Button;
