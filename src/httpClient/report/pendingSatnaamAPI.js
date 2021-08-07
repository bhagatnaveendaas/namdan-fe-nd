import { post } from "../namdanAPIClient";

export const getPendingSatnaamCount = (csrfToken, f_date, t_date) => {
  const requestBody = {
    "page": 1,
    "country": 2,
    "state": 27,
    f_date,
    t_date,
    "namdan": 1
  };
  
  return post("reports/satnam_validity_expiring", requestBody, csrfToken);
}
