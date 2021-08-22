import { createRequestBasedOn, post } from "../namdanAPIClient";

export const getPendingSatnaamCount = (csrfToken, f_date, t_date, data) => {
  return post("reports/satnam_validity_expiring", createRequestBasedOn(data, f_date, t_date), csrfToken,"post");
}
