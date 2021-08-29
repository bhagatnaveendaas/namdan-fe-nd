import React, { useEffect, useState } from "react";
import { View, AsyncStorage, Image, Dimensions } from "react-native";
import { SearchBar } from "react-native-elements";

const { height } = Dimensions.get("window");

import axios from "axios";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
    ATTENDANCE,
    PUNARUPDESH,
    SAARNAAM,
    SATNAM,
    USER_SEARCH_ACTION,
} from "../../constants";
import {
    generateAttendanceEntryRequestURL,
    generateNaamEntryCreateRequestURL,
    generateUserInfoRequestURL,
} from "../../helper/router";
import { executeRequest } from "../../helper/network/link";
import Dropdown from "../../components/DropdownV3";
import DateRangeFilter from "../../components/DateRangeFilter";
import { dateInYYMMDDFormat } from "../../utilities/DateUtils";
import theme from "../../constants/theme";
import DateSelectorComponent from "./components/naam-date-selector";
import PopupNotice from "./components/notice";
import UserInfoComponent from "./components/user";
import UserListComponent from "./components/user-list";
const successImageIcon = require("../../../assets/check-circletick.png");
const questionUserIcon = require("../../../assets/help-circle-outlinequestion-mark.png");
const failedIcon = require("../../../assets/x-circlewrong.png");

const POST_REQUEST_METHOD = "POST";
const USER_SEARCH_REQUEST_URL = generateUserInfoRequestURL(USER_SEARCH_ACTION);
console.log(USER_SEARCH_REQUEST_URL);
const APPLICATION_KEY = "dsv213a213sfv21123fs31d3fd132c3dv31dsf33";

const Entry = ({ route, navigation }) => {
    const [countries, setCountries] = useState();
    const [showFilters, setShowFilters] = useState(false);

    const [states, setStates] = useState();

    const [stateSelectedIndex, setStateSelectedIndex] = useState(-1);

    const [stateSelected, setStateSelected] = useState(27);

    const [countrySelected, setCountrySelected] = useState(2);

    const [countrySelectedIndex, setCountrySelectedIndex] = useState(-1);

    const [districts, setDistricts] = useState();

    const [districtSelected, setDistrictSelected] = useState();

    const [districtSelectedIndex, setDistrictSelectedIndex] = useState();

    const [tehsils, setTehsils] = useState();

    const [tehsilSelected, setTehsilsSelected] = useState();

    const [tehsilSelectedIndex, setTehsilSelectedIndex] = useState();

    const fetchCountries = async () => {
        const response = await AsyncStorage.getItem("countries");
        const countryNames = JSON.parse(response).map((country) => {
            return { name: country.name, id: country.id };
        });
        countryNames.unshift({id: '-1', name: 'Select Country'})
        setCountries(countryNames);
    };

    const fetchStates = async () => {
        try {
            let states = JSON.parse(await AsyncStorage.getItem("states"));
            let stateNames;
            stateNames = states
                .filter((state) => state.country_id == countrySelected)
                .map((state) => {
                    return { name: state.name, id: state.id };
                })
            stateNames.unshift({id: '-1', name: 'Select State'})
            setStates(stateNames);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchDistricts = async () => {
        const response = await AsyncStorage.getItem("districts");
        let distrinctNames;
        distrinctNames = JSON.parse(response)
            .filter(
                (district) =>
                    (countrySelected
                        ? district.country_id === countrySelected
                        : true) &&
                    (stateSelected ? district.state_id === stateSelected : true)
            )
            .map((distrinct) => {
                return {
                    name: distrinct.district_name,
                    id: distrinct.district_id,
                };
            });
            distrinctNames.unshift({id: '-1', name: 'Select District'})
        setDistricts(distrinctNames);
    };

    const fetchTehsils = async () => {
        let tehsils = JSON.parse(await AsyncStorage.getItem("tehsils"));
        let tehsilNames;
        tehsilNames = tehsils
            .filter(
                (tehsil) =>
                    (countrySelected
                        ? tehsil.country_id === countrySelected
                        : true) &&
                    (stateSelected
                        ? tehsil.state_id === stateSelected
                        : true) &&
                    (districtSelected
                        ? tehsil.district_id === districtSelected
                        : true)
            )
            .map((tehsil) => {
                return { name: tehsil.tehsil_name, id: tehsil.tehsil_id };
            });
            tehsilNames.unshift({id: '-1', name: 'Select Tehsil'})
        setTehsils(tehsilNames);
    };

    useEffect(() => {
        fetchTehsils();
    }, [districtSelected]);
    useEffect(() => {
        fetchDistricts();
    }, [stateSelected]);

    useEffect(() => {
        fetchStates();
    }, [countrySelected]);

    const [filterStartDate, setFilterStartDate] = useState(new Date("1996"));

    const [filterEndDate, setFilterEndDate] = useState(new Date());

    function formatDate(date) {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    }

    /**
     *
     * @param {*} searchString
     * Search disciple
     */
    const searchDisciples = async () => {
        const searchData = {
            from_date: dateInYYMMDDFormat(filterStartDate),
            to_date: dateInYYMMDDFormat(filterEndDate),
            country_id: countrySelected,
            // "tehsil_id": tehsilSelected,
            // "state_id": stateSelected,
            // "district_id": districtSelected,
            term: search,
        };
        const config = {
            method: POST_REQUEST_METHOD,
            headers: {
                key: APPLICATION_KEY,
                Accept: "application/json",
                "X-CSRF-TOKEN": await AsyncStorage.getItem("token"),
                key: "dsv213a213sfv21123fs31d3fd132c3dv31dsf33",
            },
        };
        executeRequest(USER_SEARCH_REQUEST_URL, searchData, config)
            .then((response) => {
                setUsersSearched(response.data.data);
            })
            .catch((error) => {
                console.log("Error: ", error);
                setUsersSearched([]);
            });
    };

    /**
     * Crate Attendance entry
     */
    const SATNAM_ATTENDANCE_ENTRY_REQUEST_URL =
        generateAttendanceEntryRequestURL();
    const createAttendanceEntry = async (discipleId, attendanceDate) => {
        const satnamAttendanceRequstBody = {
            disciple_id: discipleId,
            attendance_date: formatDate(attendanceDate),
            remark: "ok",
        };
        const config = {
            method: POST_REQUEST_METHOD,
            headers: {
                key: APPLICATION_KEY,
                Accept: "application/json",
                "X-CSRF-TOKEN": await AsyncStorage.getItem("token"),
                key: "dsv213a213sfv21123fs31d3fd132c3dv31dsf33",
            },
        };
        executeRequest(
            SATNAM_ATTENDANCE_ENTRY_REQUEST_URL,
            satnamAttendanceRequstBody,
            config
        )
            .then((response) => {
                console.log(
                    "Satnam Attendance Entry create responsse: ",
                    response
                );
            })
            .catch((error) => {
                console.log("Error in creatin satnam entry: ", error);
                throw new Error("Could not create entry");
            });
    };
    const createEntry = async (requestURL, requestData) => {
        const config = {
            method: POST_REQUEST_METHOD,
            headers: {
                key: APPLICATION_KEY,
                Accept: "application/json",
                "X-CSRF-TOKEN": await AsyncStorage.getItem("token"),
                key: "dsv213a213sfv21123fs31d3fd132c3dv31dsf33",
            },
        };
        console.log("Creating entry: ", config)
        await executeRequest(requestURL, requestData, config)
            .then((response) => {
                console.log("Satnam Entry create responsse: ", response);
            })
            .catch((error) => {
                console.log("Error in creatin satnam entry: ", error);
                throw new Error("Could not create entry");
            });
    };
    /**
     *
     * @param {*} discipleId
     * @param {*} selectedDate
     * Saarnaam entry
     */
    const SARNAM_CREATE_ENTRY_REQUEST_URL =
        generateNaamEntryCreateRequestURL(SAARNAAM);
    const createSaarnaamEntry = async (discipleId, selectedDate, remark = "ok") => {
        const requestData = {
            disciple_id: discipleId,
            sarnam_date: formatDate(selectedDate),
            remark: remark,
        };
        await createEntry(SARNAM_CREATE_ENTRY_REQUEST_URL, requestData);
    };

    const PUNARUPDESH_CREATE_ENTRY_REQUEST_URL =
        generateNaamEntryCreateRequestURL(PUNARUPDESH);
    const createReupdeshEntry = async (discipleId, selectedDate, remark = "ok") => {
        const requestData = {
            disciple_id: discipleId,
            reupdesh_date: formatDate(selectedDate),
            remark: remark,
        };
        await createEntry(PUNARUPDESH_CREATE_ENTRY_REQUEST_URL, requestData);
    };

    /**
     * Create satnam entry
     */
    const SATNAM_CREATE_ENTRY_REQUEST_URL =
        generateNaamEntryCreateRequestURL(SATNAM);
    const createSatnamEntry = async (
        discipleId,
        selectedDate,
        remark = "ok"
    ) => {
        const requestData = {
            disciple_id: discipleId,
            satnam_date: formatDate(selectedDate),
            remark: remark,
        };
        await createEntry(SATNAM_CREATE_ENTRY_REQUEST_URL, requestData);
    };

    const [initiateSuccessNotice, setInitiateSuccessNotice] = useState(false);

    const [initiateFailureNotice, setInitiateFailureNotice] = useState(false);

    const [search, setSearch] = useState("");
    const [personSelected, setPersonSelected] = useState(false);
    const [usersSearched, setUsersSearched] = useState([]);
    const [selectedDateForEntry, setSelectedDateForEntry] = useState();
    const handleSearchChange = (e) => {};
    const { entryType, title } = route.params;
    const [initiateSelectDate, setIinitiateSelectDate] = useState(false);
    useEffect(() => {
        console.log(entryType);
        navigation.setOptions({
            title: `${title} Entry`,
        });
        fetchCountries();
        fetchStates();
        fetchDistricts();
        fetchTehsils();
    }, []);

    useEffect(() => {
        console.log("Person selected", personSelected);
        console.log("Date for entry", selectedDateForEntry);
    }, [personSelected]);

    const handleEntryAPIError = () => {
        setSelectedDateForEntry(undefined);
        setPersonSelected(false);
        setInitiateSuccessNotice(false);
        setInitiateFailureNotice(true);
    };

    const handleEntryAPISuccess = () => {
        setSelectedDateForEntry(undefined);
        setPersonSelected(false);
        setInitiateSuccessNotice(true);
        setInitiateFailureNotice(false);
        searchDisciples(search)
    };

    const generateNaamEntry = () => {
        console.log("Entry type", entryType)
        switch (entryType) {
            case ATTENDANCE:
                {
                    createAttendanceEntry(
                        personSelected.id,
                        selectedDateForEntry
                    )
                        .catch((error) => {
                            handleEntryAPIError();
                        })
                        .then(() => {
                            handleEntryAPISuccess();
                        });
                }
                break;
            case SATNAM:
                {
                    createSatnamEntry(personSelected.id, selectedDateForEntry)
                        .catch((error) => {
                            handleEntryAPIError();
                        })
                        .then(() => {
                            handleEntryAPISuccess();
                        });
                }
                break;
            case SAARNAAM:
                {
                    console.log("Creating saarnaam entry")
                    createSaarnaamEntry(personSelected.id, selectedDateForEntry)
                        .catch((error) => {
                            handleEntryAPIError();
                        })
                        .then(() => {
                            handleEntryAPISuccess();
                        });
                }
                break;
            case PUNARUPDESH: {
                createReupdeshEntry(personSelected.id, selectedDateForEntry)
                    .then(() => {
                        handleEntryAPISuccess();
                    })
                    .catch(() => {
                        handleEntryAPIError();
                    });
            }
        }
    };

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: theme.colors.secondary,
                height: '100%'
            }}
        >
            <View
                style={
                    {
                        flex: 1,
                        height: '100%',
                        width: '100%'
                    }
                }
            >
                <View
                    styl={{
                        flex: 1,
                        width: "100%",
                        height: "100%",
                        flexDirection: "column",
                    }}
                >
                    <View>
                        <SearchBar
                            placeholder="Type Here..."
                            onChangeText={(value) => {
                                setSearch(value);
                                if(value.length > 2){
                                    console.log("Searching: ", value);
                                    searchDisciples();
                                }
                                
                            }}
                            onClear={
                                () => {
                                    setUsersSearched([])
                                }
                            }
                            lightTheme={true}
                            showCancel={true}
                            containerStyle={{
                                backgroundColor: theme.colors.secondary,
                                borderBottomColor: "transparent",
                                paddingBottom:0,
                                
                                borderTopColor: "transparent",
                            }}
                            inputStyle={{
                                backgroundColor: "#EDEDEE",
                                fontFamily: theme.fonts.poppins.regular,
                                fontSize: 14,
                            }}
                            inputContainerStyle={{
                                backgroundColor: "#EDEDEE",
                                borderBottomColor: "transparent",
                                borderTopColor: "transparent",
                                borderRadius: 100,
                            }}
                            value={search}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "column",
                            width: "100%",
                            paddingHorizontal: theme.screenPadding.horizontal,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                width: "100%",
                                justifyContent: "center",
                                marginBottom: 12,
                                alignContent: "center",
                                alignItems: "center",
                                marginTop: 12,
                            }}
                        >
                            <DateRangeFilter
                                startDate={filterStartDate}
                                endDate={filterEndDate}
                                onStartDateChange={setFilterStartDate}
                                onEndDateChange={setFilterStartDate}
                            />
                            <TouchableOpacity
                                onPress={() => setShowFilters((prev) => !prev)}
                            >
                                <Image
                                    style={{
                                        height: height * 0.03,
                                        width: height * 0.03,
                                    }}
                                    source={require("../../../assets/icons/FunnelSimple.png")}
                                />
                            </TouchableOpacity>
                        </View>
                        {showFilters && (
                            <View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        width: "100%",
                                        alignContent: "center",
                                        marginBottom: 12,
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <View
                                        style={
                                            {
                                                width: '47.5%'
                                            }
                                        }
                                    >
                                        <Dropdown
                                            inputStyles={
                                                {
                                                    dropdown: {
                                                        width: '100%'
                                                    }
                                                }
                                            }
                                            options={countries ? countries : []}
                                            label={"Country"}
                                            value={countrySelectedIndex}
                                            changeFn={(value) => {
                                                setCountrySelectedIndex(value);
                                                setCountrySelected(
                                                    countries[value].id
                                                );
                                            }}
                                        />
                                    </View>
                                    <View
                                        style={
                                            {
                                                width: '47.5%'
                                            }
                                        }
                                    >
                                        <Dropdown
                                            inputStyles={
                                                {
                                                    dropdown: {
                                                        width: '100%'
                                                    }
                                                }
                                            }
                                            options={states ? states : []}
                                            label={"State"}
                                            value={stateSelectedIndex || 0}
                                            changeFn={(value) => {
                                                setStateSelectedIndex(value);
                                                setStateSelected(
                                                    states[value].id
                                                );
                                            }}
                                        />
                                    </View>
                                    </View>
                                    <View
                                    style={{
                                        flexDirection: "row",
                                        width: "100%",
                                        alignContent: "center",
                                        marginBottom: 12,
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <View
                                        style={
                                            {
                                                width: '47.5%'
                                            }
                                        }
                                    >
                                        <Dropdown
                                            inputStyles={
                                                {
                                                    dropdown: {
                                                        width: '100%'
                                                    }
                                                }
                                            }
                                            options={districts ? districts : []}
                                            label={"District"}
                                            value={districtSelectedIndex}
                                            changeFn={(value) => {
                                                setDistrictSelectedIndex(value);
                                                setDistrictSelected(
                                                    districts[value].id
                                                );
                                            }}
                                        />
                                    </View>
                                    <View 
                                        style={
                                            {
                                                width: '47.5%'
                                            }
                                        }
                                    >
                                        <Dropdown
                                            inputStyles={
                                                {
                                                    dropdown: {
                                                        width: '100%'
                                                    }
                                                }
                                            }
                                            options={tehsils ? tehsils : []}
                                            label={"Tehsil"}
                                            value={tehsilSelectedIndex}
                                            changeFn={(value) => {
                                                setTehsilSelectedIndex(value);
                                                setTehsilsSelected(
                                                    tehsils[value].id
                                                );
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>
                    {
                        <PopupNotice
                            requireUserConsent={false}
                            message={"Success Adding Entry"}
                            isVisible={initiateSuccessNotice}
                            clickHandler={() => {
                                setInitiateSuccessNotice(false);
                            }}
                            sourceImage={successImageIcon}
                        />
                    }
                    {
                        <PopupNotice
                            requireUserConsent={false}
                            message={"Failure Adding Entry"}
                            isVisible={initiateFailureNotice}
                            clickHandler={() => {
                                setInitiateFailureNotice(false);
                            }}
                            sourceImage={failedIcon}
                        />
                    }
                    {
                        <PopupNotice
                            requireUserConsent={true}
                            message={
                                "Are you sure you want to continue adding entry ?"
                            }
                            cancelEntry={() => {
                                setSelectedDateForEntry(undefined);
                                setPersonSelected(false);
                            }}
                            confirmEntry={() => {
                                generateNaamEntry();
                            }}
                            isVisible={
                                personSelected &&
                                selectedDateForEntry !== undefined
                            }
                            sourceImage={questionUserIcon}
                        />
                    }
                    {personSelected ? (
                        <UserInfoComponent
                            setIinitiateSelectDate={setIinitiateSelectDate}
                            isHajriListRequested={true}
                            hajriType={SATNAM}
                            entryType={
                                entryType
                            }
                            user={personSelected}
                        />
                    ) : (
                        <View></View>
                    )}
                    <View>
                        <ScrollView
                            style={{
                                width: "100%",
                                flexDirection: "column",
                                marginTop: 10,
                                paddingBottom: 20
                            }}
                        >
                            {initiateSelectDate ? (
                                <DateSelectorComponent
                                    onDateSelected={(date) => {
                                        setIinitiateSelectDate(false);
                                        setSelectedDateForEntry(date);
                                    }}
                                />
                            ) : (
                                <View></View>
                            )}

                            <UserListComponent
                                setPersonSelected={setPersonSelected}
                                users={usersSearched}
                            ></UserListComponent>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default Entry;
