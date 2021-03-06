import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { dateInYYMMDDFormat } from "../utilities/DateUtils";
import DateRangeFilter from "./DateRangeFilter";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { reportDashboardStyles } from "../styles/ReportDashboardStyles";
import theme from "../constants/theme";
import { SafeAreaView } from "react-native";

const ReportTemplate = ({ metaData, data, callback }) => {
    const [startDate, setStartDate] = useState(new Date(0));
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        callback(dateInYYMMDDFormat(startDate), dateInYYMMDDFormat(endDate));
    }, [startDate, endDate]);

    return (
        <SafeAreaView
            style={{ backgroundColor: theme.colors.secondary, flex: 1, paddingHorizontal:"2%" }}
        >
            <DateRangeFilter
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
            />
            <View style={reportDashboardStyles.listWrapper}>
                {metaData.map((metaDatum) => (
                    <Text style={reportDashboardStyles.boldRow}>
                        {metaDatum.title}
                    </Text>
                ))}
            </View>
            <View style={reportDashboardStyles.body}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() =>
                                callback(
                                    dateInYYMMDDFormat(startDate),
                                    dateInYYMMDDFormat(endDate),
                                    item
                                )
                            }
                        >
                            <View style={reportDashboardStyles.rowWrapper}>
                                {metaData.map((metaDatum) => (
                                    <Text style={reportDashboardStyles.row}>
                                        {item[metaDatum.dataKey]}
                                    </Text>
                                ))}
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

export default ReportTemplate;
