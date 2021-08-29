import React, { useState } from "react";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../styles/Singup";
import theme from "../constants/theme";

function Dropdown({ label, value, changeFn, options, enabled, reqId }) {
    return (
        <View style={styles.inputField}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.dropdown}>
                <Picker
                    selectedValue={value}
                    onValueChange={changeFn}
                    enabled={enabled}
                    style={{
                        color: "black",
                        textTransform: "capitalize",
                        fontFamily: theme.fonts.poppins.regular,
                        ...theme.sizes.regular,
                        height: 34,
                    }}
                >
                    <Picker.Item label="select an option" value={null} />
                    {options.map((item, index) => (
                        <Picker.Item
                            key={index}
                            label={
                                item.name[0].toUpperCase() +
                                item.name.slice(1).toLowerCase()
                            }
                            value={reqId ? item.id : index}
                        />
                    ))}
                </Picker>
            </View>
        </View>
    );
}

export default Dropdown;
