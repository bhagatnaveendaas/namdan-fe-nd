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
import { useNavigation } from "@react-navigation/native";
const userImage = require("../../assets/icons/userFilled.png");
const calenderImage = require("../../assets/icons/calendar.png");

const Field = ({
    label,
    enable,
    onDateChange,
    value,
    minDate,
    reason,
    createdByID,
    placeholderText,
    onReasonChange,
}) => {
    const [dateText, setDateText] = useState(value);
    const [date, setDate] = useState(new Date());
    const navigation = useNavigation();
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === "ios");
        if (event.type === "set") {
            setDate(currentDate);
            setDateText(moment(selectedDate).format("DD-MM-YYYY"));
            onDateChange(moment(selectedDate).format("YYYY-MM-DD"));
        } else return null;
    };
    return (
        <View
            style={{
                padding: 5,
                paddingHorizontal: 10,
                backgroundColor: enable ? "#e3f2fd" : theme.colors.lightGray,
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
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        {!enable && (
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.push("Profile", {
                                        user: { id: createdByID },
                                        entryType: "User",
                                    })
                                }
                            >
                                <Image
                                    style={{
                                        width: 15,
                                        height: 15,
                                        marginRight: 10,
                                        tintColor: theme.colors.primary,
                                    }}
                                    source={userImage}
                                />
                            </TouchableOpacity>
                        )}
                        <Text
                            allowFontScaling={false}
                            style={{
                                color: theme.colors.primary,
                                ...FONTS.h5,
                            }}
                        >
                            {label}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        {!enable && (
                            <Text
                                allowFontScaling={false}
                                style={{ ...FONTS.body5 }}
                            >
                                {moment(dateText).format("DD-MM-YYYY")}
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
                                    {dateText !== ""
                                        ? "Change Date"
                                        : "Select Date"}
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
            {enable ? (
                <TextInput
                    allowFontScaling={false}
                    value={reason}
                    placeholder={placeholderText ?? "Enter the reason...."}
                    multiline
                    editable={enable}
                    autoFocus
                    placeholderTextColor={"black"}
                    onChangeText={onReasonChange}
                    style={{
                        backgroundColor: theme.colors.white,
                        padding: 0,
                        paddingHorizontal: 5,
                        ...FONTS.body5,
                        marginTop: 5,
                        borderRadius: 5,
                    }}
                />
            ) : (
                <Text
                    allowFontScaling={false}
                    style={{
                        backgroundColor: theme.colors.white,
                        padding: 0,
                        paddingHorizontal: 5,
                        ...FONTS.body5,
                        marginTop: 5,
                        borderRadius: 5,
                    }}
                >
                    {reason.trim()}
                </Text>
            )}
            {show && (
                <DateTimePicker
                    testID="profilechange"
                    value={date}
                    mode={"date"}
                    display={"default"}
                    maximumDate={new Date()}
                    minimumDate={minDate ? new Date(minDate) : null}
                    onChange={onChange}
                    onResponderReject={() => {
                        onDateChange("");
                        setDateText("");
                    }}
                />
            )}
        </View>
    );
};

export default memo(Field);
