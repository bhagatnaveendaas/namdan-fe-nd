import React, { useEffect, useState } from "react";
import { AsyncStorage, Text } from 'react-native';
import ReportTemplate from "../components/ReportTemplate";
import { getNamdaanCount } from "../httpClient/report/namdanCentreAPI";
import { naamdanCentreMetadata } from "../metaData/naamdanCentreMetadata";

const NaamdanCentre = () => {
  const [namdaanCountResponse, setNamdaanCountResponse] = useState(null);

  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("token")
      .then((token) => {
        setCsrfToken(token);
      });
  }, [csrfToken]);

  const callNamdaanCountAPI = async (fromDate = "2017-01-03", toDate = "2021-10-03") => {
    const response = await getNamdaanCount(csrfToken, fromDate, toDate);
    setNamdaanCountResponse(response.data);
  }

  useEffect(() => {
    if (namdaanCountResponse === null) {
      callNamdaanCountAPI();
    }
  }, [csrfToken]);

  if (!namdaanCountResponse) return <Text>Loading data...</Text>;

  return <ReportTemplate metaData={naamdanCentreMetadata} data={namdaanCountResponse.data}
    onDateChangeCallback={callNamdaanCountAPI} />;

};

export default NaamdanCentre;
