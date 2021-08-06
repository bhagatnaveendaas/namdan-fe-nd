import axios from "axios";

const post = (relativeUrlWithoutSlash, requestBody, csrfToken) => {
  const baseUrl = "https://drfapi.jagatgururampalji.org/v1/";
  const config = {
    method: "post",
    url: baseUrl + relativeUrlWithoutSlash,
    data: requestBody,
    headers: {
      key: "dsv213a213sfv21123fs31d3fd132c3dv31dsf33",
      Accept: "application/json",
      "X-CSRF-TOKEN": csrfToken,
      "Cookie": "namdan_auth_key=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjI3OTE4Mzk2LCJqdGkiOiI2Y2ZjZmIyMS1iM2I2LTRkYTEtOGVlNy1iZDMxYzYwOGZiZTkiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjp7InB1YmxpY19pZCI6MTUsImRldmljZV9pZCI6ImZkc2ZzZiJ9LCJuYmYiOjE2Mjc5MTgzOTYsImNzcmYiOiI4ZjRhYzg0YS1jYTVkLTRjYzEtODIxZC0xOGU4ZWZmNjUzOTIiLCJleHAiOjE2MjgxMzQzOTZ9.mHH4-8IOzIpsNBT7X69aNgq7dFvV9uYTnqIxWnq-z0E; namdan_csrf_key=8f4ac84a-ca5d-4cc1-821d-18e8eff65392"
    },
  };

  return axios(config);
}

export {
  post
}