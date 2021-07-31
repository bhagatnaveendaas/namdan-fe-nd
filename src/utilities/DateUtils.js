const dateInYYYYMMDDFormat = (date) => {
    const dateMonth = date.getUTCMonth() + 1; // months from 1-12
    const dateDay = date.getUTCDate();
    const dateYear = date.getUTCFullYear();

    return `${dateYear}/${dateMonth}/${dateDay}`;
};

export {
    // eslint-disable-next-line import/prefer-default-export
    dateInYYYYMMDDFormat,
};
