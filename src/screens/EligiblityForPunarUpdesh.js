import React, { useEffect, useState } from "react";
import { Text } from 'react-native';
import ReportTemplate from "../components/ReportTemplate";
import { useGetAsyncStorageItem } from "../hooks/useGetAsyncStorageItem";
import { getEligibilityForPunarUpdeshCount } from "../httpClient/report/eligiblityForPunarUpdeshAPI";
import { eligibilityForPunarUpdeshMetadata } from "../metaData/eligibilityForPunarUpdeshMetadata";

const EligibilityForPunarUpdesh = () => {
  const [eligibilityForPunarUpdeshResponse, setEligiblityForPunarUpdeshResponse] = useState(null);

  const csrfToken = useGetAsyncStorageItem("token");

  const callEligibilityForPunarUpdeshAPI = async (fromDate = "2017-01-03", toDate = "2021-10-03", data) => {
    const response = await getEligibilityForPunarUpdeshCount(csrfToken, fromDate, toDate, data);
    setEligiblityForPunarUpdeshResponse(response.data);
  }

  useEffect(() => {
    if (eligibilityForPunarUpdeshResponse === null) {
      callEligibilityForPunarUpdeshAPI();
    }
  }, [csrfToken]);

  if (!eligibilityForPunarUpdeshResponse) return <Text>Loading data...</Text>;

  return <ReportTemplate metaData={eligibilityForPunarUpdeshMetadata(eligibilityForPunarUpdeshResponse.data[0])} data={eligibilityForPunarUpdeshResponse.data}
    callback={callEligibilityForPunarUpdeshAPI} />;

};

export default EligibilityForPunarUpdesh;
