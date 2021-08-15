import { post } from "../namdanAPIClient";

const rejectCentre = (csrfToken, id) => {
    const requestBody = {
        id,
        deleted_reason: "deletd",
    };

    return post("namdan_center/delete", requestBody, csrfToken, "post");
};

export default rejectCentre;
