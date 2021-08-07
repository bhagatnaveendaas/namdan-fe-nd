import { post } from "../namdanAPIClient";

export const getEligibilityForPunarUpdeshCount = (csrfToken, f_date, t_date) => {
  const requestBody = {
    "page": 1,
    f_date,
    t_date
  };
  
  return post("reports/satnam_validity_expired", requestBody, csrfToken);
}
