import React, { useEffect, useState } from "react";
import { Text } from 'react-native';
import { AsyncStorage } from "react-native";
import ReportTemplate from "../components/ReportTemplate";
import { getNamdaanCount } from "../httpClient/report/namdanReportAPI";

const NaamdanReport = () => {
  const [namdanCountResponse, setNamdanCountResponse] = useState(null);

  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("token")
      .then((csrfToken) => {
        setCsrfToken(csrfToken);
      });
  }, [csrfToken]);

  const callNamdaanCountAPI = async (fromDate = "2017-01-03", toDate = "2021-10-03") => {
    const response = await getNamdaanCount(csrfToken, fromDate, toDate);
    setNamdanCountResponse(response.data);
  }

  useEffect(() => {
    if (namdanCountResponse === null) {
      callNamdaanCountAPI();
    }
  }, [csrfToken]);

  if (!namdanCountResponse) return <Text>Loading data...</Text>;

  const headings = [{ title: "Country" }, { title: "State name" }, { title: "District name" }, { title: "Tehsil name" }, { title: "Pratham", numeric: true }, { title: "Satnaam", numeric: true }];

  return <ReportTemplate headings={headings} data={namdanCountResponse.data} onDateChangeCallback={callNamdaanCountAPI} />;

};

export default NaamdanReport;
