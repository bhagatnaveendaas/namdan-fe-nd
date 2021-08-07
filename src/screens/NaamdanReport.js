import React, {useEffect, useState} from "react";
import {AsyncStorage, Text} from 'react-native';
import ReportTemplate from "../components/ReportTemplate";
import {getPrathamAndSatnamCount} from "../httpClient/report/namdanReportAPI";

const NaamdanReport = () => {
  const [prathamAndSatnamCountResponse, setPrathamAndSatnamResponse] = useState(null);

  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("token")
      .then((token) => {
        setCsrfToken(token);
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
      title: "Pratham",
      dataKey: "prathams",
      numeric: true
    },
    {
      title: "Satnaam",
      dataKey: "satnams",
      numeric: true
    }
  ];

  return <ReportTemplate metaData={metaData} data={prathamAndSatnamCountResponse.data}
                         onDateChangeCallback={callNamdaanCountAPI}/>;

};

export default NaamdanReport;
