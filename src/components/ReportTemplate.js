import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { dateInYYMMDDFormat } from "../utilities/DateUtils";
import DateRangeFilter from "./DateRangeFilter";
import { FlatList } from "react-native-gesture-handler";
import { reportDashboardStyles } from "../styles/ReportDashboardStyles";
import { isCloseToTop } from "../utilities/ScrollViewUtils";

const ReportTemplate = ({ metaData, data, callback }) => {
  const [startDate, setStartDate] = useState(new Date(0));
  const [endDate, setEndDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    callback(dateInYYMMDDFormat(startDate), dateInYYMMDDFormat(endDate), currentPage);
  }, [startDate, endDate]);

  return (
    <>
      <DateRangeFilter
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />
      <View style={reportDashboardStyles.listWrapper}>
        {
          metaData.map((metaDatum) =>
            <Text style={reportDashboardStyles.row}>
              {metaDatum.title}
            </Text>)
        }
      </View>
      <View style={reportDashboardStyles.body}>
        <FlatList
          data={data}
          renderItem={({ item }) =>
            <View style={reportDashboardStyles.listWrapper}>
              {
                metaData.map((metaDatum) =>
                  <Text style={reportDashboardStyles.row}>
                    {item[metaDatum.dataKey]}
                  </Text>)
              }
            </View>
          }
          onScroll={({ nativeEvent }) => {
            if (isCloseToTop(nativeEvent)) {
              if (currentPage >= 1)
                setCurrentPage(currentPage - 1);
              callback(dateInYYMMDDFormat(startDate), dateInYYMMDDFormat(endDate), currentPage);
            }
          }}
          onEndReached={() => {
            setCurrentPage(currentPage + 1);
            callback(dateInYYMMDDFormat(startDate), dateInYYMMDDFormat(endDate), currentPage);
          }}
          showDefaultLoadingIndicators={true}
          onEndReachedThreshold={0}
        />
      </View>
    </>
  );
};

export default ReportTemplate;
