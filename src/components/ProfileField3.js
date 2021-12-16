import React, { useState, memo } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform, Text, View, Image, TouchableOpacity } from "react-native";
import moment from "moment";
import theme from "../constants/theme";
import { FONTS } from "../constants/fonts";
import { useNavigation } from "@react-navigation/native";
import RadioButton from "../components/RadioButton";
const userImage = require("../../assets/icons/userFilled.png");

const Field = ({
    label,
    optionValue,
    enable,
    onDateChange,
    onOptionChange,
    value,
    minDate,
    createdByID,
    children,
}) => {
    const navigation = useNavigation();
    const [dateText, setDateText] = useState(value);
    const [date, setDate] = useState(new Date());
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
                                color: enable
                                    ? theme.colors.primary
                                    : optionValue
                                    ? theme.colors.green
                                    : theme.colors.red,
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
                                    {dateText !== ""
                                        ? "Change Date"
                                        : "Select Date"}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
            {enable && (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                    }}
                >
                    <RadioButton
                        selected={optionValue === true}
                        color={theme.colors.primary}
                        id="mno"
                        labelStyle={{
                            ...FONTS.h5,
                        }}
                        size={16}
                        label="Pass"
                        onPress={() => onOptionChange(true)}
                    />
                    <RadioButton
                        selected={optionValue === false}
                        color={theme.colors.primary}
                        id="mno"
                        labelStyle={{
                            ...FONTS.h5,
                        }}
                        size={16}
                        label="Fail"
                        onPress={() => onOptionChange(false)}
                    />
                </View>
            )}
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
