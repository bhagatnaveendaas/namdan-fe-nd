import React, {useEffect, useState} from "react";
import {AsyncStorage, Text} from 'react-native';
import ReportTemplate from "../components/ReportTemplate";
import {getPrathamAndSatnamCount} from "../httpClient/report/namdanReportAPI";
import { naamdanReportMetaData } from "../metaData/naamdanReportMetadata";

const NaamdanReport = () => {
  const [prathamAndSatnamCountResponse, setPrathamAndSatnamResponse] = useState(null);

  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("token")
      .then((token) => {
        setCsrfToken(token);
      });
  }, [csrfToken]);

  const callPrathamAndSatnamCountAPI = async (fromDate = "2017-01-03", toDate = "2021-10-03") => {
    const response = await getPrathamAndSatnamCount(csrfToken, fromDate, toDate);
    setPrathamAndSatnamResponse(response.data);
  }

  useEffect(() => {
    if (prathamAndSatnamCountResponse === null) {
      callPrathamAndSatnamCountAPI();
    }
  }, [csrfToken]);

  if (!prathamAndSatnamCountResponse) return <Text>Loading data...</Text>;

  return <ReportTemplate metaData={naamdanReportMetaData} data={prathamAndSatnamCountResponse.data}
                         onDateChangeCallback={callPrathamAndSatnamCountAPI}/>;

};

export default NaamdanReport;
