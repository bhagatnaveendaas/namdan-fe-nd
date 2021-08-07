import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { DataTable } from 'react-native-paper';
import { dateInYYMMDDFormat } from "../utilities/DateUtils";
import DateRangeFilter from "./DateRangeFilter";

const ReportTemplate = ({ headings, data, onDateChangeCallback }) => {
    const [startDate, setStartDate] = useState(new Date(0));
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        onDateChangeCallback(dateInYYMMDDFormat(startDate), dateInYYMMDDFormat(endDate));
    }, [startDate, endDate]);

    return (
        <>
            <DateRangeFilter
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
            />
            <ScrollView>
                <DataTable>
                    <DataTable.Header>
                        {
                            headings.map((heading) => (
                                <>
                                    <DataTable.Title numeric={heading.numeric}>{heading.title}</DataTable.Title>
                                </>
                            ))
                        }
                    </DataTable.Header>

                    {
                        data.map((datum) => (
                            <DataTable.Row>
                                <DataTable.Cell>{datum.country_name}</DataTable.Cell>
                                <DataTable.Cell>{datum.state_name}</DataTable.Cell>
                                <DataTable.Cell>{datum.district_name}</DataTable.Cell>
                                <DataTable.Cell>{datum.tehsil_name}</DataTable.Cell>
                                <DataTable.Cell numeric>{datum.prathams}</DataTable.Cell>
                                <DataTable.Cell numeric>{datum.satnams}</DataTable.Cell>
                            </DataTable.Row>
                        ))
                    }

                </DataTable>
            </ScrollView>
        </>
    );
};

export default ReportTemplate;
