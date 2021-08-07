import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { DataTable } from 'react-native-paper';
import { dateInYYMMDDFormat } from "../utilities/DateUtils";
import DateRangeFilter from "./DateRangeFilter";
import { isCloseToBottom } from "../utilities/ScrollViewUtils";

const ReportTemplate = ({ metaData, data, callback }) => {
  const [startDate, setStartDate] = useState(new Date(0));
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    callback(dateInYYMMDDFormat(startDate), dateInYYMMDDFormat(endDate));
  }, [startDate, endDate]);

  return (
    <>
      <DateRangeFilter
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />
      <ScrollView onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          console.log("Scroll end reached");
        }
      }}
        scrollEventThrottle={400}>
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
                  metaData.map((metaDatum, i) => (
                    <DataTable.Cell key={i} numeric={metaDatum.numeric}>{datum[metaDatum.dataKey]}</DataTable.Cell>
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
