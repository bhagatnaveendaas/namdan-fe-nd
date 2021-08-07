import React, { useEffect, useState } from "react";
import { Text } from 'react-native';
import ReportTemplate from "../components/ReportTemplate";
import { useGetAsyncStorageItem } from "../hooks/useGetAsyncStorageItem";
import { getNamdaanCount } from "../httpClient/report/namdanCentreAPI";
import { naamdanCentreMetadata } from "../metaData/naamdanCentreMetadata";

const NaamdanCentre = () => {
  const [namdaanCountResponse, setNamdaanCountResponse] = useState(null);
  const csrfToken = useGetAsyncStorageItem("token");

  const callNamdaanCountAPI = async (fromDate = "2017-01-03", toDate = "2021-10-03", page) => {
    const response = await getNamdaanCount(csrfToken, fromDate, toDate, page);
    setNamdaanCountResponse(response.data);
  }

  useEffect(() => {
    if (namdaanCountResponse === null) {
      callNamdaanCountAPI();
    }
  }, [csrfToken]);

  if (!namdaanCountResponse) return <Text>Loading data...</Text>;

  return <ReportTemplate metaData={naamdanCentreMetadata} data={namdaanCountResponse.data}
    callback={callNamdaanCountAPI} />;

};

export default NaamdanCentre;
