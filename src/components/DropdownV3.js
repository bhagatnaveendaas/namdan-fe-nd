import React, { useState } from "react";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../styles/dropdown";
import { capitalizeFirstLetter } from "../utilities/StringUtils";

function Dropdown({ label, value, changeFn, options, enabled, inputStyles }) {
    return (
        <View style={styles.inputField}>
            <View style={{...styles.dropdown, ...(inputStyles ? inputStyles.dropdown: {})}}>
                <Picker
                    style={
                        {
                            fontSize: 8,
                            fontStyle: 'normal',
                            fontWeight: '100'
                            
                        }    
                    }
                    selectedValue={value}
                    onValueChange={changeFn}
                    enabled={ enabled}
                    mode={
                        'dialog'
                    }
                >
                    {options.map((item, index) => (
                        <Picker.Item
                            key={index}
                            label={capitalizeFirstLetter(item.name)}
                            value={index}
                        />
                    ))}
                </Picker>
            </View>
        </View>
    );
}

export default Dropdown;
