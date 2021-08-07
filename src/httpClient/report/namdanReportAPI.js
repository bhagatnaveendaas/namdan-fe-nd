import { post } from "../namdanAPIClient";

export const getPrathamAndSatnamCount = (csrfToken, f_date, t_date, page = 1) => {
  const requestBody = {
    page,
    f_date,
    t_date
  };
  
  return post("reports/pratham_vs_satnam", requestBody, csrfToken);
}
