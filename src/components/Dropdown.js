import React from "react";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../styles/Singup";
import theme from "../constants/theme";

function Dropdown({ label, value, changeFn, options }) {
    // console.log({value})
    return (
        <View style={styles.inputField}>
            <Text style={styles.label}>{label}<Text style={{color: "rgb(256,0,0)"}}>{" *"}</Text></Text>
            <View style={styles.dropdown}>
                <Picker
                    selectedValue={value}
                    onValueChange={changeFn}
                   
                    style={{height:35}}
                >
                    <Picker.Item label="select an option" value={null} />
                    {options.map((item, index) => (
                        <Picker.Item
                            key={index}
                            label={item}
                            value={item}
                            fontFamily={theme.fonts.poppins.regular}
                            itemStyle={{
                                fontFamily: theme.fonts.poppins.regular,
                                textTransform: "capitalize",
                            }}
                        />
                    ))}
                </Picker>
            </View>
        </View>
    );
}

export default Dropdown;
