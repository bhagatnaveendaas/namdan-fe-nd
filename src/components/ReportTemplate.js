import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { DataTable } from 'react-native-paper';
import { dateInYYMMDDFormat } from "../utilities/DateUtils";
import DateRangeFilter from "./DateRangeFilter";

const ReportTemplate = ({ metaData, data, onDateChangeCallback }) => {
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
                            metaData.map((metaDatum) => (
                                <>
                                    <DataTable.Title numeric={metaDatum.numeric}>{metaDatum.title}</DataTable.Title>
                                </>
                            ))
                        }
                    </DataTable.Header>

                    {
                        data.map((datum) => (
                            <DataTable.Row>
                                {
                                    metaData.map((metaDatum) => (
                                        <DataTable.Cell>{datum[metaDatum.dataKey]}</DataTable.Cell>
                                    ))
                                }
                            </DataTable.Row>
                        ))
                    }

                </DataTable>
            </ScrollView>
        </>
    );
};

export default ReportTemplate;
