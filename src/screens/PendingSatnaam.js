import React, { useEffect, useState } from "react";
import { AsyncStorage, Text } from 'react-native';
import ReportTemplate from "../components/ReportTemplate";
import { getPendingSatnaamCount } from "../httpClient/report/pendingSatnaamAPI";

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

  return <ReportTemplate metaData={metaData} data={pendingSatnaamResponse.data}
    onDateChangeCallback={callPendingSatnaamAPI} />;

};

export default PendingSatnaam;
