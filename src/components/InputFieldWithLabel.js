import React from "react";
import { Text, View, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "../styles/Singup";

function InputFieldWithLabel({
    label,
    value,
    changeFn,
    placeholder,
    isDate,
    setShow,
    disabled,
    rows,
}) {
    return (
        <View style={{ flex: 1, width: "100%", justifyContent:"center" }}>
            <View style={styles.inputField}>
                <Text style={styles.label}>{label}</Text>
                {isDate ? (
                    <TouchableOpacity
                        style={[styles.textInput, { paddingVertical: "4.3%" }]}
                        onPress={() => setShow(true)}
                    >
                        {/* <Text>{`${value.toLocaleDateString()}`}</Text> */}
                        <Text>{`${value}`}</Text>
                    </TouchableOpacity>
                ) : (
                    <TextInput
                        placeholder={placeholder}
                        style={styles.textInput}
                        value={value}
                        onChange={changeFn}
                        numberOfLines={rows ? rows : 1}
                        editable={!disabled}
                    />
                )}
            </View>
        </View>
    );
}

export default InputFieldWithLabel;
