import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet } from "react-native";
import CountryCodes from "../constants/CountryCode.json";

const CountryCodePicker = React.forwardRef(({ value, onValueChange }, ref) => {
    return (
        <Picker
            ref={ref}
            selectedValue={value}
            onValueChange={onValueChange}
            style={{ display: "none" }}
        >
            {CountryCodes.map((item, index) => (
                <Picker.Item
                    key={index}
                    label={(item.name + " (" + item.dial_code + ") ").trim()}
                    value={item.dial_code}
                />
            ))}
        </Picker>
    );
});

export default CountryCodePicker;

const styles = StyleSheet.create({});
