import { createRequestBasedOn, post } from "../namdanAPIClient";

export const getNamdaanCount = (csrfToken, f_date, t_date, data) => {
  return post("reports/shuddhikaran", createRequestBasedOn(data, f_date, t_date), csrfToken, "post");
}
