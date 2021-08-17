import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Text, View } from "react-native";
import theme from "../constants/theme";
import { dateInDDMMYYFormat } from "../utilities/DateUtils";
import SemiRoundIconButtons from "./SemiRoundIconButtons";

const DateRangeFilter = ({
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
}) => {
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);

    return (
        <>
            <View
                style={[
                    theme.box,
                    {
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                    },
                ]}
            >
                <SemiRoundIconButtons
                    label={dateInDDMMYYFormat(startDate)}
                    icon={require("../../assets/icons/calendar.png")}
                    pressHandler={() => {
                        setShowStartDate(true);
                    }}
                />
                <SemiRoundIconButtons
                    label={dateInDDMMYYFormat(endDate)}
                    icon={require("../../assets/icons/calendar.png")}
                    pressHandler={() => {
                        setShowEndDate(true);
                    }}
                />

                {showStartDate && (
                    <DateTimePicker
                        testID="start-date-time-picker"
                        value={startDate}
                        mode="date"
                        is24Hour
                        display="default"
                        onChange={(event, updatedTimeStamp) => {
                            setShowStartDate(false);
                            if (updatedTimeStamp)
                                onStartDateChange(new Date(updatedTimeStamp));
                        }}
                    />
                )}
                {showEndDate && (
                    <DateTimePicker
                        testID="end-date-time-picker"
                        value={endDate}
                        mode="date"
                        is24Hour
                        display="default"
                        onChange={(event, updatedTimestamp) => {
                            setShowEndDate(false);
                            if (updatedTimestamp)
                                onEndDateChange(new Date(updatedTimestamp));
                        }}
                    />
                )}
            </View>
        </>
    );
};

export default DateRangeFilter;
