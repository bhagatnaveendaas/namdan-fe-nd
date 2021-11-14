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
    Platform,
    ActivityIndicator,
    ScrollView,
} from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import CountryCodePicker from "../components/CountryCodePicker";
import DatePicker from "../components/DatePicker";
import FormTextInput from "../components/FormTextInput";
import FormSelectInput from "../components/FormSelectInput";
import RoundButton from "../components/RoundButton";
import UploadButton from "../components/UploadButton";
import ImagePicker from "../components/ImagePicker";
import appConfig from "../config";
import Constants from "../constants/text/Signup";
import theme from "../constants/theme";
import styles from "../styles/Singup";
import {
    NewIndianDiscipleSchema,
    NewNonIndianDiscipleSchema,
} from "../utilities/Validation";
import { useAuth } from "../context/AuthContext";
import FormData from "form-data";
import { getData, postJsonData } from "../httpClient/apiRequest";
import SearchableFlatlist from "../components/SearchableFlatlist/SearchableFlatlist";
const calendarIcon = require("../../assets/icons/calenderFilled.png");
const checkIcon = require("../../assets/icons/check-circletick.png");
const crossIcon = require("../../assets/icons/cross.png");
const messageIcon = require("../../assets/icons/messageFilled.png");
const mobileIcon = require("../../assets/icons/mobileFilled.png");
const buildingIcon = require("../../assets/icons/building.png");
const pinIcon = require("../../assets/icons/locationPin.png");
const userIcon = require("../../assets/icons/userFilled.png");

const threeYearsBack = new Date().setDate(new Date().getDate() - 365 * 3 - 1);

const SignUp = ({ navigation }) => {
    const {
        state: { user },
    } = useAuth();

    const formFields = {
        name: "",
        relation: "",
        guardianName: "", // TODO: gurardianName can be changed to guardian_name, validation sequence is not working for guardian_name
        age: "",
        address: "",
        aadhaar_no: "",
        country_id: user?.country || 0,
        state_id: user?.state || 0,
        district_id: user?.district || 0,
        tehsil_id: 0,
        city_id: 0,
        form_no: "",
        form_date: moment(),
        mobile_no: "",
        whatsapp_no: "",
        avatar: "",
        file2: "",
        file1: "",
        email: "",
        pincode: "",
        occupation: "",
        dob: moment(threeYearsBack),
        namdan_taken: "",
        country_code: "+91",
        whatsapp_country_code: "+91",
    };

    const isIndian = user?.country === 2;

    const namdan_takenAt = ["Online", "Naamdan Center"];
    const relations = ["S/O", "D/O", "W/O"];
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [countries, setcountries] = useState([]);
    const [tehsils, setTehsils] = useState([]);
    const [cities, setCities] = useState([]);
    const [emailError, setEmailError] = useState("");
    const [showAlert, setShowAlert] = useState({
        show: false,
        showCancelButton: false,
        title: "",
        message: "",
        confirm: "Ok",
    });
    const [fields, setFields] = useState({
        uniqueNoField: "",
        file1Field: "",
        file2Field: "",
    });
    const getFields = async (countryId) => {
        try {
            const { data } = await getData(`/country_id/${countryId}/id`);
            setFields({
                ...fields,
                uniqueNoField: data?.data.id_name,
                file1Field: data?.data.file1_name,
                file2Field: data?.data.file2_name,
            });
        } catch (error) {
            console.log("error", error);
        }
    };

    const [userData, setUserData] = useState(formFields);

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
        getFields(userData.country_id);
    }, [userData.country_id]);
    useEffect(() => {
        if (!isIndian) {
            getCities(userData.city_id);
            setUserData({ ...userData, district_id: 0, tehsil_id: 0 });
        }
    }, [userData.state_id]);
    useEffect(() => {
        if (isIndian) {
            getDistricts(userData.state_id);
            setUserData({ ...userData, district_id: 0, tehsil_id: 0 });
        }
    }, [userData.state_id]);

    useEffect(() => {
        if (isIndian) {
            getTehsils(userData.district_id);
            setUserData({ ...userData, tehsil_id: 0 });
        }
    }, [userData.district_id]);

    const getCities = async (stateId) => {
        if (!stateId) {
            return false;
        }
        const temp = JSON.parse(await AsyncStorage.getItem("cities"));
        let reqCities = temp.filter((city) => city.state_id === stateId);
        reqCities = reqCities.map((item) => ({
            ...item,
            id: item.city_id,
            name: item.city_name,
        }));
        // console.log(reqCities);
        setCities(reqCities);
    };

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
            if (isIndian) {
                await NewIndianDiscipleSchema.validate(userData, {
                    abortEarly: false,
                });
            } else {
                await NewNonIndianDiscipleSchema.validate(userData, {
                    abortEarly: false,
                });
            }
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
        const dob = userData.dob.toISOString().split("T")[0];
        const form_date = userData.form_date.toISOString().split("T")[0];

        const formData = new FormData();
        formData.append("name", userData.name);
        formData.append("relation", userData.relation);
        formData.append("guardian_name", userData.guardianName);
        formData.append("dob", dob);
        formData.append("address", userData.address);
        formData.append("country_id", userData.country_id);
        formData.append("state_id", userData.state_id);
        if (isIndian) {
            formData.append("district_id", userData.district_id);
            formData.append("tehsil_id", userData.tehsil_id);
        } else {
            formData.append("city_id", userData.city_id);
        }
        formData.append("pincode", userData.pincode);
        formData.append(
            "mobile_no",
            userData.country_code + userData.mobile_no
        );
        formData.append(
            "whatsapp_no",
            userData.whatsapp_country_code + userData.whatsapp_no
        );
        formData.append("form_no", userData.form_no);
        formData.append("form_date", form_date);
        formData.append("occupation", userData.occupation);
        formData.append("namdan_taken", userData.namdan_taken);
        formData.append("email", userData.email);
        formData.append("unique_id", userData.aadhaar_no);
        formData.append("avatar", {
            uri:
                Platform.OS === "android"
                    ? userData.avatar
                    : userData.avatar.replace("file://", ""),
            type: "image/jpeg",
            name: "file1.jpg",
        });
        formData.append("file1", {
            uri:
                Platform.OS === "android"
                    ? userData.file1
                    : userData.file1.replace("file://", ""),
            type: "image/jpeg",
            name: "file1.jpg",
        });
        if (userData.file2 !== "") {
            formData.append("file2", {
                uri:
                    Platform.OS === "android"
                        ? userData.file2
                        : userData.file2.replace("file://", ""),
                type: "image/jpeg",
                name: "file2.jpg",
            });
        }
        console.log(formData);
        const config = {
            method: "post",
            url: `${appConfig.api_url}/disciple/create`,
            headers: {
                key: "dsv213a213sfv21123fs31d3fd132c3dv31dsf33",
                Accept: "multipart/form-data",
                "X-CSRF-TOKEN": await AsyncStorage.getItem("token"),
            },
            data: formData,
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
                    alert(error.response?.data.error);
                } else {
                    console.log(`Signup: ${error}`);
                    alert(error);
                }
            });
    };

    const avatarSheetRef = useRef(null);
    const aadharFrontRef = useRef(null);
    const aadharBackRef = useRef(null);

    const closeAvatarSheet = () => {
        if (avatarSheetRef.current) {
            avatarSheetRef.current.close();
        }
    };
    const closeAadharFrontSheet = () => {
        if (aadharFrontRef.current) {
            aadharFrontRef.current.close();
        }
    };
    const closeAadharBackSheet = () => {
        if (aadharBackRef.current) {
            aadharBackRef.current.close();
        }
    };
    const openAvatarSheet = () => {
        if (avatarSheetRef.current) {
            avatarSheetRef.current.open();
        }
    };
    const openAadharFrontSheet = () => {
        if (aadharFrontRef.current) {
            aadharFrontRef.current.open();
        }
    };
    const openAadharBackSheet = () => {
        if (aadharBackRef.current) {
            aadharBackRef.current.open();
        }
    };

    const onAvatarSelected = (imageData) => {
        closeAvatarSheet();
        const { uri } = imageData;
        setUserData({ ...userData, avatar: uri });
    };

    const onAadhdarFrontSelected = (imageData) => {
        closeAadharFrontSheet();
        const { uri } = imageData;
        setUserData({ ...userData, file1: uri });
    };
    const onAadhdarBackSelected = (imageData) => {
        closeAadharBackSheet();
        const { uri } = imageData;
        setUserData({ ...userData, file2: uri });
    };

    const mobileRef = useRef();
    const whatRef = useRef();

    const [mobileLoading, setmobileLoading] = useState(false);
    const [addharLoading, setaddharLoading] = useState(false);
    const [showRef, setShowRef] = useState(false);
    const [showAadharRef, setShowAadharRef] = useState(false);

    const onFetchingAadhar = async (text) => {
        onChange(text, "aadhaar_no");
        if (text.length == 12) {
            setaddharLoading(true);
            try {
                const { data } = await postJsonData("/disciple/search", {
                    search_by: "unique_id",
                    search_value: text,
                });

                if (data?.data.length > 0) {
                    setShowAadharRef(true);
                } else {
                    setaddharLoading(false);
                }
                setaddharLoading(false);
            } catch (error) {
                setaddharLoading(false);
                console.log("Error", error);
            }
        } else {
            setShowAadharRef(false);
        }
    };
    const onFetchingMobile = async (text) => {
        onChange(text, "mobile_no");
        if (text.length == 10) {
            setmobileLoading(true);
            try {
                const { data } = await postJsonData("/disciple/search", {
                    search_by: "mobile_no",
                    search_value: userData.country_code + text,
                });

                if (data?.data.length > 0) {
                    setShowRef(true);
                } else {
                    setShowRef(false);
                }
                setmobileLoading(false);
            } catch (error) {
                setmobileLoading(false);
                console.log("Error", error);
            }
        } else {
            setShowRef(false);
        }
    };

    const [enableSearch, setEnableSearch] = useState(false);

    return (
        <ScrollView
            style={styles.mainContainer}
            keyboardShouldPersistTaps={enableSearch ? "always" : "never"}
        >
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
            <TouchableOpacity onPress={openAvatarSheet}>
                <Image
                    source={{
                        uri: userData?.avatar
                            ? userData.avatar
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
                label={`${fields.uniqueNoField} Number`}
                value={userData.aadhaar_no}
                placeholder={`Enter your ${fields.uniqueNoField.toLocaleLowerCase()} number`}
                maxLength={12}
                containerStyle={styles.textFieldContainer}
                onChangeText={onFetchingAadhar}
                keyboardType={
                    Platform.OS === "android" ? "numeric" : "number-pad"
                }
                appendComponent={
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        {addharLoading && (
                            <ActivityIndicator
                                animating={addharLoading}
                                style={{ width: 10, height: 10 }}
                                size="small"
                                color={theme.colors.primary}
                            />
                        )}
                        {showAadharRef && (
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("Entry", {
                                            title: "Search",
                                            searchBy: "unique_id",
                                            text: `${userData.aadhaar_no}`,
                                        });
                                    }}
                                    style={{
                                        backgroundColor: "green",
                                        paddingVertical: 2,
                                        paddingHorizontal: 5,
                                        borderRadius: 5,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            color: "white",
                                        }}
                                    >
                                        View Entry
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
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
                                marginLeft: 10,
                            }}
                        />
                    </View>
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
                onChangeText={onFetchingMobile}
                prependComponent={
                    <TouchableOpacity
                        onPress={() => mobileRef?.current.focus()}
                        style={styles.countryCodeBtn}
                    >
                        <Text>{userData.country_code}</Text>
                    </TouchableOpacity>
                }
                appendComponent={
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        {mobileLoading && (
                            <ActivityIndicator
                                animating={mobileLoading}
                                style={{ width: 10, height: 10 }}
                                size="small"
                                color={theme.colors.primary}
                            />
                        )}
                        {showRef && (
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("Entry", {
                                            title: "Search",
                                            searchBy: "mobile_no",
                                            text: `${userData.country_code}${userData.mobile_no}`,
                                        });
                                    }}
                                    style={{
                                        backgroundColor: "green",
                                        paddingVertical: 2,
                                        paddingHorizontal: 5,
                                        borderRadius: 5,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            color: "white",
                                        }}
                                    >
                                        View Entry
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        <Image
                            source={mobileIcon}
                            style={[
                                styles.appendIcon,
                                { width: 15, marginLeft: 10 },
                            ]}
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
                date={moment(userData.dob)}
                setDate={(date) => onDobChange(date)}
                maximumDate={new Date(threeYearsBack)}
                containerStyle={styles.dateContainer}
                required={true}
                appendComponent={
                    <Image source={calendarIcon} style={styles.appendIcon} />
                }
            />
            <SearchableFlatlist
                defaultValue={userData.country_id}
                setEnableSearch={setEnableSearch}
                containerStyle={styles.textFieldContainer}
                label={"Country"}
                placeholderText={"Select Country"}
                data={countries}
                required={true}
                onValueChange={(value) => {
                    onChange(value, "country_id");
                    getStates(value);
                }}
            />
            {states.length && userData.country_id ? (
                <SearchableFlatlist
                    defaultValue={userData.state_id}
                    setEnableSearch={setEnableSearch}
                    containerStyle={styles.textFieldContainer}
                    label={"State"}
                    placeholderText={"Select State"}
                    data={states}
                    required={true}
                    onValueChange={(value) => {
                        onChange(value, "state_id");
                        if (isIndian) {
                            getDistricts(value);
                        } else {
                            getCities(value);
                        }
                    }}
                />
            ) : null}
            {!isIndian && cities.length && userData.state_id ? (
                <SearchableFlatlist
                    defaultValue={userData.city_id}
                    setEnableSearch={setEnableSearch}
                    label="City"
                    required={true}
                    onValueChange={(value) => {
                        onChange(value, "city_id");
                    }}
                    data={cities}
                    containerStyle={styles.textFieldContainer}
                    placeholderText="Select City"
                />
            ) : null}
            {isIndian && districts.length && userData.state_id ? (
                <SearchableFlatlist
                    defaultValue={userData.district_id}
                    setEnableSearch={setEnableSearch}
                    label="District"
                    required={true}
                    onValueChange={(value) => {
                        onChange(value, "district_id");
                        getTehsils(value);
                    }}
                    data={districts}
                    containerStyle={styles.textFieldContainer}
                    placeholderText="Select District"
                />
            ) : null}
            {isIndian && tehsils.length && userData.district_id ? (
                <SearchableFlatlist
                    defaultValue={userData.tehsil_id}
                    setEnableSearch={setEnableSearch}
                    label="Tehsil"
                    onValueChange={(value) => {
                        onChange(value, "tehsil_id");
                    }}
                    data={tehsils}
                    containerStyle={styles.textFieldContainer}
                    placeholderText="Select Tehsil"
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
                label={
                    userData.file1 == ""
                        ? `Upload ${fields.file1Field}`
                        : `Uploaded ${fields.file1Field}`
                }
                tintColor={userData.file1 == "" ? "" : "#83e85a"}
                icon={userData.file1 == "" ? "" : checkIcon}
                onPressFn={openAadharFrontSheet}
            />
            {fields.file2Field !== "" && (
                <UploadButton
                    label={
                        userData.file2 == ""
                            ? `Upload ${fields.file2Field}`
                            : `Uploaded ${fields.file2Field}`
                    }
                    tintColor={userData.file2 == "" ? "" : "#83e85a"}
                    icon={userData.file2 == "" ? "" : checkIcon}
                    onPressFn={openAadharBackSheet}
                />
            )}
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
            <ImagePicker
                ref={avatarSheetRef}
                onImageSelected={onAvatarSelected}
                onClose={closeAvatarSheet}
            />
            <ImagePicker
                ref={aadharFrontRef}
                onImageSelected={onAadhdarFrontSelected}
                onClose={closeAadharFrontSheet}
            />
            <ImagePicker
                ref={aadharBackRef}
                onImageSelected={onAadhdarBackSelected}
                onClose={closeAadharBackSheet}
            />
        </ScrollView>
    );
};

export default SignUp;
