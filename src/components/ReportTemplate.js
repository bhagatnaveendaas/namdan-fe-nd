import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { DataTable } from 'react-native-paper';
import DateRangeFilter from "./DateRangeFilter";

const Cell = ({ data }) => (
    <View style={styles.cellStyle}>
        <Text>{data}</Text>
    </View>
);

const Row = ({ column }) => (
    <View style={styles.rowStyle}>
        {column.map((data) => (
            <Cell data={data} />
        ))}
    </View>
);

const Grid = ({ headings, data }) => {
    return (
        <ScrollView style={styles.gridContainer}>
            {headings.map((heading, i) => (
                <Row column={heading} key={i} />
            ))}
            {data.map((column, i) => (
                <Row column={column} key={i} />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    gridContainer: {
        width: "100%",
    },
    rowStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    cellStyle: {
        flex: 1,
        margin: 10,
    },
});

const ReportTemplate = ({ headings, data }) => {
    const [startDate, setStartDate] = useState(new Date(0));
    const [endDate, setEndDate] = useState(new Date());

    return (
        <>
            <DateRangeFilter
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
            />
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
                            <DataTable.Cell numeric>{datum.total}</DataTable.Cell>
                            <DataTable.Cell numeric>{datum.total}</DataTable.Cell>
                        </DataTable.Row>
                    ))
                }

            </DataTable>
        </>
    );
};

export default ReportTemplate;
