import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import theme from "../constants/theme";

const FormSelectInput = ({
    options,
    label,
    containerStyle,
    placeholder,
    onValueChange,
    value,
    required,
}) => {
    return (
        <View style={{ marginTop: 10 }}>
            {label && (
                <Text
                    style={{
                        color: theme.colors.primary,
                        fontFamily: theme.fonts.poppins.regular,
                        fontSize: 14,
                        marginBottom: 2,
                    }}
                >
                    {label}
                    {required && <Text style={{ color: "red" }}>{" *"}</Text>}
                </Text>
            )}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: theme.colors.primaryLight,
                    paddingRight: 10,
                    height: 40,
                    borderRadius: 50,
                    ...containerStyle,
                }}
            >
                <Picker
                    selectedValue={value}
                    onValueChange={onValueChange}
                    style={{ flex: 1 }}
                >
                    <Picker.Item
                        label={placeholder}
                        style={{ color: theme.colors.primaryLight }}
                        value={null}
                    />
                    {options.map((item, index) => (
                        <Picker.Item
                            style={{
                                color: theme.colors.primary,
                                fontFamily: theme.fonts.poppins.regular,
                            }}
                            key={index}
                            label={
                                item?.name
                                    ? item.name[0].toUpperCase() +
                                      item.name.slice(1).toLowerCase()
                                    : item
                            }
                            value={typeof item === "string" ? item : index}
                        />
                    ))}
                </Picker>
            </View>
        </View>
    );
};

export default FormSelectInput;

const styles = StyleSheet.create({});
