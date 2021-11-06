import axios from "axios";
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import {
    AsyncStorage,
    Image,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AwesomeAlert from "react-native-awesome-alerts";
import CountryCodePicker from "../components/CountryCodePicker";
import DatePicker from "../components/DatePicker";
import FormTextInput from "../components/FormTextInput";
import FormSelectInput from "../components/FormSelectInput";
import RoundButton from "../components/RoundButton";
import UploadButton from "../components/UploadButton";
import appConfig from "../config";
import Constants from "../constants/text/Signup";
import theme from "../constants/theme";
import styles from "../styles/Singup";
import { NewDiscipleSchema } from "../utilities/Validation";
const calendarIcon = require("../../assets/icons/calenderFilled.png");
const checkIcon = require("../../assets/icons/check-circletick.png");
const crossIcon = require("../../assets/icons/cross.png");
const messageIcon = require("../../assets/icons/messageFilled.png");
const mobileIcon = require("../../assets/icons/mobileFilled.png");
const buildingIcon = require("../../assets/icons/building.png");
const pinIcon = require("../../assets/icons/locationPin.png");
const userIcon = require("../../assets/icons/userFilled.png");

function SignUp({ navigation }) {
    const createId = (length) => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890";
        const pwd = _.sampleSize(chars, length || 12); // lodash v4: use _.sampleSize
        return pwd.join("");
    };

    const formFields = {
        name: "",
        relation: "",
        guardianName: "", // TODO: gurardianName can be changed to guardian_name, validation sequence is not working for guardian_name
        age: "",
        address: "",
        aadhaar_no: "",
        country_id: 0,
        state_id: 0,
        district_id: 0,
        tehsil_id: 0,
        form_no: "",
        form_date: moment(),
        mobile_no: "",
        whatsapp_no: "",
        avatar: "",
        aadhaar_card_back: "",
        aadhaar_card_front: "",
        email: "",
        pincode: "",
        occupation: "",
        dob: moment(),
        namdan_taken: "",
        country_code: "+91",
        whatsapp_country_code: "+91",
    };

    const [indian, setIndian] = useState(false);

    const namdan_takenAt = ["Online", "Naamdan Center"];
    const relations = ["S/O", "D/O", "W/O"];
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [countries, setcountries] = useState([]);
    const [tehsils, setTehsils] = useState([]);
    const [emailError, setEmailError] = useState("");
    const [showAlert, setShowAlert] = useState({
        show: false,
        showCancelButton: false,
        title: "",
        message: "",
        confirm: "Ok",
    });

    const [userData, setUserData] = useState(formFields);
    const [show, setShow] = useState(false);
    const [showFormdate, setShowFormdate] = useState(false);

    const getCountries = async () => {
        const temp = JSON.parse(await AsyncStorage.getItem("countries"));
        setcountries(temp ? temp : []);
    };

    useEffect(() => {
        getCountries();
    }, []);

    useEffect(() => {
        getStates(userData.country_id);
        setUserData({ ...userData, district_id: 0, state_id: 0, tehsil_id: 0 });
    }, [userData.country_id]);

    useEffect(() => {
        getDistricts(userData.state_id);
        setUserData({ ...userData, district_id: 0, tehsil_id: 0 });
    }, [userData.state_id]);

    useEffect(() => {
        getTehsils(userData.district_id);
        setUserData({ ...userData, tehsil_id: 0 });
    }, [userData.district_id]);

    const getStates = async (countryId) => {
        console.log({ countryId });
        if (!countryId) {
            return false;
        }
        const temp = JSON.parse(await AsyncStorage.getItem("states"));
        const reqStates = temp.filter(
            (state) => state.country_id === countryId
        );
        setStates(reqStates);
    };

    const getDistricts = async (stateId) => {
        if (!stateId) {
            return false;
        }
        const temp = JSON.parse(await AsyncStorage.getItem("districts"));
        let reqDistricts = temp.filter(
            (district) => district.state_id === stateId
        );
        reqDistricts = reqDistricts.map((item) => ({
            ...item,
            id: item.district_id,
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
            (tehsil) => tehsil.district_id === districtId
        );

        reqTehsils = reqTehsils.map((item) => ({
            ...item,
            id: item.tehsil_id,
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

    const onChange = (value, key) => {
        setUserData({ ...userData, [key]: value });
    };

    function isValidEmail(email) {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validateEmail = (value) => {
        if (value === "") setEmailError("");
        else if (isValidEmail(value)) setEmailError("");
        else setEmailError("Invalid Email");
    };

    const handleSubmit = async () => {
        try {
            await NewDiscipleSchema.validate(userData, { abortEarly: false });
            handleRegister();
        } catch (err) {
            if (err.name === "ValidationError") {
                alert(err.errors[0]);
            } else {
                console.log(err);
            }
        }
    };

    const handleRegister = async () => {
        const temp = { ...userData, guardian_name: userData.guardianName };
        temp.form_date = userData.form_date.toISOString().split("T")[0];
        temp.dob = userData.dob.toISOString().split("T")[0];
        temp.mobile_no = temp.country_code + temp.mobile_no;
        delete temp.guardianName;
        delete temp.country_code;

        console.log(temp);

        const config = {
            method: "post",
            url: `${appConfig.api_url}/disciple/create`,
            headers: {
                key: "dsv213a213sfv21123fs31d3fd132c3dv31dsf33",
                Accept: "multipart/form-data",
                "X-CSRF-TOKEN": await AsyncStorage.getItem("token"),
            },
            data: temp,
        };

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

    //FIXME: User is able to upload photos even after denying for access.
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

    const onImageChange = async (key) => {
        // FIXME: use image uri instead of base64
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            onChange(result?.base64, key);
        }
    };

    const mobileRef = useRef();
    const whatRef = useRef();
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
            <TouchableOpacity onPress={() => onImageChange("avatar")}>
                {/* FIXME: use image uri instead of base64 */}
                <Image
                    source={{
                        uri: userData?.avatar
                            ? `data:image/png;base64,${userData.avatar}`
                            : Constants.imagePlaceholder,
                    }}
                    style={styles.image}
                />

                <Text
                    style={{
                        textAlign: "center",
                        fontFamily: theme.fonts.poppins.regular,
                    }}
                >
                    {Constants.uploadPhoto}
                </Text>
            </TouchableOpacity>
            <DatePicker
                label="Form Date"
                placeholder="Select Date"
                show={showFormdate}
                setShow={setShowFormdate}
                date={moment(userData.form_date)}
                setDate={(date) => onChange(date, "form_date")}
                maximumDate={new Date()}
                containerStyle={styles.dateContainer}
                required={true}
                appendComponent={
                    <Image source={calendarIcon} style={styles.appendIcon} />
                }
            />
            <FormTextInput
                label="Form No."
                value={userData.form_no}
                placeholder={"Enter Form Number"}
                required={true}
                containerStyle={styles.textFieldContainer}
                onChangeText={(text) => onChange(text, "form_no")}
                appendComponent={
                    <Image
                        source={
                            userData.form_no == ""
                                ? null
                                : userData.form_no?.length < 6
                                ? crossIcon
                                : checkIcon
                        }
                        style={{
                            width: 18,
                            height: 18,
                            tintColor:
                                userData.form_no?.length < 6
                                    ? "red"
                                    : "#83e85a",
                            marginRight: 10,
                        }}
                    />
                }
            />
            <FormTextInput
                label="Aadhar Card No."
                value={userData.aadhaar_no}
                placeholder="Enter 12 digit aadhar number"
                required={true}
                maxLength={12}
                containerStyle={styles.textFieldContainer}
                onChangeText={(text) => onChange(text, "aadhaar_no")}
                keyboardType={
                    Platform.OS === "android" ? "numeric" : "number-pad"
                }
                appendComponent={
                    <Image
                        source={
                            userData.aadhaar_no == ""
                                ? null
                                : userData.aadhaar_no?.length < 12
                                ? crossIcon
                                : checkIcon
                        }
                        style={{
                            width: 18,
                            height: 18,
                            tintColor:
                                userData.aadhaar_no?.length < 12
                                    ? "red"
                                    : "#83e85a",
                            marginRight: 10,
                        }}
                    />
                }
            />
            <FormSelectInput
                label="Naamdan Taken"
                value={userData.namdan_taken}
                onValueChange={(value) => onChange(value, "namdan_taken")}
                options={namdan_takenAt}
                required={true}
                containerStyle={styles.selectFieldContainer}
                placeholder="Select Option"
            />
            <FormTextInput
                label="Name"
                value={userData.name}
                placeholder={"Enter your name"}
                onChangeText={(text) => onChange(text, "name")}
                required={true}
                containerStyle={styles.textFieldContainer}
                appendComponent={
                    <Image source={userIcon} style={styles.appendIcon} />
                }
            />
            <FormSelectInput
                label="Relation"
                value={userData.relation}
                onValueChange={(value) => onChange(value, "relation")}
                options={relations}
                required={true}
                containerStyle={styles.selectFieldContainer}
                placeholder="Select Relation"
            />
            <FormTextInput
                label="Guardian Name"
                value={userData.guardianName}
                placeholder={"Enter your guardianName"}
                required={true}
                containerStyle={styles.textFieldContainer}
                onChangeText={(text) => onChange(text, "guardianName")}
                appendComponent={
                    <Image source={userIcon} style={styles.appendIcon} />
                }
            />
            <FormTextInput
                label="Occupation"
                value={userData.occupation}
                placeholder="Enter Your Occupation"
                required={true}
                containerStyle={styles.textFieldContainer}
                onChangeText={(text) => onChange(text, "occupation")}
            />
            <DatePicker
                label="Date of Birth"
                placeholder="Select Date of birth"
                show={show}
                setShow={setShow}
                date={moment(userData.dob)}
                setDate={(date) => onDobChange(date)}
                maximumDate={new Date()}
                containerStyle={styles.dateContainer}
                required={true}
                appendComponent={
                    <Image source={calendarIcon} style={styles.appendIcon} />
                }
            />
            <FormTextInput
                label="Mobile Number"
                value={userData.mobile_no}
                placeholder={"Enter your mobile number"}
                required={true}
                keyboardType={
                    Platform.OS === "android" ? "numeric" : "number-pad"
                }
                maxLength={10}
                containerStyle={styles.textFieldContainer}
                onChangeText={(text) => onChange(text, "mobile_no")}
                prependComponent={
                    <TouchableOpacity
                        onPress={() => mobileRef?.current.focus()}
                        style={styles.countryCodeBtn}
                    >
                        <Text>{userData.country_code}</Text>
                    </TouchableOpacity>
                }
                appendComponent={
                    <View style={{ flexDirection: "row" }}>
                        <Image
                            source={
                                userData.mobile_no == ""
                                    ? null
                                    : userData.mobile_no?.length < 10
                                    ? crossIcon
                                    : checkIcon
                            }
                            style={{
                                width: 18,
                                height: 18,
                                tintColor:
                                    userData.mobile_no?.length < 10
                                        ? "red"
                                        : "#83e85a",
                                marginRight: 10,
                            }}
                        />
                        <Image
                            source={mobileIcon}
                            style={[styles.appendIcon, { width: 15 }]}
                        />
                    </View>
                }
            />
            <FormTextInput
                label="Whatsapp Number"
                value={userData.whatsapp_no}
                placeholder={"Enter your mobile number"}
                keyboardType={
                    Platform.OS === "android" ? "numeric" : "number-pad"
                }
                maxLength={10}
                containerStyle={styles.textFieldContainer}
                onChangeText={(text) => onChange(text, "whatsapp_no")}
                prependComponent={
                    <TouchableOpacity
                        onPress={() => whatRef?.current.focus()}
                        style={styles.countryCodeBtn}
                    >
                        <Text>{userData.whatsapp_country_code}</Text>
                    </TouchableOpacity>
                }
                appendComponent={
                    <View style={{ flexDirection: "row" }}>
                        <Image
                            source={
                                userData.whatsapp_no == ""
                                    ? null
                                    : userData.whatsapp_no?.length < 10
                                    ? crossIcon
                                    : checkIcon
                            }
                            style={{
                                width: 18,
                                height: 18,
                                tintColor:
                                    userData.whatsapp_no?.length < 10
                                        ? "red"
                                        : "#83e85a",
                                marginRight: 10,
                            }}
                        />
                        <Image
                            source={mobileIcon}
                            style={[styles.appendIcon, { width: 15 }]}
                        />
                    </View>
                }
            />
            <FormSelectInput
                label="Country"
                required={true}
                value={userData.country_id}
                onValueChange={(value) => {
                    onChange(value, "country_id");
                    getStates(value);
                }}
                options={countries}
                containerStyle={styles.selectFieldContainer}
                placeholder="Select Country"
            />
            {states.length && userData.country_id ? (
                <FormSelectInput
                    label="State"
                    required={true}
                    value={userData.state_id}
                    onValueChange={(value) => {
                        onChange(value, "state_id");
                        getDistricts(value);
                    }}
                    options={states}
                    containerStyle={styles.selectFieldContainer}
                    placeholder="Select State"
                />
            ) : null}
            {indian && districts.length && userData.state_id ? (
                <FormSelectInput
                    label="District"
                    required={true}
                    value={userData.district_id}
                    onValueChange={(value) => {
                        onChange(value, "district_id");
                        getTehsils(value);
                    }}
                    options={districts}
                    containerStyle={styles.selectFieldContainer}
                    placeholder="Select District"
                />
            ) : null}
            {indian && tehsils.length && userData.district_id ? (
                <FormSelectInput
                    label="Tehsil"
                    required={true}
                    value={userData.tehsil_id}
                    onValueChange={(value) => {
                        onChange(value, "tehsil_id");
                    }}
                    options={tehsils}
                    containerStyle={styles.selectFieldContainer}
                    placeholder="Select Tehsil"
                />
            ) : null}

            <FormTextInput
                label="Address"
                value={userData.address}
                placeholder="Enter Address"
                required={true}
                containerStyle={styles.textFieldContainer}
                onChangeText={(text) => onChange(text, "address")}
                appendComponent={
                    <Image source={buildingIcon} style={styles.appendIcon} />
                }
            />
            <FormTextInput
                label="Pincode"
                value={userData.pincode}
                placeholder="Enter Pincode"
                required={true}
                containerStyle={styles.textFieldContainer}
                onChangeText={(text) => onChange(text, "pincode")}
                keyboardType={
                    Platform.OS === "android" ? "numeric" : "number-pad"
                }
                appendComponent={
                    <View style={{ flexDirection: "row" }}>
                        <Image
                            source={
                                userData.pincode == ""
                                    ? null
                                    : userData.pincode?.length < 6
                                    ? crossIcon
                                    : checkIcon
                            }
                            style={{
                                width: 18,
                                height: 18,
                                tintColor:
                                    userData.pincode?.length < 6
                                        ? "red"
                                        : "#83e85a",
                                marginRight: 10,
                            }}
                        />
                        <Image source={pinIcon} style={styles.appendIcon} />
                    </View>
                }
            />
            <FormTextInput
                label="Email ID"
                value={userData.email}
                placeholder="Enter Email Address"
                onChangeText={(text) => {
                    validateEmail(text);
                    onChange(text, "email");
                }}
                containerStyle={styles.textFieldContainer}
                containerStyle={styles.textFieldContainer}
                keyboardType={"email-address"}
                appendComponent={
                    <View style={{ flexDirection: "row" }}>
                        <Image
                            source={
                                userData.email == ""
                                    ? null
                                    : userData.email != "" && emailError == ""
                                    ? checkIcon
                                    : crossIcon
                            }
                            style={{
                                width: 18,
                                height: 18,
                                tintColor:
                                    userData.email != "" && emailError == ""
                                        ? "#83e85a"
                                        : "red",
                                marginRight: 10,
                            }}
                        />
                        <Image
                            source={messageIcon}
                            style={[styles.appendIcon, { height: 15 }]}
                        />
                    </View>
                }
            />
            <UploadButton
                label="Upload Aadhar Card (Front)"
                onPressFn={() => onImageChange("aadhaar_card_front")}
            />
            <UploadButton
                label="Upload Aadhar Card (Back)"
                onPressFn={() => onImageChange("aadhaar_card_back")}
            />
            <View style={styles.buttonContainer}>
                <RoundButton label="Register" handlePress={handleSubmit} />
            </View>

            <CountryCodePicker
                ref={mobileRef}
                onValueChange={(value) => onChange(value, "country_code")}
                value={userData.country_code}
            />
            <CountryCodePicker
                ref={whatRef}
                onValueChange={(value) =>
                    onChange(value, "whatsapp_country_code")
                }
                value={userData.whatsapp_country_code}
            />
        </ScrollView>
    );
}

export default SignUp;
