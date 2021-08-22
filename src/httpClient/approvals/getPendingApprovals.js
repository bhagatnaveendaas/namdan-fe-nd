import { post } from "../namdanAPIClient";

const getPendingApprovals = (csrfToken) => {
    const requestBody = {};

    return post(
        "namdan_center/list?verified=0",
        requestBody,
        csrfToken,
        "get"
    );
};

export default getPendingApprovals;
