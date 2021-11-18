import React, { memo } from "react";
import { Text, TouchableOpacity } from "react-native";

const Button = memo(({ buttonStyle, textStyle, text, onPress }) => {
    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress}>
            <Text allowFontScaling={false} style={textStyle}>
                {text}
            </Text>
        </TouchableOpacity>
    );
});

export default Button;
