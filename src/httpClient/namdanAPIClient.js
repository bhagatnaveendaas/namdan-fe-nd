import axios from "axios";

export const createRequestBasedOn = (data, f_date, t_date) => {
  if (!data)
    return { f_date, t_date }
  else {
    if (data.country_id)
      return { country: data.country_id, f_date, t_date }
    else if (data.state_id)
      return { state: data.state_id, f_date, t_date }
    else
      return { district: data.district_id, f_date, t_date }
  }
}

const post = (relativeUrlWithoutSlash, requestBody, csrfToken, method) => {
  const baseUrl = "https://drfapi.jagatgururampalji.org/v1/";
  const config = {
    method,
    url: baseUrl + relativeUrlWithoutSlash,
    data: requestBody,
    headers: {
      key: "dsv213a213sfv21123fs31d3fd132c3dv31dsf33",
      Accept: "application/json",
      "X-CSRF-TOKEN": csrfToken,
    },
  };
  return axios(config);
};

export { post };
