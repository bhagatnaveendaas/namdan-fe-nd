import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import moment from "moment";
import styles from "../styles/Singup";

const DatePicker = ({ date, label, setDate, show, setShow }) => {
    const onChange = (_, selectedDate) => {
        const currentDate = moment(selectedDate) || date;
        setShow(false);
        setDate(currentDate);
    };
    const showPlaceholder = React.useCallback(() => {
        return (
            date.toISOString().split(":")[0] ===
            new Date().toISOString().split(":")[0]
        );
    }, [date]);

    return (
        <View style={styles.inputField}>
            <Text style={styles.label}>{label}<Text style={{color: "rgb(256,0,0)"}}>{" *"}</Text></Text>
            <TouchableOpacity
                style={[styles.textInput, { paddingVertical: "4.3%" }]}
                activeOpacity={1}
                onPress={() => setShow(true)}
            >
                <View>
                    {showPlaceholder() && (
                        <Text style={styles.placeholder}>
                            Enter Your Date of Birth
                        </Text>
                    )}
                    {!showPlaceholder() && (
                        <Text>{date.format("DD-MM-YYYY")}</Text>
                    )}

                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={new Date(date)}
                            mode={"date"}
                            maximumDate={new Date()}
                            display="default"
                            onChange={onChange}
                        />
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default DatePicker;
