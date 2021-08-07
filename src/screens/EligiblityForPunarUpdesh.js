import React, { useEffect, useState } from "react";
import { AsyncStorage, Text } from 'react-native';
import ReportTemplate from "../components/ReportTemplate";
import { getPendingSatnaamCount } from "../httpClient/report/pendingSatnaamAPI";

const EligibilityForPunarUpdesh = () => {
  const [eligibilityForPunarUpdeshResponse, setEligiblityForPunarUpdeshResponse] = useState(null);

  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("token")
      .then((token) => {
        setCsrfToken(token);
      });
  }, [csrfToken]);

  const callEligibilityForPunarUpdeshAPI = async (fromDate = "2017-01-03", toDate = "2021-10-03") => {
    const response = await getPendingSatnaamCount(csrfToken, fromDate, toDate);
    setEligiblityForPunarUpdeshResponse(response.data);
  }

  useEffect(() => {
    if (eligibilityForPunarUpdeshResponse === null) {
      callEligibilityForPunarUpdeshAPI();
    }
  }, [csrfToken]);

  if (!eligibilityForPunarUpdeshResponse) return <Text>Loading data...</Text>;

  const metaData = [
    {
      title: "Country",
      dataKey: "country_name"
    },
    {
      title: "State name",
      dataKey: "state_name"
    },
    {
      title: "District name",
      dataKey: "district_name"
    },
    {
      title: "Tehsil name",
      dataKey: "tehsil_name"
    },
    {
      title: "Total",
      dataKey: "total",
      numeric: true
    }
  ];

  return <ReportTemplate metaData={metaData} data={eligibilityForPunarUpdeshResponse.data}
    onDateChangeCallback={callEligibilityForPunarUpdeshAPI} />;

};

export default EligibilityForPunarUpdesh;
