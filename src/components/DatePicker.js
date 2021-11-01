import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import moment from "moment";
import styles from "../styles/Singup";
import theme from "../constants/theme";

const DatePicker = ({
    date,
    label,
    setDate,
    show,
    setShow,
    required,
    appendComponent,
    ...props
}) => {
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
        <View style={{ marginTop: 10 }}>
            {label && (
                <Text
                    style={{
                        color: theme.colors.primary,
                        fontFamily: theme.fonts.poppins.semiBold,
                        fontSize: 14,
                        marginBottom: 2,
                    }}
                >
                    {label}
                    {required && <Text style={{ color: "red" }}>{" *"}</Text>}
                </Text>
            )}
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 2,
                    borderColor: theme.colors.primaryLight,
                    paddingHorizontal: 15,
                    height: 40,
                    borderRadius: 50,
                }}
                activeOpacity={1}
                onPress={() => setShow(true)}
            >
                <Text
                    style={{
                        flex: 1,
                        fontSize: 15,
                        lineHeight: 22,
                        fontFamily: theme.fonts.poppins.regular,
                        color: theme.colors.primary,
                    }}
                >
                    {date.format("DD-MM-YYYY")}
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
