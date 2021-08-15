import { createRequestBasedOn, post } from "../namdanAPIClient";

export const getNamdaanCount = (csrfToken, f_date, t_date, data) => {
  return post("reports/namdaan_counts", createRequestBasedOn(data, f_date, t_date), csrfToken, "post");
}
