import { post } from "../namdanAPIClient";

export const getNamdaanCount = (csrfToken, f_date, t_date) => {
  const requestBody = {
    "page": 1,
    f_date,
    t_date
  };
  
  return post("reports/namdaan_counts", requestBody, csrfToken);
}
