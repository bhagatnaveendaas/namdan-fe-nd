import React from "react";
import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import theme from "../constants/theme";

const FormTextInput = ({
    label,
    value,
    placeholder,
    onChangeText,
    appendComponent,
    prependComponent,
    required,
    ...props
}) => {
    return (
        <View style={{ marginTop: 10 }}>
            <Text
                style={{
                    color: theme.colors.primary,
                    fontFamily: theme.fonts.poppins.semiBold,
                    fontSize: 14,
                    marginBottom: -5,
                }}
            >
                {label}
                {required && <Text style={{ color: "red" }}>{" *"}</Text>}
            </Text>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    // backgroundColor: "red",
                    borderBottomColor: theme.colors.primaryLight,
                    borderBottomWidth: 2,
                    paddingRight: 10,
                    height: 40,
                }}
            >
                {prependComponent}
                <TextInput
                    style={{
                        height: "100%",
                        padding: 0,
                        paddingLeft: 2,
                        flex: 1,
                        lineHeight: 22,
                        fontSize: 15,
                        fontFamily: theme.fonts.poppins.regular,
                        color: theme.colors.primary,
                    }}
                    returnKeyType="next"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={theme.colors.primaryLight}
                    onChangeText={onChangeText}
                    {...props}
                />
                {appendComponent}
            </View>
        </View>
    );
};

export default FormTextInput;

const styles = StyleSheet.create({});
