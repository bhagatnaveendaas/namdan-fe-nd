import React from "react";
import { Text, View, TextInput } from "react-native";
import styles from "../styles/FormInput";

const FormTextInput = ({
    label,
    value,
    placeholder,
    onChangeText,
    appendComponent,
    prependComponent,
    required,
    textStyle,
    placeholderColor,
    containerStyle,
    ...props
}) => {
    return (
        <View style={styles.wrapper}>
            {label && (
                <Text
                    allowFontScaling={false}
                    style={[styles.label, { marginBottom: -4 }]}
                >
                    {label}
                    {required && <Text style={styles.required}>{" *"}</Text>}
                </Text>
            )}
            <View style={[styles.container, containerStyle]}>
                {prependComponent}
                <TextInput
                    allowFontScaling={false}
                    style={[styles.input, { ...textStyle }]}
                    returnKeyType="next"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={
                        placeholderColor || styles.placeholderColor.color
                    }
                    onChangeText={onChangeText}
                    {...props}
                />
                {appendComponent}
            </View>
        </View>
    );
};

export default FormTextInput;
