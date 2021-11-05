import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Text, View } from "react-native";
import styles from "../styles/FormInput";

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
                <Text style={[styles.label, { marginBottom: 2 }]}>
                    {label}
                    {required && <Text style={styles.required}>{" *"}</Text>}
                </Text>
            )}
            <View style={[styles.container, containerStyle]}>
                <Picker
                    selectedValue={value}
                    onValueChange={onValueChange}
                    style={{ flex: 1 }}
                >
                    <Picker.Item
                        label={placeholder}
                        style={styles.firstPickerItem}
                        value={null}
                    />
                    {options.map((item, index) => (
                        <Picker.Item
                            style={styles.pickerItem}
                            key={index}
                            label={
                                item?.name
                                    ? item.name[0].toUpperCase() +
                                      item.name.slice(1).toLowerCase()
                                    : item
                            }
                            value={
                                typeof item === "string"
                                    ? item
                                    : item?.id
                                    ? item.id
                                    : index
                            }
                        />
                    ))}
                </Picker>
            </View>
        </View>
    );
};

export default FormSelectInput;