import React, { useEffect, useState } from "react";
import {
    AsyncStorage,
    Dimensions,
    Image,
    ScrollView,
    TouchableOpacity,
    View,
} from "react-native";
import DateRangeFilter from "../../components/DateRangeFilter";
import Dropdown from "../../components/DropdownV3";
import SearchBar from "../../components/SearchBar";
import { USER_SEARCH_ACTION } from "../../constants";
import theme from "../../constants/theme";
import { executeRequest } from "../../helper/network/link";
import { generateUserInfoRequestURL } from "../../helper/router";
import { postJsonData } from "../../httpClient/apiRequest";
import { dateInYYMMDDFormat } from "../../utilities/DateUtils";
import UserCard from "./components/UserCard";

const { height } = Dimensions.get("window");

const POST_REQUEST_METHOD = "POST";
const USER_SEARCH_REQUEST_URL = generateUserInfoRequestURL(USER_SEARCH_ACTION);
const APPLICATION_KEY = "dsv213a213sfv21123fs31d3fd132c3dv31dsf33";

const Entry = ({ route, navigation }) => {
    const [location, setLocation] = useState({
        countries: [],
        states: [],
        districts: [],
        tehsils: [],
    });
    const [locationSelected, setLocationSelected] = useState({
        countrySelected: -1,
        stateSelected: -1,
        districtSelected: -1,
        tehsilSelected: -1,
    });
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
    const searchBy = route.params.searchBy;
    const text = route.params.text;
    useEffect(() => {
        if (text) {
            searchDiscipleWithMobile(text);
        }
    }, []);

    const searchDiscipleWithMobile = async (mobileNo) => {
        try {
            const { data } = await postJsonData("/disciple/search", {
                search_by: "mobile_no",
                search_value: mobileNo,
            });
            if (data?.data.length > 0) {
                setUsersSearched(data.data);
            }
        } catch (error) {
            console.log("Error", error);
            setUsersSearched([]);
        }
    };
    const searchDisciples = async () => {
        const searchData = {
            search_by: "mobile_no",
            search_value: "+91" + search,
        };
        try {
            const { data } = await postJsonData("/disciple/search", searchData);

            console.log(searchBy);
            console.log(text);
            if (data?.data.length > 0) {
                setUsersSearched(data.data);
            }
        } catch (error) {
            console.log("Error", error);
            setUsersSearched([]);
        }
    };

    const [search, setSearch] = useState(route.params?.text || "");
    const [usersSearched, setUsersSearched] = useState([]);
    const { entryType, title } = route.params;

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
                    placeholder={"Search by mobile Number"}
                    value={search}
                    setValue={(text) => {
                        setSearch(text);
                    }}
                    onPress={searchDisciples}
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
