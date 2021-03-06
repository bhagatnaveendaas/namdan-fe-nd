import React, { useEffect, useState } from "react";
import { Text } from 'react-native';
import ReportTemplate from "../components/ReportTemplate";
import { useGetAsyncStorageItem } from "../hooks/useGetAsyncStorageItem";
import { getPendingSatnaamCount } from "../httpClient/report/pendingSatnaamAPI";
import { pendingSatnamMetadata } from "../metaData/pendingSatnaamMetadata";

const PendingSatnaam = () => {
  const [pendingSatnaamResponse, setPendingSatnaamResponse] = useState(null);

  const csrfToken = useGetAsyncStorageItem("token");

  const callPendingSatnaamAPI = async (fromDate = "2017-01-03", toDate = "2021-10-03", data) => {
    const response = await getPendingSatnaamCount(csrfToken, fromDate, toDate, data);
    setPendingSatnaamResponse(response.data);
  }

  useEffect(() => {
    if (pendingSatnaamResponse === null) {
      callPendingSatnaamAPI();
    }
  }, [csrfToken]);

  if (!pendingSatnaamResponse) return <Text>Loading data...</Text>;

  return <ReportTemplate metaData={pendingSatnamMetadata(pendingSatnaamResponse.data[0])} data={pendingSatnaamResponse.data}
    callback={callPendingSatnaamAPI} />;

};

export default PendingSatnaam;
