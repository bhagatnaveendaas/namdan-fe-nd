import { 
    SAARNAAM,
    SATNAM,
    SEVA_API_REQUEST_URL,
    USER_SEARCH_ACTION
} from "../constants"

export const generateAttendaceCreateRequestURL = (
    naamType
) => {
    switch(
        naamType
    ){
        case SATNAM: {
            return `${SEVA_API_REQUEST_URL}/satnam/create`
        }
        case SAARNAAM: {
            return `${SEVA_API_REQUEST_URL}/saarnaam/create`
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
            return `${SEVA_API_REQUEST_URL}/disciple/advance_search?page=1&limit=100`
        }
        break;
    }
    
}