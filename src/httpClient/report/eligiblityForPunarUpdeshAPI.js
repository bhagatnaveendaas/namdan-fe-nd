import { post } from "../namdanAPIClient";

export const getEligibilityForPunarUpdeshCount = (csrfToken, f_date, t_date) => {
  const requestBody = {
    "page": 1,
    "country": 2,
    "state": 27,
    f_date,
    t_date,
    "namdan": 1
  };
  
  console.log(requestBody);

  return post("reports/satnam_validity_expired", requestBody, csrfToken);
}
