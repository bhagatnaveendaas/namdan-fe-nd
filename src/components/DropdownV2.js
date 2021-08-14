import React, { useState } from "react";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../styles/Singup";

function Dropdown({ label, value, changeFn, options, enabled }) {
    return (
        <View style={styles.inputField}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.dropdown}>
                <Picker
                    selectedValue={value}
                    onValueChange={changeFn}
                    enabled={ enabled}
                >
                    {options.map((item, index) => (
                        <Picker.Item
                            key={index}
                            label={item.name}
                            value={index}
                        />
                    ))}
                </Picker>
            </View>
        </View>
    );
}

export default Dropdown;
