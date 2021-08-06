import React, { useEffect, useState } from "react";
import { Text } from 'react-native';
import { AsyncStorage } from "react-native";
import ReportTemplate from "../components/ReportTemplate";
import { getNamdaanCount } from "../httpClient/report/namdanReportAPI";

const NaamdanReport = () => {
  const [namdanCountResponse, setNamdanCountResponse] = useState(null);

  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("token")
      .then((csrfToken) => {
        setCsrfToken(csrfToken);
      });
  }, [csrfToken]);

  useEffect(() => {
    const callNamdaanCountAPI = async () => {
      const response = await getNamdaanCount(csrfToken);
      setNamdanCountResponse(response.data);
    }

    if (namdanCountResponse === null) {
      callNamdaanCountAPI();
    }
  }, [csrfToken]);

  if (!namdanCountResponse) return <Text>Loading data...</Text>;

  return <ReportTemplate headings={[{ title: "Country" }, { title: "Pratham", numeric: true }, { title: "Satnaam", numeric: true }]} data={namdanCountResponse.data} />;
  
};

export default NaamdanReport;
