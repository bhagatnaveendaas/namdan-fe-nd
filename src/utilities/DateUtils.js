const getYear = (date) => {
    return date.getUTCFullYear();
}

const getDay = (date) => {
    return date.getUTCDate();
}

const getMonth = (date) => {
    return date.getUTCMonth() + 1; // months from 1-12
}

export const dateInDDMMYYFormat = (date) => {
    return `${getDay(date)}/${getMonth(date)}/${getYear(date)}`;
};

export const dateInYYMMDDFormat = (date, seperator = "-") => {
    return `${getYear(date)}${seperator}${getMonth(date)}${seperator}${getDay(date)}`;
};
