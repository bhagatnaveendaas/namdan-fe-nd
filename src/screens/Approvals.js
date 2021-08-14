import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import getPendingApprovals from "../httpClient/approvals/getPendingApprovals";
import { useGetAsyncStorageItem } from "../hooks/useGetAsyncStorageItem";
import { AsyncStorage } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native";
import { Image } from "react-native";
import { Platform } from "react-native";
import { Linking } from "react-native";

function Approvals() {
    const [pendingApprovals, setPendingApprovals] = useState({});
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [countries, setCountries] = useState([]);
    const [tehsils, setTehsils] = useState([]);

    const callPendingApprovals = async () => {
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

        const csrfToken = await AsyncStorage.getItem("token");
        const response = await getPendingApprovals(csrfToken);
        setPendingApprovals(response.data.data);
    };

    useEffect(() => {
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

    const renderItem = ({ item }) => (
        <View style={{ paddingBottom: 10 }}>
            <View
                style={{
                    padding: "2%",
                    backgroundColor: "white",
                    borderRadius: 8,
                }}
            >
                <View style={{ flexDirection: "row" }}>
                    <View>
                        <Image
                            style={{
                                height: 60,
                                width: 60,
                                borderRadius: 8,
                            }}
                            source={{
                                uri: "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=6&m=1147544807&s=612x612&w=0&h=8CXEtGfDlt7oFx7UyEZClHojvDjZR91U-mAU8UlFF4Y=",
                            }}
                        />
                    </View>
                    <View
                        style={{
                            paddingHorizontal: 5,
                            flexDirection: "column",
                            width: "52%",
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: "bold",
                                textTransform: "capitalize",
                            }}
                        >
                            {item.name}
                        </Text>
                        <Text
                            style={{
                                textTransform: "capitalize",
                                color:"#0077cc"
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
                            }}
                        >
                            +91 {item.mobile_no}
                        </Text>
                    </View>
                    <Text>Approve </Text>
                    <Text>Reject </Text>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ paddingHorizontal: "3%", paddingTop: 10 }}>
            <View>
                <FlatList
                    data={pendingApprovals}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item.id}
                />
            </View>
        </SafeAreaView>
    );
}

export default Approvals;
