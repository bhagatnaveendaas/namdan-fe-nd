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
import moment from "moment";
import theme from "../constants/theme";
import { Platform } from "react-native";
import CountryCodes from "../constants/CountryCode.json";
import UploadButton from "../components/UploadButton";
import DatePicker from "../components/DatePicker";

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
    aadhaar_no: "Aadhar Number",
    occupation: "Your Occupation",
};

function SignUp({ navigation }) {
    const getRequiredDateFormat = (dateObj) =>
        moment(dateObj).format("YYYY-MM-DD");

    const createId = (length) => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890";
        const pwd = _.sampleSize(chars, length || 12); // lodash v4: use _.sampleSize
        return pwd.join("");
    };

    const formFields = {
        name: "",
        relation: "",
        guardian_name: "",
        age: "",
        address: "",
        aadhaar_no: "",
        country_id: "",
        state_id: "",
        district_id: "",
        tehsil_id: "",
        form_no: "",
        form_date: getRequiredDateFormat(new Date()),
        mobile_no: "",
        area_type: "",
        avatar: "image file",

        email: "",
        pincode: "",
        occupation: "",
        dob: new Date(),
        naamdanTaken: "",
        form_id: createId(14),
        country_code: "+91 | IN",
    };
    const naamdanTakenAt = ["Online", "Naamdan Center"];
    const relations = ["S/O", "D/O", "NA"];
    const area_types = ["rural", "urban"];
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
        const temp = JSON.parse(await AsyncStorage.getItem("countries"));
        setcountries(temp ? temp : []);
    };

    useEffect(() => {
        getCountries();
    }, []);

    useEffect(() => {
        const temp = { ...userData };
        temp.state_id = null;
        temp.district_id = null;
        // temp.tehsil_id = null;
        setUserData(temp);
        setDistricts([]);
        setTehsils([]);
    }, [states]);

    useEffect(() => {
        const temp = { ...userData };
        temp.district_id = null;
        // temp.tehsil_id = null;
        setUserData(temp);
        setTehsils([]);
    }, [districts]);

    useEffect(() => {
        const temp = { ...userData };
        // temp.tehsil_id = null;
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

    const onDobChange = (selectedDate) => {
        let Age = moment(new Date(selectedDate)).toNow(true).split(" "); // Age = ["a/number", "days/months/years"]

        if (Age[1] == "years" || Age[1] == "year") {
            const age = Age[0] == "a" ? 1 : Age[0];
            setUserData({ ...userData, dob: selectedDate, age });
        } else {
            setUserData({ ...userData, dob: selectedDate, age: 0 });
        }
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

    const onAreaChange = (value) => {
        const temp = { ...userData };
        temp.area_type = value;
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
    const onAadharChange = (event) => {
        const temp = { ...userData };
        temp.aadhaar_no = event.nativeEvent.text;
        setUserData(temp);
    };

    const onEmailChange = (event) => {
        const temp = { ...userData };
        temp.email = event.nativeEvent.text;
        setUserData(temp);
    };
    const onOccupationChange = (event) => {
        const temp = { ...userData };
        temp.occupation = event.nativeEvent.text;
        setUserData(temp);
    };

    const onChangeText = (text, name) => {
        setUserData({ ...userData, [name]: text });
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
        temp.dob = getRequiredDateFormat(userData.dob);
        temp.mobile_no = temp.country_code.split(" | ")[0] + temp.mobile_no;
        delete temp.country_code;
        delete temp.naamdanTaken;
        delete temp.avatar;

        delete temp.email;
        delete temp.pincode;
        delete temp.occupation;
        delete temp.dob;
        delete temp.form_id;
        const data = serialize(temp);
        console.log(temp);
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
            <Dropdown
                label="Naamdan Taken"
                value={userData.naamdanTaken}
                changeFn={onNaamdanChange}
                options={naamdanTakenAt}
            />
            <InputFieldWithLabel
                label="Name"
                value={userData.name}
                onChangeText={(text) => onChangeText(text, "name")}
                placeholder="Enter Fullname"
                required={true}
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
                placeholder="Enter Guardian Name"
                required={true}
            />
            <InputFieldWithLabel
                label="Occupation"
                value={userData.occupation}
                changeFn={onOccupationChange}
                placeholder="Enter Your Occupation"
                required={true}
            />
            <DatePicker
                label="Date of birth"
                show={show}
                setShow={setShow}
                date={moment(userData.dob)}
                setDate={(date) => onDobChange(date)}
            />
            <View style={{ flexDirection: "row" }}>
                <View style={{ width: "35%", paddingTop: "1.6%" }}>
                    <Dropdown
                        label="Mobile Number"
                        value={userData.country_code}
                        changeFn={onCountryCodeChange}
                        required={true}
                        options={CountryCodes.map(
                            (country) =>
                                country.dial_code + " | " + country.code
                        )}
                    />
                </View>
                <InputFieldWithLabel
                    label=""
                    value={userData.mobile_no}
                    changeFn={onMobileChange}
                    placeholder="Enter Mobile Number"
                    maxLength={10}
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
                placeholder="Enter Address"
                required={true}
            />
            <InputFieldWithLabel
                label="Pincode"
                value={userData.pincode}
                changeFn={onPincodeChange}
                placeholder="Enter Pincode"
                required={true}
                keyboard={Platform.OS === "android" ? "numeric" : "number-pad"}
            />
            <Dropdown
                label="Is the area Rural or Urban?"
                value={userData.area_type}
                changeFn={onAreaChange}
                options={area_types}
            />
            <InputFieldWithLabel
                label="Email"
                value={userData.email}
                changeFn={onEmailChange}
                validateEmail={validateEmail}
                placeholder="Enter Email Address"
                required={true}
            />
            <InputFieldWithLabel
                label="Form Number"
                value={userData.form_no}
                changeFn={onFormNoChange}
                placeholder="Enter Form Number"
                required={true}
            />
            <InputFieldWithLabel
                label="Aadhar Number"
                value={userData.aadhaar_no}
                changeFn={onAadharChange}
                placeholder="Enter 12 digit aadhar number"
                required={true}
                keyboard={Platform.OS === "android" ? "numeric" : "number-pad"}
                maxLength={12}
            />
            <UploadButton
                label="Upload Aadhar Card"
                onPressFn={() => console.log("Pressed")}
            />
            <View style={styles.buttonContainer}>
                <RoundButton label="Register" handlePress={handleRegister} />
            </View>
        </ScrollView>
    );
}

export default SignUp;
