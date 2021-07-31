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
                    theme.card,
                    {
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                    },
                ]}
            >
                <SemiRoundIconButtons
                    label="Start Date"
                    icon={require("../../assets/icons/calendar.png")}
                    pressHandler={() => {
                        setShowStartDate(true);
                    }}
                />
                <SemiRoundIconButtons
                    label="End Date"
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
            <View
                style={[
                    {
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                    },
                ]}
            >
                <Text>Start date: {dateInDDMMYYFormat(startDate)}</Text>
                <Text>End date: {dateInDDMMYYFormat(endDate)}</Text>
            </View>
        </>
    );
};

export default DateRangeFilter;
