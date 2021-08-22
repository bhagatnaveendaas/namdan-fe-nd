import { createRequestBasedOn, post } from "../namdanAPIClient";

export const getEligibilityForPunarUpdeshCount = (csrfToken, f_date, t_date, data) => {
  return post("reports/satnam_validity_expired", createRequestBasedOn(data, f_date, t_date), csrfToken, "post");
}
