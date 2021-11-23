import React, { useState, memo } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
    Platform,
    Image,
    Text,
    View,
    TouchableOpacity,
    TextInput,
} from "react-native";
import moment from "moment";
import theme from "../constants/theme";
import { FONTS } from "../constants/fonts";
import { min } from "lodash";
const calenderImage = require("../../assets/icons/calendar.png");

const Field = ({ label, enable, onDateChange, value, minDate, children }) => {
    const [dateText, setDateText] = useState(value);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === "ios");
        setDate(currentDate);
        setDateText(moment(selectedDate).format("DD-MM-YYYY"));
        onDateChange(moment(selectedDate).format("YYYY-MM-DD"));
    };
    return (
        <View
            style={{
                padding: 5,
                paddingHorizontal: 10,
                backgroundColor: theme.colors.lightGray,
                marginVertical: 4,
                borderRadius: 5,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Text
                        allowFontScaling={false}
                        style={{
                            color: theme.colors.darkgray,
                            ...FONTS.h5,
                        }}
                    >
                        {label}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                        {!enable && (
                            <Text
                                allowFontScaling={false}
                                style={{ ...FONTS.body5 }}
                            >
                                {dateText !== ""
                                    ? moment(dateText).format("DD-MM-YYYY")
                                    : null}
                            </Text>
                        )}
                        {enable && dateText !== "" && (
                            <Text
                                allowFontScaling={false}
                                style={{ ...FONTS.body5, marginRight: 5 }}
                            >
                                {dateText}
                            </Text>
                        )}
                        {enable && (
                            <TouchableOpacity
                                style={{
                                    backgroundColor: theme.colors.primaryLight,
                                    paddingHorizontal: 5,
                                    borderRadius: 5,
                                }}
                                onPress={() => setShow(true)}
                            >
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        ...FONTS.h5,
                                        color: theme.colors.primary,
                                    }}
                                >
                                    Select Date
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                <Image
                    style={{ width: 25, height: 25, marginLeft: 10 }}
                    source={calenderImage}
                />
            </View>
            {children}
            {show && (
                <DateTimePicker
                    testID="profilechange"
                    value={date}
                    mode={"date"}
                    display={"default"}
                    maximumDate={new Date()}
                    minimumDate={minDate ? new Date(minDate) : null}
                    onChange={onChange}
                    onTouchCancel={() => {
                        onDateChange("");
                        setDateText("");
                    }}
                />
            )}
        </View>
    );
};

export default memo(Field);
