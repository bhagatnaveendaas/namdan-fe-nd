import React, { useState } from "react"
import DateTimePicker from '@react-native-community/datetimepicker';

const DateSelectorComponent = (
    props
) => {
    const[
        date, setDate
    ] = useState( new Date())

    return (
        <DateTimePicker 
            value={ 
                date
            }
            mode={
                'date'
            }
            display={
                'calendar'
            }
            onChange={ 
                (e, newDate) => {
                    console.log(
                        "Date selected: ", newDate
                    )
                    props.onDateSelected && props.onDateSelected(newDate)
                }
            } 
        />
    )
}

export default DateSelectorComponent