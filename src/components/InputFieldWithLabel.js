import moment from "moment";
import React from "react";
import { Text, View, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "../styles/Singup";
import { Ionicons } from "@expo/vector-icons";
function InputFieldWithLabel({
    label,
    value,
    changeFn,
    placeholder,
    isDate,
    setShow,
    disabled,
    rows,
    keyboard,
}) {
    function validateEmail(email) {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase()) ? (
            <Text style={{ color: "green", alignSelf: "flex-end" }}>
                {" "}
                <Ionicons name="checkmark-done" size={18} color="green" /> Valid
                Email
            </Text>
        ) : (
            <Text style={{ color: "red", alignSelf: "flex-end" }}>
                {" "}
                <Ionicons
                    name="alert-circle-outline"
                    size={18}
                    color="red"
                />{" "}
                Invalid Email
            </Text>
        );
    }
    return (
        <View style={{ flex: 1, width: "100%", justifyContent: "center" }}>
            <View style={styles.inputField}>
                <Text style={styles.label}>
                    {label} {label === "Email" && value && validateEmail(value)}
                </Text>
                {isDate ? (
                    <TouchableOpacity
                        style={[styles.textInput, { paddingVertical: "4.3%" }]}
                        onPress={() => setShow(true)}
                    >
                        {/* <Text>{`${value.toLocaleDateString()}`}</Text> */}
                        <Text>{`${
                            value && moment(value).format("DD-MM-YYYY")
                        }`}</Text>
                    </TouchableOpacity>
                ) : (
                    <TextInput
                        placeholder={placeholder}
                        style={styles.textInput}
                        value={value}
                        onChange={changeFn}
                        numberOfLines={rows ? rows : 1}
                        editable={!disabled}
                        keyboardType={keyboard}
                    />
                )}
            </View>
        </View>
    );
}

export default InputFieldWithLabel;
