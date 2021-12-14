import { getData } from "../httpClient/apiRequest";

export const getCountries = async (callback) => {
    try {
        const { data } = await getData("/country/list?page=1&limit=1000");
        const temp = data?.data.countries;
        callback(temp);
    } catch (error) {
        console.log("Unable to fetch countries", error);
    }
};

export const getStates = async (id, callback) => {
    if (!id) {
        return false;
    }
    try {
        const { data } = await getData(`country/${id}/state`);
        const reqStates = data?.data;
        callback(reqStates);
    } catch (error) {
        console.error(error.message);
        console.log(`Unable to fectch states for id = ${id}`);
    }
};

export const getCities = async (id, callback) => {
    if (!id) {
        return false;
    }
    try {
        const { data } = await getData(`state/${id}/city`);
        const reqCities = data?.data;
        callback(reqCities);
    } catch (error) {
        console.error(error.message);
        console.log(`Unable to fectch cities for id = ${id}`);
    }
};

export const getDistricts = async (id, callback) => {
    if (!id) {
        return false;
    }
    try {
        const { data } = await getData(`state/${id}/district`);
        let reqDistricts = data?.data;
        callback(reqDistricts);
    } catch (error) {
        console.error(error.message);
        console.log(`Unable to fectch districts for id = ${id}`);
    }
};

export const getTehsils = async (id, callback) => {
    if (!id) {
        return false;
    }
    try {
        const { data } = await getData(`district/${id}/tehsil`);
        let reqTehsils = data?.data;
        callback(reqTehsils);
    } catch (error) {
        console.error(error.message);
        console.log(`Unable to fectch tehsil for id = ${id}`);
    }
};
