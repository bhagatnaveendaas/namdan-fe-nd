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

function SignUp() {
    const naamdanTakenAt = ["Online", "Naamdan Center"];
    const relations = ["S/O", "D/O"];
    // const countries = ['India', 'Pakistan', 'Nepal'];
    // const states = ['Maharashtra', 'Haryana'];
    // const districts = ['Pune', 'Mumbai'];
    // const tehsils = ['Haveli', 'Pune City'];
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
    const createId = (length) => {
        var chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890";
        var pwd = _.sampleSize(chars, length || 12); // lodash v4: use _.sampleSize
        return pwd.join("");
    };

    const [userData, setUserData] = useState({
        address: "",
        country_id: 2,
        district_id: "",
        age: "",
        email: "",
        guardian_name: "",
        mobile_no: "",
        name: "",
        photo: "",
        dob: "",
        pincode: "",
        relation: "",
        state_id: "",
        tehsil_id: "",
        form_no: createId(14),
        form_date: new Date(),
        area_type: "rural",
    });
    const [image, setImage] = useState(null);
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);

    const onNaamdanChange = (value) => {
        const temp = { ...userData };
        temp.naamdanTaken = value;
        setUserData(temp);
    };

    const onNameChange = (event) => {
        const temp = { ...userData };
        temp.name = event.nativeEvent.text;
        setUserData(temp);
    };
    const onRelationChange = (value, index) => {
        const temp = { ...userData };
        temp.relation = value;
        setUserData(temp);
    };

    const onGuardianNameChange = (event) => {
        const temp = { ...userData };
        temp.guardian_name = event.nativeEvent.text;
        setUserData(temp);
    };

    const getCountries = async () => {
        console.log("Callled");
        const temp = JSON.parse(await AsyncStorage.getItem("countries"));
        console.log({temp});
        setcountries(temp?temp:[]);
    };

    useEffect(() => {
        getCountries();
        console.log({ countries });
    }, []);

    useEffect(() => {
        const temp = { ...userData };
        temp.state_id = null;
        temp.district_id = null;
        temp.tehsil_id = null;
        setUserData(temp);
        setDistricts([]);
        setTehsils([]);
    }, [states]);

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

    const getStates = async (country_id) => {
        const temp = JSON.parse(await AsyncStorage.getItem("states"));
        const reqStates = temp.filter(
            (state) => state.country_id == countries[country_id].id
        );
        setStates(reqStates);
    };

    const getDistricts = async (state_id) => {
        const temp = JSON.parse(await AsyncStorage.getItem("districts"));
        let reqDistricts = temp.filter(
            (district) => district.state_id == states[state_id].id
        );
        reqDistricts = reqDistricts.map((item) => {
            return { ...item, name: item.district_name };
        });
        setDistricts(reqDistricts);
    };

    const getTehsils = async (district_id) => {
        const temp = JSON.parse(await AsyncStorage.getItem("tehsils"));
        let reqTehsils = temp.filter(
            (tehsil) => tehsil.district_id == districts[district_id].district_id
        );

        reqTehsils = reqTehsils.map((item) => {
            return { ...item, name: item.tehsil_name };
        });
        setTehsils(reqTehsils);
    };

    const onDobChange = (event, selectedDate) => {
        let temp = { ...userData };
        temp.dob = selectedDate;
        const today = new Date();
        const birthDate = new Date(selectedDate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        temp.age = age;
        console.log({ age });
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
        setUserData(temp);
        getDistricts(value);
    };
    const onDistrictChange = (value) => {
        const temp = { ...userData };
        temp.district_id = value;
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
        temp.country_id = countries[userData.country_id].id;
        temp.state_id = countries[userData.state_id].id;
        temp.district_id = countries[userData.district_id].district_id;
        temp.tehsil_id = countries[userData.tehsil_id].tehsil_id;
        const data = serialize(temp);
        console.log({ data });
        const config = {
            method: "post",
            url: "https://drfapi.jagatgururampalji.org/v1/disciple/create",
            headers: {
                key: "dsv213a213sfv21123fs31d3fd132c3dv31dsf33",
                Accept: "multipart/form-data",
                "X-CSRF-TOKEN": await AsyncStorage.getItem("token"),
            },
            data: data,
        };
        console.log({ config });

        axios(config)
            .then(function (response) {
                console.log(response.data);
                const temp = {
                    ...showAlert,
                    show: true,
                    title: "Successful",
                    message: "Entry done successfully",
                };
                setShowAlert(temp);
                return;
            })
            .catch(function (error) {
                console.log(error);
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
            setUserData(temp);
        }
    };

    return (
        <ScrollView style={styles.mainContainer}>
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

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={userData.dob ? userData.dob : new Date()}
                    mode={mode}
                    is24Hour
                    display="default"
                    onChange={onDobChange}
                />
            )}
            <InputFieldWithLabel
                label="Name"
                value={userData.name}
                changeFn={onNameChange}
                placeholder="Enter name"
            />
            <Dropdown
                label="Naamdan Taken"
                value={userData.naamdanTaken}
                changeFn={onNaamdanChange}
                options={naamdanTakenAt}
            />
            <Dropdown
                label="Relation"
                value={userData.relation}
                changeFn={onRelationChange}
                options={relations}
            />
            <InputFieldWithLabel
                label="Guardian Name"
                value={userData.guardianName}
                changeFn={onGuardianNameChange}
                placeholder="Enter guardian name"
            />
            <InputFieldWithLabel
                label="Dob"
                isDate
                setShow={setShow}
                onFocus={() => setShow(true)}
                value={userData.dob}
                changeFn={onDobChange}
                placeholder="Enter DOB"
            />
            <InputFieldWithLabel
                label="Mobile"
                value={userData.mobile}
                changeFn={onMobileChange}
                placeholder="Enter mobile"
            />
            <DropdownV2
                label="Country"
                value={userData.country_id}
                changeFn={onCountryChange}
                options={countries}
            />
            {states.length && userData.country_id ? (
                <DropdownV2
                    label="State"
                    value={userData.state_id}
                    changeFn={onStateChange}
                    options={states}
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
                label="Address"
                value={userData.address}
                changeFn={onAddressChange}
                placeholder="Enter address"
            />
            <InputFieldWithLabel
                label="Pincode"
                value={userData.pincode}
                changeFn={onPincodeChange}
                placeholder="Enter pincode"
            />
            <InputFieldWithLabel
                label="Email"
                value={userData.email}
                changeFn={onEmailChange}
                placeholder="Enter email"
            />
            <InputFieldWithLabel
                label="Form ID"
                value={userData.form_no}
                // changeFn={onPhotoChange}
                placeholder="Form ID"
                disabled={true}
            />

            <View style={styles.buttonContainer}>
                <RoundButton label="Register" handlePress={handleRegister} />
            </View>
        </ScrollView>
    );
}

export default SignUp;
