import { post } from "../namdanAPIClient";

export const getPrathamAndSatnamCount = (csrfToken, f_date, t_date) => {
  const requestBody = {
    f_date,
    t_date
  };
  
  return post("reports/pratham_vs_satnam", requestBody, csrfToken,"post");
}
