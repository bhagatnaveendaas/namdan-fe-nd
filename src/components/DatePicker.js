import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import moment from "moment";
import styles from "../styles/FormInput";

const DatePicker = ({
    date,
    label,
    setDate,
    required,
    appendComponent,value,
    placeholder,
    containerStyle,
    ...props
}) => {
    const [showPlaceholder, setShowPlaceholder] = React.useState(true);
    const [newDate, setNewDate] = useState(value)
    const [show, setShow] = React.useState(false);
    const onChange = (event, selectedDate) => {
        const currentDate = moment(selectedDate) || newDate;
        setShow(false);
        if (event.type === "set") {
            setNewDate(currentDate);
            setShowPlaceholder(false);
            setDate(currentDate.format("YYYY-MM-DD"))
        } else return null;
    };
    return (
        <View style={{ marginTop: 10 }}>
            {label && (
                <Text
                    allowFontScaling={false}
                    style={[styles.label, { marginBottom: 2 }]}
                >
                    {label}
                    {required && <Text style={styles.required}>{" *"}</Text>}
                </Text>
            )}
            <TouchableOpacity
                style={[styles.container, containerStyle]}
                activeOpacity={1}
                onPress={() => setShow(true)}
            >
                <Text allowFontScaling={false} style={styles.dateText}>
                    {placeholder && showPlaceholder ? (
                        <Text style={styles.placeholderColor}>
                            {placeholder}
                        </Text>
                    ) : (
                        newDate.format("DD-MM-YYYY")
                    )}
                </Text>
                {appendComponent}
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={new Date(newDate)}
                        mode={"date"}
                        display="default"
                        onChange={onChange}
                        {...props}
                    />
                )}
            </TouchableOpacity>
        </View>
    );
};

export default DatePicker;
