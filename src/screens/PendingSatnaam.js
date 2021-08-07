import React, { useEffect, useState } from "react";
import { AsyncStorage, Text } from 'react-native';
import ReportTemplate from "../components/ReportTemplate";
import { getPendingSatnaamCount } from "../httpClient/report/pendingSatnaamAPI";
import { pendingSatnamMetadata } from "../metaData/pendingSatnaamMetadata";

const PendingSatnaam = () => {
  const [pendingSatnaamResponse, setPendingSatnaamResponse] = useState(null);

  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("token")
      .then((token) => {
        setCsrfToken(token);
      });
  }, [csrfToken]);

  const callPendingSatnaamAPI = async (fromDate = "2017-01-03", toDate = "2021-10-03") => {
    const response = await getPendingSatnaamCount(csrfToken, fromDate, toDate);
    setPendingSatnaamResponse(response.data);
  }

  useEffect(() => {
    if (pendingSatnaamResponse === null) {
      callPendingSatnaamAPI();
    }
  }, [csrfToken]);

  if (!pendingSatnaamResponse) return <Text>Loading data...</Text>;

  return <ReportTemplate metaData={pendingSatnamMetadata} data={pendingSatnaamResponse.data}
    onDateChangeCallback={callPendingSatnaamAPI} />;

};

export default PendingSatnaam;
