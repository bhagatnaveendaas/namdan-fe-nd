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
    containerStyle,
    ...props
}) => {
    return (
        <View style={styles.wrapper}>
            {label && (
                <Text style={[styles.label, { marginBottom: -4 }]}>
                    {label}
                    {required && <Text style={styles.required}>{" *"}</Text>}
                </Text>
            )}
            <View style={[styles.container, containerStyle]}>
                {prependComponent}
                <TextInput
                    style={styles.input}
                    returnKeyType="next"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={styles.placeholderColor.color}
                    onChangeText={onChangeText}
                    {...props}
                />
                {appendComponent}
            </View>
        </View>
    );
};

export default FormTextInput;
