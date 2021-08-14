import axios from "axios";

const post = (relativeUrlWithoutSlash, requestBody, csrfToken, method) => {
    const baseUrl = "https://drfapi.jagatgururampalji.org/v1/";
    const config = {
        method,
        url: baseUrl + relativeUrlWithoutSlash,
        data: requestBody,
        headers: {
            key: "dsv213a213sfv21123fs31d3fd132c3dv31dsf33",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrfToken,
        },
    };
    console.log({ config });
    return axios(config);
};

export { post };
