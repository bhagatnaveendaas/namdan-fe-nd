import React, { useState, useEffect } from "react";
import { Text, View, Button, Image, AsyncStorage } from "react-native";
import {
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import DropdownV2 from "../components/DropdownV2";
import Dropdown from "../components/Dropdown";
import InputFieldWithLabel from "../components/InputFieldWithLabel";
import RoundButton from "../components/RoundButton";
import styles from "../styles/Singup";
import Constants from "../constants/text/Signup";
import axios from "axios";
import AwesomeAlert from "react-native-awesome-alerts";
import _, { fill } from "lodash";
import { serialize } from "object-to-formdata";
import moment from "moment";

function AddNaamdanCenter() {
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [countries, setcountries] = useState([]);
    const [tehsils, setTehsils] = useState([]);

    const [showAlert, setShowAlert] = useState({
        show: false,
        title: "",
        message: "",
        cancel: "",
        confirm: "",
    });

    const userInitialInfo = {
        address: "",
        state_id: 20,
        tehsil_id: "",
        country_id: 76,
        district_id: "",
        email: "",
        mobile_no: "",
        name: "",
        // photo: "",
        started_on: "",
        pincode: "",
        area_type: "rural",
    };
    const [userData, setUserData] = useState(userInitialInfo);
    const [image, setImage] = useState(null);
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);

    const onNameChange = (event) => {
        const temp = { ...userData };
        temp.name = event.nativeEvent.text;
        setUserData(temp);
    };

    const getCountries = async () => {
        console.log("Callled");
        const temp = JSON.parse(await AsyncStorage.getItem("countries"));
        console.log({ temp });
        setcountries(temp ? temp : []);
        getStates(userData.country_id);
    };

    useEffect(() => {
        getCountries();
        console.log({ countries });
    }, []);

    useEffect(() => {
        const temp = { ...userData };
        temp.district_id = null;
        temp.tehsil_id = null;
        setUserData(temp);
        setTehsils([]);
    }, [districts]);

    useEffect(() => {
        const temp = { ...userData };
        temp.tehsil_id = null;
        setUserData(temp);
    }, [tehsils]);

    const getStates = async (countryId) => {
        if (!countryId) {
            return false;
        }
        const temp = JSON.parse(await AsyncStorage.getItem("states"));
        const reqStates = temp.filter(
            (state) => state.country_id === countries[countryId]?.id
        );
        setStates(reqStates);
        getDistricts(userData.state_id);
    };

    const getDistricts = async (stateId) => {
        console.log(states[stateId]);
        if (!stateId) {
            return false;
        }
        const temp = JSON.parse(await AsyncStorage.getItem("districts"));
        let reqDistricts = temp.filter(
            (district) => district.state_id === states[stateId]?.id
        );
        reqDistricts = reqDistricts.map((item) => {
            return { ...item, name: item.district_name };
        });
        setDistricts(reqDistricts);
    };

    const getTehsils = async (district_id) => {
        if (!district_id) {
            return false;
        }
        const temp = JSON.parse(await AsyncStorage.getItem("tehsils"));
        let reqTehsils = temp.filter(
            (tehsil) =>
                tehsil.district_id === districts[district_id]?.district_id
        );

        reqTehsils = reqTehsils.map((item) => {
            return { ...item, name: item.tehsil_name };
        });
        setTehsils(reqTehsils);
    };

    const handleStartedAtChange = (event, selectedDate) => {
        const temp = { ...userData };
        temp.started_on = selectedDate;

        setShow(false);
        setUserData(temp);
    };

    const onMobileChange = (event) => {
        const temp = { ...userData };
        temp.mobile_no = event.nativeEvent.text;
        setUserData(temp);
    };

    const onCountryChange = (value) => {
        const temp = { ...userData };
        temp.country_id = value;
        setUserData(temp);
        getStates(value);
    };
    const onStateChange = (value) => {
        const temp = { ...userData };
        temp.state_id = value;
        console.log({ temp });
        setUserData(temp);
        getDistricts(value);
    };
    const onDistrictChange = (value) => {
        const temp = { ...userData };
        temp.district_id = value;
        console.log({ temp });
        setUserData(temp);
        getTehsils(value);
    };

    const onTehsilChange = (value) => {
        const temp = { ...userData };
        temp.tehsil_id = value;
        setUserData(temp);
    };

    const onAddressChange = (event) => {
        const temp = { ...userData };
        temp.address = event.nativeEvent.text;
        setUserData(temp);
    };

    const onPincodeChange = (event) => {
        const temp = { ...userData };
        temp.pincode = event.nativeEvent.text;
        setUserData(temp);
    };

    const onEmailChange = (event) => {
        const temp = { ...userData };
        temp.email = event.nativeEvent.text;
        setUserData(temp);
    };

    const onLongitudeChange = (event) => {
        const temp = { ...userData };
        temp.longitude = event.nativeEvent.text;
        setUserData(temp);
    };

    const onLatitudeChange = (event) => {
        const temp = { ...userData };
        temp.latitude = event.nativeEvent.text;
        setUserData(temp);
    };

    const handleRegister = async () => {
        let filled = true;
        Object.keys(userData).forEach((element) => {
            if (!userData[element]) {
                console.log({ element });
                filled = false;
            }
        });
        if (!filled) {
            alert("Please fill all the required fields");
            return false;
        }
        const temp = { ...userData };
        temp.started_on = moment(temp.started_on).format("YYYY-MM-DD");
        // temp.state_id = countries[userData.state_id].id;
        // temp.district_id = countries[userData.district_id].district_id;
        // temp.tehsil_id = countries[userData.tehsil_id].tehsil_id;
        const data = serialize(temp);
        console.log({ data });
        const config = {
            method: "post",
            url: "https://drfapi.jagatgururampalji.org/v1/namdan_center/create",
            headers: {
                key: "dsv213a213sfv21123fs31d3fd132c3dv31dsf33",
                Accept: "multipart/form-data",
                "X-CSRF-TOKEN": await AsyncStorage.getItem("token"),
                "Content-Type": "multipart/form-data",
            },
            data,
        };
        // console.log({ config });
        // console.log({userData});

        axios(config)
            .then(() => {
                const temp = {
                    ...showAlert,
                    show: true,
                    title: "Successful",
                    message: "Entry done successfully",
                };
                setShowAlert(temp);
                setUserData(userInitialInfo);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    useEffect(() => {
        (async () => {
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                alert(
                    "Sorry, we need camera roll permissions to make this work!"
                );
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                alert(
                    "Sorry, we need camera roll permissions to make this work!"
                );
            }
        })();
    }, []);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            const temp = {
                ...userData,
                photo: {
                    uri: result.uri,
                    name: result.uri.split("/").pop(),
                    type: "image",
                },
            };
            // setUserData(temp);
        }
    };

    return (
        <ScrollView style={[styles.mainContainer]}>
            <AwesomeAlert
                show={showAlert.show}
                showProgress={false}
                title={showAlert.title}
                message={showAlert.message}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText={showAlert.cancel}
                confirmText={showAlert.confirm}
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => {
                    const temp = { ...showAlert, show: false };
                    setShowAlert(temp);
                }}
                onConfirmPressed={() => {
                    const temp = { ...showAlert, show: false };
                    setShowAlert(temp);
                }}
            />
            <TouchableOpacity onPress={pickImage}>
                {userData.photo?.uri ? (
                    <Image
                        source={{ uri: userData.photo?.uri }}
                        style={styles.image}
                    />
                ) : (
                    <Image
                        source={{ uri: Constants.imagePlaceholder }}
                        style={styles.image}
                    />
                )}
                <Text style={{ textAlign: "center" }}>
                    {Constants.uploadPhoto}
                </Text>
            </TouchableOpacity>

            <InputFieldWithLabel
                label="Name"
                value={userData.name}
                changeFn={onNameChange}
                placeholder="Enter center name"
            />
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={userData.dob ? userData.dob : new Date()}
                    mode={mode}
                    is24Hour
                    display="default"
                    onChange={handleStartedAtChange}
                />
            )}
            <InputFieldWithLabel
                label="DOC"
                isDate
                setShow={setShow}
                onFocus={() => setShow(true)}
                value={userData.started_on}
                placeholder="Date of creation"
            />
            <InputFieldWithLabel
                label="Address"
                value={userData.address}
                changeFn={onAddressChange}
                placeholder="Enter address"
            />
            <DropdownV2
                label="Country"
                value={userData.country_id}
                changeFn={onCountryChange}
                options={countries}
                enabled={false}
            />
            {states.length && userData.country_id ? (
                <DropdownV2
                    label="State"
                    value={userData.state_id}
                    changeFn={onStateChange}
                    options={states}
                    enabled={false}
                />
            ) : null}
            {districts.length && userData.state_id ? (
                <DropdownV2
                    label="District"
                    value={userData.district_id}
                    changeFn={onDistrictChange}
                    options={districts}
                />
            ) : null}
            {tehsils.length && userData.district_id ? (
                <DropdownV2
                    label="Tehsil"
                    value={userData.tehsil_id}
                    changeFn={onTehsilChange}
                    options={tehsils}
                />
            ) : null}
            <InputFieldWithLabel
                label="Pincode"
                value={userData.pincode}
                changeFn={onPincodeChange}
                placeholder="Enter pincode"
            />
            <InputFieldWithLabel
                label="Mobile"
                value={userData.mobile}
                changeFn={onMobileChange}
                placeholder="Enter mobile"
            />
            <InputFieldWithLabel
                label="Email"
                value={userData.email}
                changeFn={onEmailChange}
                placeholder="Enter email"
            />
            <InputFieldWithLabel
                label="Longitude"
                value={userData.longitude}
                changeFn={onLongitudeChange}
                placeholder="Enter Longitude"
            />
            <InputFieldWithLabel
                label="Latitude"
                value={userData.latitude}
                changeFn={onLatitudeChange}
                placeholder="Enter Latitude"
            />
            <View style={styles.buttonContainer}>
                <RoundButton label="Register" handlePress={handleRegister} />
            </View>
        </ScrollView>
    );
}

export default AddNaamdanCenter;
