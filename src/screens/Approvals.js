import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import getPendingApprovals from "../httpClient/approvals/getPendingApprovals";
import approveCentre from "../httpClient/approvals/approveCentre";
import rejectCentre from "../httpClient/approvals/rejectCentre";
import { useGetAsyncStorageItem } from "../hooks/useGetAsyncStorageItem";
import { AsyncStorage } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native";
import { Image } from "react-native";
import { Platform } from "react-native";
import { Linking } from "react-native";
import theme from "../constants/theme";
import { TouchableOpacity } from "react-native";
import Notice from "../components/notice";

function Approvals() {
    const [pendingApprovals, setPendingApprovals] = useState([]);
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [countries, setCountries] = useState([]);
    const [tehsils, setTehsils] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState(
        "Are you sure you want to approve this centre ?"
    );
    const [userConsent, setUserConsent] = useState(true);
    const [icon, setIcon] = useState(
        require("../../assets/icons/question_mark.png")
    );
    const [selectedItem, setSelectedItem] = useState({});

    const callPendingApprovals = async () => {
        const csrfToken = await AsyncStorage.getItem("token");
        const tempCountries = JSON.parse(
            await AsyncStorage.getItem("countries")
        );
        setCountries(tempCountries ? tempCountries : []);

        const tempStates = JSON.parse(await AsyncStorage.getItem("states"));
        setStates(tempStates ? tempStates : []);

        const tempDistricts = JSON.parse(
            await AsyncStorage.getItem("districts")
        );
        setDistricts(tempDistricts ? tempDistricts : []);

        const tempTehsils = JSON.parse(await AsyncStorage.getItem("tehsils"));
        setTehsils(tempTehsils ? tempTehsils : []);

        const response = await getPendingApprovals(csrfToken);
        setPendingApprovals(
            response.data.data.filter(
                (item) => item.status === "Pending for verification"
            )
        );
    };

    useEffect(() => {
        setPendingApprovals([]);
        callPendingApprovals();
    }, []);

    const getCountryName = (countryId) => {
        const country = countries.filter((item) => item.id === countryId);
        return country[0] ? country[0].name : "No Country";
    };

    const getStateName = (stateId) => {
        const state = states.filter((item) => item.id === stateId);
        return state[0] ? state[0].name : "No state";
    };

    const getDistrictName = (districtId) => {
        const district = districts.filter(
            (item) => item.district_id === districtId
        );
        return district[0] ? district[0].district_name : "No district";
    };

    const getTehsilName = (tehsilId) => {
        const tehsil = tehsils.filter((item) => item.tehsil_id === tehsilId);
        return tehsil[0] ? tehsil[0].tehsil_name : "No tehsil";
    };

    const openMaps = (longitude, latitude) => {
        const location = `${latitude},${longitude}`;
        const url = Platform.select({
            ios: `maps:${location}`,
            android: `geo:${location}?center=${location}&q=${location}&z=16`,
        });

        Linking.canOpenURL(url).then((supported) => {
            if (supported) {
                return Linking.openURL(url);
            } else {
                const browser_url =
                    "https://maps.google.com/maps?daddr=" +
                    latitude +
                    "," +
                    longitude +
                    "?q=" +
                    label;
                return Linking.openURL(browser_url);
            }
        });
    };

    const consentModal = (id, status) => {
        if (status === "Approve" || status === "Reject") {
            setMessage(`Are you sure you want to ${status} this centre?`);
            setUserConsent(true);
            setIcon(require("../../assets/icons/question_mark.png"));
            setSelectedItem({ id, status });
            setIsVisible(true);
        }
    };

    const updateRecord = async (item) => {
        try {
            setIsVisible(false);
            console.log(item);
            const csrfToken = await AsyncStorage.getItem("token");
            if (item.status === "Approve") {
                const response = await approveCentre(csrfToken, item.id);
                console.log(response.data);
            } else {
                const response = await rejectCentre(csrfToken, item.id);
                console.log(response.data);
            }
            const temp = pendingApprovals.filter(
                (centre) => centre.id !== item.id
            );
            setPendingApprovals(temp);
            setMessage(`Naamdan centre successfully ${item.status}ed `);
            setIcon(require("../../assets/icons/check-circletick.png"));
        } catch (error) {
            setMessage(`Something went wrong`);
            setIcon(require("../../assets/icons/cross.png"));
        } finally {
            setUserConsent(false);
            setIsVisible(true);
        }
    };

    const renderItem = ({ item }) => (
        <View style={{ paddingBottom: 10, paddingHorizontal:"1%" }}>
            <Notice
                requireUserConsent={userConsent}
                message={message}
                cancelEntry={() => setIsVisible(false)}
                confirmEntry={() => updateRecord(selectedItem)}
                isVisible={isVisible}
                sourceImage={icon}
            />
            <View
                style={{
                    padding: "2%",
                    backgroundColor: "white",
                    borderRadius: 8,
                    elevation:5
                }}
            >
                <View style={{ flexDirection: "row" }}>
                    <View>
                        <View
                            style={{
                                height: 60,
                                width: 60,
                                borderRadius: 8,
                                backgroundColor: theme.colors.primary,
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            // source={{
                            //     uri: "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=6&m=1147544807&s=612x612&w=0&h=8CXEtGfDlt7oFx7UyEZClHojvDjZR91U-mAU8UlFF4Y=",
                            // }}
                        >
                            <Text
                                style={{
                                    textAlignVertical: "center",
                                    textAlign: "center",
                                    fontFamily: theme.fonts.poppins.semiBold,
                                    color: theme.colors.white,
                                    fontSize: 30,
                                }}
                            >
                                {item.name.slice(0, 2).toUpperCase()}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            paddingLeft: 13,
                            flexDirection: "column",
                            width: "58%",
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: theme.fonts.poppins.semiBold,
                                textTransform: "capitalize",
                            }}
                        >
                            {item.name}
                        </Text>
                        <Text
                            style={{
                                textTransform: "capitalize",
                                color: "#0077cc",
                                ...theme.sizes.regular,
                                fontFamily: theme.fonts.poppins.regular,
                            }}
                            onPress={() => {
                                // openMaps(item.longitude, item.latitude);
                                openMaps(74.0212, 18.4894);
                            }}
                        >
                            {getTehsilName(item.tehsil_id)},{" "}
                            {getDistrictName(item.district_id)},{" "}
                            {getStateName(item.state_id)},{" "}
                            {getCountryName(item.country_id)} {item.pincode}
                        </Text>
                        <Text
                            style={{
                                textTransform: "capitalize",
                                ...theme.sizes.regular,
                                fontFamily: theme.fonts.poppins.regular,
                            }}
                        >
                            +91 {item.mobile_no}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity
                            style={{
                                paddingHorizontal: 5,
                                paddingVertical: 3,
                                backgroundColor: "#49CF34",
                                borderRadius: 8,
                                flex: 1,
                                marginBottom: 3,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            onPress={() => consentModal(item.id, "Approve")}
                        >
                            <Text
                                style={{
                                    color: theme.colors.white,
                                    ...theme.sizes.regular,
                                    fontFamily: theme.fonts.poppins.semiBold,
                                }}
                            >
                                Approve{" "}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                paddingHorizontal: 5,
                                paddingVertical: 3,
                                backgroundColor: "#EA2E07",
                                borderRadius: 8,
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            onPress={() => consentModal(item.id, "Reject")}
                        >
                            <Text
                                style={{
                                    color: theme.colors.white,
                                    ...theme.sizes.regular,
                                    fontFamily: theme.fonts.poppins.semiBold,
                                }}
                            >
                                Reject
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView
            style={{
                paddingHorizontal: "3%",
                paddingTop: 10,
                backgroundColor: theme.colors.secondary,
                flex: 1,
            }}
        >
            {pendingApprovals.length ? (
                <View>
                    <FlatList
                        data={pendingApprovals}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item.id}
                    />
                </View>
            ) : (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                    }}
                >
                    <Text>No Pending approvals</Text>
                </View>
            )}
        </SafeAreaView>
    );
}

export default Approvals;
