import { post } from "../namdanAPIClient";

const approveCentre = (csrfToken, id) => {
    const requestBody = { id };

    return post("namdan_center/verify", requestBody, csrfToken, "post");
};

export default approveCentre;
