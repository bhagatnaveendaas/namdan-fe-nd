import React, { useEffect, useState } from "react";
import { Text } from 'react-native';
import { AsyncStorage } from "react-native";
import ReportTemplate from "../components/ReportTemplate";
import { getPrathamAndSatnamCount } from "../httpClient/report/namdanReportAPI";

const NaamdanReport = () => {
  const [prathamAndSatnamCountResponse, setPrathamAndSatnamResponse] = useState(null);

  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("token")
      .then((csrfToken) => {
        setCsrfToken(csrfToken);
      });
  }, [csrfToken]);

  const callNamdaanCountAPI = async (fromDate = "2017-01-03", toDate = "2021-10-03") => {
    const response = await getPrathamAndSatnamCount(csrfToken, fromDate, toDate);
    setPrathamAndSatnamResponse(response.data);
  }

  useEffect(() => {
    if (prathamAndSatnamCountResponse === null) {
      callNamdaanCountAPI();
    }
  }, [csrfToken]);

  if (!prathamAndSatnamCountResponse) return <Text>Loading data...</Text>;

  const headings = [{ title: "Country" }, { title: "State name" }, { title: "District name" }, { title: "Tehsil name" }, { title: "Pratham", numeric: true }, { title: "Satnaam", numeric: true }];

  return <ReportTemplate headings={headings} data={prathamAndSatnamCountResponse.data} onDateChangeCallback={callNamdaanCountAPI} />;

};

export default NaamdanReport;
