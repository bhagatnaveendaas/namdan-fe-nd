import { post } from "../namdanAPIClient";

const getNamdaanCount = (csrfToken) => {
  const requestBody = {
    "page": 1,
    "country": 2,
    "state": 27,
    "f_date": "2017-01-03",
    "t_date": "2021-10-03",
    "namdan": 1
  };

  return post("reports/namdaan_counts", requestBody, csrfToken);
}

export {
  getNamdaanCount
}