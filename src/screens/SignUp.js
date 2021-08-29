import React, { useState, useEffect } from "react";
import { Text, View, Button, Image, AsyncStorage } from "react-native";
import {
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import AwesomeAlert from "react-native-awesome-alerts";
import axios from "axios";
import DropdownV2 from "../components/DropdownV2";
import Dropdown from "../components/Dropdown";
import InputFieldWithLabel from "../components/InputFieldWithLabel";
import RoundButton from "../components/RoundButton";
import styles from "../styles/Singup";
import Constants from "../constants/text/Signup";
import _, { fill } from "lodash";
import { serialize } from "object-to-formdata";
import appConfig from "../config";
import theme from "../constants/theme";
import { Platform } from "react-native";
import CountryCodes from "../constants/CountryCode.json";

const fieldNames = {
    address: "Address",
    country_id: "Country",
    district_id: "District",
    email: "Email",
    guardian_name: "Guardian Name",
    mobile_no: "Mobile number",
    name: "Name",
    avatar: "Avatar",
    dob: "DOB",
    pincode: "Pincode",
    relation: "Relation",
    state_id: "State",
    tehsil_id: "Tehsil",
    form_id: "Form ID",
    form_no: "Form Number",
    country_code: "Country Code",
    form_date: "Form Date",
    area_type: "Area Type",
    naamdanTaken: "Naamdan taken at",
};

function SignUp({ navigation }) {
    const getRequiredDateFormat = (dateObj) =>
        `${dateObj.getFullYear()}-${
            dateObj.getMonth() - 1
        }-${dateObj.getDate()}`;

    const createId = (length) => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890";
        const pwd = _.sampleSize(chars, length || 12); // lodash v4: use _.sampleSize
        return pwd.join("");
    };

    const formFields = {
        address: "",
        country_id: "",
        district_id: "",
        age: "",
        email: "",
        guardian_name: "",
        mobile_no: "",
        name: "",
        avatar: "",
        dob: "",
        pincode: "",
        relation: "",
        naamdanTaken: "",
        state_id: "",
        tehsil_id: "",
        form_id: createId(14),
        form_no: "",
        country_code: "+91 | IN",
        form_date: getRequiredDateFormat(new Date()),
        area_type: "rural",
    };
    const naamdanTakenAt = ["Online", "Naamdan Center"];
    const relations = ["S/O", "D/O", "NA"];
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
        showCancelButton: false,
        title: "",
        message: "",
        confirm: "Ok",
    });

    const [userData, setUserData] = useState(formFields);
    const [image, setImage] = useState(null);
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    const onNaamdanChange = (value) => {
        const temp = { ...userData };
        temp.naamdanTaken = value;
        setUserData(temp);
    };
    const onCountryCodeChange = (value) => {
        const temp = { ...userData };
        temp.country_code = value;
        setUserData(temp);
    };

    const onNameChange = (event) => {
        const temp = { ...userData };
        temp.name = event.nativeEvent.text;
        setUserData(temp);
    };

    const onFormNoChange = (event) => {
        const temp = { ...userData };
        temp.form_no = event.nativeEvent.text;
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
        console.log({ temp });
        setcountries(temp ? temp : []);
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

    const getStates = async (countryId) => {
        console.log({ countryId });
        if (!countryId) {
            return false;
        }
        const temp = JSON.parse(await AsyncStorage.getItem("states"));
        const reqStates = temp.filter(
            (state) => state.country_id === countries[countryId].id
        );
        console.log("data: ", countries[countryId]);
        setStates(reqStates);
    };

    const getDistricts = async (stateId) => {
        if (!stateId) {
            return false;
        }
        const temp = JSON.parse(await AsyncStorage.getItem("districts"));
        let reqDistricts = temp.filter(
            (district) => district.state_id === states[stateId].id
        );
        reqDistricts = reqDistricts.map((item) => ({
            ...item,
            name: item.district_name,
        }));
        setDistricts(reqDistricts);
    };

    const getTehsils = async (districtId) => {
        if (!districtId) {
            return false;
        }
        const temp = JSON.parse(await AsyncStorage.getItem("tehsils"));
        let reqTehsils = temp.filter(
            (tehsil) => tehsil.district_id === districts[districtId].district_id
        );

        reqTehsils = reqTehsils.map((item) => ({
            ...item,
            name: item.tehsil_name,
        }));
        setTehsils(reqTehsils);
    };

    const onDobChange = (event, selectedDate) => {
        const temp = { ...userData };
        temp.dob = new Date(selectedDate);
        const today = new Date();
        const birthDate = new Date(selectedDate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age -= age;
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

    function validateEmail(email) {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleRegister = async () => {
        let notFilled = false;
        Object.keys(userData).forEach((element) => {
            if (!userData[element]) {
                console.log({ element });
                notFilled = element;
                return;
            }
            if (
                (element === "age" && userData[element] < 3) ||
                (element === "email" && !validateEmail(userData[element]))
            ) {
                notFilled = element;
                return;
            }
        });
        if (notFilled) {
            let alertMessage = `Please fill ${fieldNames[notFilled]}`;
            if (notFilled === "age")
                alertMessage = `Check DOB make sure age is greater than 3 years`;
            if (notFilled === "email")
                alertMessage = `Please enter valid email address`;
            alert(alertMessage);
            return false;
        }
        const temp = { ...userData };
        temp.country_id = countries[userData.country_id].id;
        temp.state_id = states[userData.state_id].id;
        temp.district_id = districts[userData.district_id].district_id;
        temp.tehsil_id = tehsils[userData.tehsil_id].tehsil_id;
        temp.avatar = userData.avatar;
        temp.dob = getRequiredDateFormat(userData.dob);
        temp.mobile_no = temp.country_code.split(" | ")[0] + temp.mobile_no;
        delete temp.country_code
        delete temp.naamdanTaken;
        delete temp.avatar;
        const data = serialize(temp);
        const config = {
            method: "post",
            url: `${appConfig.api_url}/disciple/create`,
            headers: {
                key: "dsv213a213sfv21123fs31d3fd132c3dv31dsf33",
                Accept: "multipart/form-data",
                "X-CSRF-TOKEN": await AsyncStorage.getItem("token"),
            },
            data,
        };
        console.log({ config });

        axios(config)
            .then((response) => {
                console.log(response.data);
                const temp = {
                    ...showAlert,
                    show: true,
                    title: "Successful",
                    message: "Disciple created successfully",
                };
                setShowAlert(temp);
                setUserData(formFields);
                navigation.push("AshramDashboard");
            })
            .catch((error) => {
                if (error && error.response) {
                    console.log(
                        `Signup: ${JSON.stringify(error.response.data)}`
                    );
                } else {
                    console.log(`Signup: ${error}`);
                }
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
                avatar: {
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
                fieldNames
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
                {userData.avatar?.uri ? (
                    <Image
                        source={{ uri: userData.avatar?.uri }}
                        style={styles.image}
                    />
                ) : (
                    <Image
                        source={{ uri: Constants.imagePlaceholder }}
                        style={styles.image}
                    />
                )}
                <Text
                    style={{
                        textAlign: "center",
                        fontFamily: theme.fonts.poppins.regular,
                    }}
                >
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
                value={userData.guardian_name}
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
            <View style={{ flexDirection: "row" }}>
                <View style={{ width: "35%", paddingTop: "1.6%" }}>
                    <Dropdown
                        label="Code"
                        value={userData.country_code}
                        changeFn={onCountryCodeChange}
                        options={CountryCodes.map(
                            (country) =>
                                country.dial_code + " | " + country.code
                        )}
                    />
                </View>
                <InputFieldWithLabel
                    label="Mobile"
                    value={userData.mobile}
                    changeFn={onMobileChange}
                    placeholder="Enter mobile"
                    keyboard={
                        Platform.OS === "android" ? "numeric" : "number-pad"
                    }
                />
            </View>
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
                keyboard={Platform.OS === "android" ? "numeric" : "number-pad"}
            />
            <InputFieldWithLabel
                label="Email"
                value={userData.email}
                changeFn={onEmailChange}
                validateEmail={validateEmail}
                placeholder="Enter email"
            />
            <InputFieldWithLabel
                label="Form Number"
                value={userData.form_no}
                changeFn={onFormNoChange}
                placeholder="Enter Form Number"
            />
            <InputFieldWithLabel
                label="Form ID"
                value={userData.form_id}
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
