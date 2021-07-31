import React, { useState } from "react";
import DateRangeFilter from "./DateRangeFilter";

const ReportTemplate = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <>
            <DateRangeFilter
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
            />
        </>
    );
};

export default ReportTemplate;
