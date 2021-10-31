import React, { useEffect, useState } from "react";
import {
    View,
    AsyncStorage,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import SearchBar from "../../components/SearchBar";

const { height } = Dimensions.get("window");

import axios from "axios";
import {
    ATTENDANCE,
    PUNARUPDESH,
    SAARNAAM,
    SATNAM,
    SHUDDIKARAN,
    USER_SEARCH_ACTION,
} from "../../constants";
import {
    generateAttendanceEntryRequestURL,
    generateNaamEntryCreateRequestURL,
    generateShuddhiKaranRequestURL,
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
import UserCard from "./components/UserCard";
const successImageIcon = require("../../../assets/check-circletick.png");
const questionUserIcon = require("../../../assets/help-circle-outlinequestion-mark.png");
const failedIcon = require("../../../assets/x-circlewrong.png");

const POST_REQUEST_METHOD = "POST";
const USER_SEARCH_REQUEST_URL = generateUserInfoRequestURL(USER_SEARCH_ACTION);
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

    const [niyamSelectedForUpdesh, setNiyamSelectedForUpdesh] = useState();

    const fetchCountries = async () => {
        const response = await AsyncStorage.getItem("countries");
        const countryNames = JSON.parse(response).map((country) => {
            return { name: country.name, id: country.id };
        });
        countryNames.unshift({ id: "-1", name: "Select Country" });
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
                });
            stateNames.unshift({ id: "-1", name: "Select State" });
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
        distrinctNames.unshift({ id: "-1", name: "Select District" });
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
        tehsilNames.unshift({ id: "-1", name: "Select Tehsil" });
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
            tehsil_id: tehsilSelected,
            state_id: stateSelected,
            district_id: districtSelected,
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
                console.log(response.data.data[0]);
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
            },
        };
        console.log("Creating entry: ", config);
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
    const createSaarnaamEntry = async (
        discipleId,
        selectedDate,
        remark = "ok"
    ) => {
        const requestData = {
            disciple_id: discipleId,
            sarnam_date: formatDate(selectedDate),
            remark: remark,
        };
        await createEntry(SARNAM_CREATE_ENTRY_REQUEST_URL, requestData);
    };

    const PUNARUPDESH_CREATE_ENTRY_REQUEST_URL =
        generateNaamEntryCreateRequestURL(PUNARUPDESH);
    const createReupdeshEntry = async (
        discipleId,
        selectedDate,
        remark = "ok"
    ) => {
        const requestData = {
            disciple_id: discipleId,
            reupdesh_date: formatDate(selectedDate),
            remark: remark,
        };
        await createEntry(PUNARUPDESH_CREATE_ENTRY_REQUEST_URL, requestData);
    };

    const SHUDDHI_KARAN_CREATE_ENTRY_REQUEST_URL =
        generateShuddhiKaranRequestURL();
    const createShuddhiKaranEntry = async (
        discipleId,
        selectedDate,
        remark = "ok"
    ) => {
        const requestData = {
            disciple_id: discipleId,
            shuddhikaran_date: formatDate(selectedDate),
            niyam_id: niyamSelectedForUpdesh,
        };
        await createEntry(SHUDDHI_KARAN_CREATE_ENTRY_REQUEST_URL, requestData);
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
    const onUserSelected = () => {
        navigation.navigate("Profile");
    };

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
        searchDisciples(search);
    };

    const generateNaamEntry = () => {
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
                    console.log("Creating saarnaam entry");
                    createSaarnaamEntry(personSelected.id, selectedDateForEntry)
                        .catch((error) => {
                            handleEntryAPIError();
                        })
                        .then(() => {
                            handleEntryAPISuccess();
                        });
                }
                break;
            case PUNARUPDESH:
                {
                    createReupdeshEntry(personSelected.id, selectedDateForEntry)
                        .then(() => {
                            handleEntryAPISuccess();
                        })
                        .catch(() => {
                            handleEntryAPIError();
                        });
                }
                break;
            case SHUDDIKARAN: {
                createShuddhiKaranEntry(personSelected.id, selectedDateForEntry)
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
        <View
            style={{
                flex: 1,
                backgroundColor: theme.colors.white,
                height: "100%",
            }}
        >
            <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
                <SearchBar
                    value={search}
                    setValue={(text) => {
                        setSearch(text);
                        searchDisciples();
                    }}
                    onCancel={() => {
                        setSearch("");
                        setUsersSearched([]);
                    }}
                />
            </View>
            <View
                style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "center",
                    marginBottom: 12,
                    alignContent: "center",
                    alignItems: "center",
                    marginTop: 12,
                    paddingHorizontal: 15,
                }}
            >
                <DateRangeFilter
                    startDate={filterStartDate}
                    endDate={filterEndDate}
                    onStartDateChange={setFilterStartDate}
                    onEndDateChange={setFilterEndDate}
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
                <View style={{ paddingHorizontal: 15 }}>
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
                            style={{
                                width: "47.5%",
                            }}
                        >
                            <Dropdown
                                inputStyles={{
                                    dropdown: {
                                        width: "100%",
                                    },
                                }}
                                options={countries ? countries : []}
                                label={"Country"}
                                value={countrySelectedIndex}
                                changeFn={(value) => {
                                    setCountrySelectedIndex(value);
                                    setCountrySelected(countries[value].id);
                                }}
                            />
                        </View>
                        <View
                            style={{
                                width: "47.5%",
                            }}
                        >
                            <Dropdown
                                inputStyles={{
                                    dropdown: {
                                        width: "100%",
                                    },
                                }}
                                options={states ? states : []}
                                label={"State"}
                                value={stateSelectedIndex || 0}
                                changeFn={(value) => {
                                    setStateSelectedIndex(value);
                                    setStateSelected(states[value].id);
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
                            style={{
                                width: "47.5%",
                            }}
                        >
                            <Dropdown
                                inputStyles={{
                                    dropdown: {
                                        width: "100%",
                                    },
                                }}
                                options={districts ? districts : []}
                                label={"District"}
                                value={districtSelectedIndex}
                                changeFn={(value) => {
                                    setDistrictSelectedIndex(value);
                                    setDistrictSelected(districts[value].id);
                                }}
                            />
                        </View>
                        <View
                            style={{
                                width: "47.5%",
                            }}
                        >
                            <Dropdown
                                inputStyles={{
                                    dropdown: {
                                        width: "100%",
                                    },
                                }}
                                options={tehsils ? tehsils : []}
                                label={"Tehsil"}
                                value={tehsilSelectedIndex}
                                changeFn={(value) => {
                                    setTehsilSelectedIndex(value);
                                    setTehsilsSelected(tehsils[value].id);
                                }}
                            />
                        </View>
                    </View>
                </View>
            )}
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
            >
                <View style={{ paddingHorizontal: 15 }}>
                    {usersSearched.map((user, index) => {
                        return (
                            <View
                                key={index}
                                style={{
                                    marginVertical: 6,
                                }}
                            >
                                <UserCard
                                    user={user}
                                    onPress={() =>
                                        navigation.navigate("Profile", { user })
                                    }
                                />
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
};

export default Entry;
