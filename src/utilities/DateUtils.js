import moment from "moment";
const getYear = (date) => {
    return date.getUTCFullYear();
};

const getDay = (date) => {
    return date.getUTCDate();
};

const getMonth = (date) => {
    return date.getUTCMonth() + 1; // months from 1-12
};

export const dateInDDMMYYFormat = (date) => {
    return `${getDay(date)}/${getMonth(date)}/${getYear(date)}`;
};

export const dateInYYMMDDFormat = (date, seperator = "-") => {
    return `${getYear(date)}${seperator}${getMonth(date)}${seperator}${getDay(
        date
    )}`;
};

export const countDays = (fromDate, toDate) => {
    var startDate = moment(fromDate, "YYYY-MM-DD");
    var endDate = moment(toDate, "YYYY-MM-DD");
    var diff = endDate.diff(startDate, "days");

    return Number(diff);
};

export const countDaysBetween = (fromDate, toDate) => {
    var given = moment(fromDate, "YYYY-MM-DD");
    var curr = moment(toDate, "YYYY-MM-DD");
    var duration = moment.duration(curr.diff(given)).asDays();

    return Math.floor(Number(duration));
};
export const countMonths = (fromDate, toDate) => {
    var startDate = moment(fromDate, "YYYY-MM-DD");
    var endDate = moment(toDate, "YYYY-MM-DD");
    var diff = endDate.diff(startDate, "months");

    return Number(diff);
};
export const countYears = (fromDate, toDate) => {
    var startDate = moment(fromDate, "YYYY-MM-DD");
    var endDate = moment(toDate, "YYYY-MM-DD");
    var diff = endDate.diff(startDate, "years");

    return Number(diff);
};
