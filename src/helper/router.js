import { 
    PUNARUPDESH,
    SAARNAAM,
    SATNAM,
    SEVA_API_REQUEST_URL,
    SHUDDIKARAN,
    USER_SEARCH_ACTION
} from "../constants"

/**
 * 
 * @returns Current default is set satnaam attendance
 */
export const generateAttendanceEntryRequestURL = () => {
    return `${SEVA_API_REQUEST_URL}/satnam_attendance/create`
}

export const generateNaamEntryCreateRequestURL = (
    naamType
) => {
    switch(
        naamType
    ){
        case SATNAM: {
            return `${SEVA_API_REQUEST_URL}/satnam/create`
        }
        case SAARNAAM: {
            return `${SEVA_API_REQUEST_URL}/sarnam/create`
        }
        case PUNARUPDESH: {
            return `${SEVA_API_REQUEST_URL}/reupdesh/create`
        }
        case SHUDDIKARAN: {
            return `${SEVA_API_REQUEST_URL}/reupdesh/create`
        }
    }
}
export const generateAttendanceInfoRequestURL = (
    naamType,
    discipleId
) => {
    switch(
        naamType
    ){
        case SATNAM: {
            return `${SEVA_API_REQUEST_URL}/satnam_attendance/detail/${discipleId}`
        }
        case SAARNAAM: {
            return `${SEVA_API_REQUEST_URL}/saarnaam_attendance/detail/${discipleId}`
        }
    }
}

export const generateUserInfoRequestURL = (
    action
) => {
    switch(
        action
    ){
        case USER_SEARCH_ACTION: {
            return `${SEVA_API_REQUEST_URL}/disciple/search`
        }
        break;
    }
    
}

export const generateNiyamRequestURL = () => {
    return `${SEVA_API_REQUEST_URL}/niyam/list`
}

export const generateShuddhiKaranRequestURL = () => {
    return `${SEVA_API_REQUEST_URL}/shuddhikaran/create`
}