import React, { useEffect, useState } from "react";
import { AsyncStorage, Text } from 'react-native';
import ReportTemplate from "../components/ReportTemplate";
import { getNamdaanCount } from "../httpClient/report/namdanCentreAPI";

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

  return <ReportTemplate metaData={metaData} data={namdaanCountResponse.data}
    onDateChangeCallback={callNamdaanCountAPI} />;

};

export default NaamdanCentre;
