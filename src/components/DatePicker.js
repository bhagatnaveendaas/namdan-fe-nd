import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import moment from "moment";
import styles from "../styles/FormInput";
import theme from "../constants/theme";

const DatePicker = ({
    date,
    label,
    setDate,
    show,
    setShow,
    required,
    appendComponent,
    placeholder,
    containerStyle,
    ...props
}) => {
    const [showPlaceholder, setShowPlaceholder] = React.useState(true);
    const onChange = (_, selectedDate) => {
        const currentDate = moment(selectedDate) || date;
        setShow(false);
        setDate(currentDate);
        setShowPlaceholder(false);
    };
    return (
        <View style={{ marginTop: 10 }}>
            {label && (
                <Text style={[styles.label, { marginBottom: 2 }]}>
                    {label}
                    {required && <Text style={styles.required}>{" *"}</Text>}
                </Text>
            )}
            <TouchableOpacity
                style={[
                    styles.container,
                    containerStyle
                ]}
                activeOpacity={1}
                onPress={() => setShow(true)}
            >
                <Text style={styles.dateText}>
                    {placeholder && showPlaceholder ? (
                        <Text style={styles.placeholderColor}>
                            {placeholder}
                        </Text>
                    ) : (
                        date.format("DD-MM-YYYY")
                    )}
                </Text>
                {appendComponent}
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={new Date(date)}
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