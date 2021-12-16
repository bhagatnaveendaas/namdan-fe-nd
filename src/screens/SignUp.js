import axios from "axios";
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
import CountryCodePicker from "../components/CountryCodePicker";
import DatePicker from "../components/DatePicker";
import FormTextInput from "../components/FormTextInput";
import FormSelectInput from "../components/FormSelectInput";
import UploadButton from "../components/UploadButton";
import ImagePicker from "../components/ImagePicker";
import Success from "../components/Alert/Success";
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
import { searchDiscipleUrl } from "../constants/routes";
const calendarIcon = require("../../assets/icons/calenderFilled.png");
const checkIcon = require("../../assets/icons/check-circletick.png");
const crossIcon = require("../../assets/icons/cross.png");
const messageIcon = require("../../assets/icons/messageFilled.png");
const mobileIcon = require("../../assets/icons/mobileFilled.png");
const buildingIcon = require("../../assets/icons/building.png");
const pinIcon = require("../../assets/icons/locationPin.png");
const userIcon = require("../../assets/icons/userFilled.png");
import { consentOtpUrl } from "../constants/routes";
import Timer from "../components/Timer";

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
        city_id: user?.city || 0,
        form_no: "",
        form_date: moment().format("YYYY-MM-DD"),
        mobile_no: "",
        whatsapp_no: "",
        avatar: "",
        email: "",
        pincode: "",
        occupation: "",
        dob: "",
        namdan_taken: "",
        country_code: "+91",
        whatsapp_country_code: "+91",
        tehsil_name1: "",
        otherOccupation: "",
    };

    const isIndian = user?.country === 2;
    const scrollRef = useRef();
    const [namdan_takenAt, setNamedanTakenAt] = useState([]);
    const [relations, setRelations] = useState([]);
    const [occupations, setOccupations] = useState([]);
    const [isDisable, setIsDisable] = useState(false);
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState("");
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [countries, setcountries] = useState([]);
    const [tehsils, setTehsils] = useState([]);
    const [cities, setCities] = useState([]);
    const [emailError, setEmailError] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [tehsilOther, setTehsilOther] = useState(false);
    const [pic, setPic] = useState(null);
    const [fields, setFields] = useState({
        uniqueNoField: "",
        file1Field: "",
        file2Field: "",
    });
    const other = {
        id: -1,
        name: "Other",
    };
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

    const getRelationOption = async () => {
        try {
            const { data } = await getData("/misc/list?slug=relation");
            if (data.success) {
                const temp = [...data?.data].map((item) => item.name);
                setRelations(temp);
            }
        } catch (error) {
            console.log("error", error);
        }
    };
    const getNaamDanTakenOption = async () => {
        try {
            const { data } = await getData("/misc/list?slug=namdan_taken");
            if (data.success) {
                const temp = [...data?.data].map((item) => item.name);
                setNamedanTakenAt(temp);
            }
        } catch (error) {
            console.log("error", error);
        }
    };
    const getOccupationOption = async () => {
        try {
            const { data } = await getData("/misc/list?slug=occupation");
            if (data.success) {
                const temp = [...data?.data].map((item) => item.name);
                setOccupations(temp);
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    const getCountries = async () => {
        const { data } = await getData("/country/list?page=1&limit=1000");
        const temp = data?.data.countries;
        setcountries(temp ? temp : []);
    };

    useEffect(() => {
        getCountries();
        getNaamDanTakenOption();
        getRelationOption();
        getOccupationOption();
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
            getCities(userData.state_id);
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
        try {
            const { data } = await getData(`state/${stateId}/city`);
            const reqCities = data?.data;
            setCities(reqCities);
        } catch (error) {
            console.error(error.message);
            console.log(`Unable to fectch cities for stateId = ${stateId}`);
        }
    };

    const getStates = async (countryId) => {
        if (!countryId) {
            return false;
        }
        try {
            const { data } = await getData(`country/${countryId}/state`);
            const reqStates = data?.data;
            setStates(reqStates);
        } catch (error) {
            console.error(error.message);
            console.log(`Unable to fectch states for countryId = ${countryId}`);
        }
    };

    const getDistricts = async (stateId) => {
        if (!stateId) {
            return false;
        }
        try {
            const { data } = await getData(`state/${stateId}/district`);
            let reqDistricts = data?.data;
            setDistricts(reqDistricts);
        } catch (error) {
            console.error(error.message);
            console.log(`Unable to fectch districts for stateId = ${stateId}`);
        }
    };

    const getTehsils = async (districtId) => {
        if (!districtId) {
            return false;
        }
        try {
            const { data } = await getData(`district/${districtId}/tehsil`);
            let reqTehsils = data?.data;
            setTehsils(reqTehsils);
        } catch (error) {
            console.error(error.message);
            console.log(
                `Unable to fectch tehsil for districtId = ${districtId}`
            );
        }
    };

    const requestOtp = async () => {
        if (userData.mobile_no === "" || userData.mobile_no.length < 10) {
            alert("Please enter your valid mobile number.");
            return;
        }
        try {
            const { data } = await postJsonData(consentOtpUrl, {
                mobile_no: userData?.country_code + userData?.mobile_no,
                country_id: (user?.country).toString(),
            });
            console.log("data", data);
            if (data?.success) {
                setShowOtp(true);
            }
        } catch (error) {
            if (error && error.response) {
                console.log(`Signup: ${JSON.stringify(error.response.data)}`);
                alert(error.response?.data.error);
            } else {
                console.log(`Signup: ${error}`);
                // alert(error);
            }
        }
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
    const scrollToTop = () => {
        scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        });
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
            if (otp === "") {
                alert("Please enter OTP.");
                return;
            } else if (otp.length < 6) {
                alert("Otp must be 6 characters long.");
                return;
            }
            await handleRegister();
        } catch (err) {
            if (err.name === "ValidationError") {
                alert(err.errors[0]);
            } else {
                console.log(err);
            }
        }
    };

    const handleRegister = async () => {
        const formData = new FormData();
        formData.append("name", userData.name);
        formData.append("relation", userData.relation);
        formData.append("guardian_name", userData.guardianName);
        formData.append("dob", userData.dob);
        formData.append("address", userData.address);
        formData.append("country_id", userData.country_id);
        formData.append("state_id", userData.state_id);
        if (isIndian) {
            formData.append("district_id", userData.district_id);

            if (userData.tehsil_id > 0) {
                formData.append("tehsil_id", userData.tehsil_id);
            } else {
                formData.append("tehsil_name", userData.tehsil_name1);
            }
        } else {
            formData.append("city_id", userData.city_id);
        }
        formData.append("pincode", userData.pincode);
        formData.append(
            "mobile_no",
            userData.country_code + userData.mobile_no
        );
        if (userData.whatsapp_no !== "" && userData.whatsapp_no >= 10) {
            formData.append(
                "whatsapp_no",
                userData.whatsapp_country_code + userData.whatsapp_no
            );
        }
        if (userData.form_no !== "") {
            formData.append("form_no", userData.form_no);
        }
        formData.append("form_date", userData.form_date);
        if (userData.occupation === "Other") {
            formData.append("occupation", userData.otherOccupation);
        } else {
            formData.append("occupation", userData.occupation);
        }
        formData.append("namdan_taken", userData.namdan_taken);
        formData.append("email", userData.email);
        if (userData.aadhaar_no !== "" && userData.aadhaar_no.length >= 12) {
            formData.append("unique_id", userData.aadhaar_no);
        }

        formData.append("consent_otp", otp);
        formData.append("avatar", {
            uri:
                Platform.OS === "android"
                    ? userData.avatar
                    : userData.avatar.replace("file://", ""),
            type: "image/jpeg",
            name: pic,
        });

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
        setIsDisable(true);

        console.log(formData);
        axios(config)
            .then((response) => {
                setUserData(formFields);
                setUserData({ ...userData, form_date: "" });
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                    setIsDisable(false);
                    navigation.navigate("AshramDashboard");
                }, 1500);
            })
            .catch((error) => {
                setIsDisable(false);
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

    const closeAvatarSheet = () => {
        if (avatarSheetRef.current) {
            avatarSheetRef.current.close();
        }
    };

    const openAvatarSheet = () => {
        if (avatarSheetRef.current) {
            avatarSheetRef.current.open();
        }
    };
    const onAvatarSelected = (imageData) => {
        closeAvatarSheet();
        const { uri, fileName } = imageData;
        setUserData({ ...userData, avatar: uri });
        setPic(fileName);
    };

    const mobileRef = useRef();
    const whatRef = useRef();

    const [mobileLoading, setmobileLoading] = useState(false);
    const [whatsappLoading, setwhatsappLoading] = useState(false);
    const [addharLoading, setaddharLoading] = useState(false);
    const [showRef, setShowRef] = useState(false);
    const [showWhatsappRef, setShowWhatsappRef] = useState(false);
    const [showAadharRef, setShowAadharRef] = useState(false);

    const onFetchingAadhar = async (text) => {
        onChange(text, "aadhaar_no");
        if (text.length == 12) {
            setaddharLoading(true);
            try {
                const { data } = await postJsonData(searchDiscipleUrl(1), {
                    search_by: "unique_id",
                    search_value: text,
                    country_id: user.country,
                });
                if (data?.data.disciples.length > 0) {
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
    const onFetchingWhatsapp = async (text) => {
        onChange(text, "whatsapp_no");
        if (text.length === 10) {
            setwhatsappLoading(true);
            try {
                const { data } = await postJsonData(searchDiscipleUrl(1), {
                    search_by: "mobile_no",
                    search_value: userData.whatsapp_country_code + text,
                    country_id: user.country,
                });

                if (data?.data.disciples.length > 0) {
                    setShowWhatsappRef(true);
                } else {
                    setShowWhatsappRef(false);
                }
                setwhatsappLoading(false);
            } catch (error) {
                setwhatsappLoading(false);
                console.log("Error", error);
            }
        } else {
            setShowWhatsappRef(false);
        }
    };
    const onFetchingMobile = async (text) => {
        onChange(text, "mobile_no");
        if (text.length == 10) {
            setmobileLoading(true);
            try {
                const { data } = await postJsonData(searchDiscipleUrl(1), {
                    search_by: "mobile_no",
                    search_value: userData.country_code + text,
                    country_id: user.country,
                });
                if (data?.data.disciples.length > 0) {
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
            ref={scrollRef}
            style={styles.mainContainer}
            keyboardShouldPersistTaps={enableSearch ? "always" : "never"}
        >
            <Success
                message={"Entry Added Successfully!"}
                visible={showAlert}
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
                    allowFontScaling={false}
                    style={{
                        textAlign: "center",
                        fontFamily: theme.fonts.poppins.regular,
                    }}
                >
                    {Constants.uploadPhoto + " / फोटो अपलोड करें"}
                </Text>
            </TouchableOpacity>
            <DatePicker
                label="Form Date / फॉर्म दिनांक"
                placeholder="Select Date"
                date={userData.form_date}
                value={moment()}
                setDate={(date) => onChange(date, "form_date")}
                maximumDate={new Date()}
                containerStyle={styles.dateContainer}
                required={true}
                appendComponent={
                    <Image source={calendarIcon} style={styles.appendIcon} />
                }
            />

            <FormTextInput
                label="Form No. / फॉर्म नंबर"
                value={userData.form_no}
                placeholder={"Enter Form Number"}
                containerStyle={styles.textFieldContainer}
                onChangeText={(text) => onChange(text, "form_no")}
            />
            <FormTextInput
                label={`${fields.uniqueNoField} Number / यूनिक आईडी नंबर`}
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
                                            title: "Available",
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
                                        allowFontScaling={false}
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
                label="Mobile Number / मोबाइल नंबर"
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
                                            title: "Available",
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
                                        allowFontScaling={false}
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
                label="Whatsapp Number / व्हाट्सएप नंबर"
                value={userData.whatsapp_no}
                placeholder={"Enter your whatsapp number"}
                keyboardType={
                    Platform.OS === "android" ? "numeric" : "number-pad"
                }
                maxLength={10}
                containerStyle={styles.textFieldContainer}
                onChangeText={onFetchingWhatsapp}
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
                        {whatsappLoading && (
                            <ActivityIndicator
                                animating={whatsappLoading}
                                style={{ width: 10, height: 10 }}
                                size="small"
                                color={theme.colors.primary}
                            />
                        )}
                        {showWhatsappRef && (
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("Entry", {
                                            title: "Available",
                                            searchBy: "mobile_no",
                                            text: `${userData.whatsapp_country_code}${userData.whatsapp_no}`,
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
                                        allowFontScaling={false}
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
            <FormSelectInput
                label="Namdan Taken / नामदान लिया"
                value={userData.namdan_taken}
                onValueChange={(value) => onChange(value, "namdan_taken")}
                options={namdan_takenAt}
                required={true}
                containerStyle={styles.selectFieldContainer}
                placeholder="Select Option"
            />
            <FormTextInput
                label="Name / नाम"
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
                label="Relation / रिश्ता"
                value={userData.relation}
                onValueChange={(value) => onChange(value, "relation")}
                options={relations}
                required={true}
                containerStyle={styles.selectFieldContainer}
                placeholder="Select Relation"
            />
            <FormTextInput
                label="Guardian Name / अभिभावक का नाम"
                value={userData.guardianName}
                placeholder={"Enter your guardianName"}
                required={true}
                containerStyle={styles.textFieldContainer}
                onChangeText={(text) => onChange(text, "guardianName")}
                appendComponent={
                    <Image source={userIcon} style={styles.appendIcon} />
                }
            />
            <SearchableFlatlist
                defaultValue={userData.occupation}
                setEnableSearch={setEnableSearch}
                containerStyle={styles.textFieldContainer}
                label={"Occupation / पेशा"}
                placeholderText={"Select Occupation"}
                data={occupations}
                required={true}
                onValueChange={(value) => {
                    onChange(value, "occupation");
                    // getStates(value);
                }}
            />
            {userData.occupation === "Other" && (
                <FormTextInput
                    label="Other Occupation / अन्य पेशा"
                    autoFocus={true}
                    value={userData.otherOccupation}
                    placeholder={"Enter your other occupation"}
                    required={true}
                    containerStyle={styles.textFieldContainer}
                    onChangeText={(text) => onChange(text, "otherOccupation")}
                />
            )}
            <DatePicker
                label="Date of Birth / जन्म तारीख"
                placeholder="Select Date of birth"
                date={userData.dob}
                value={moment(userData.form_date, "YYYY-MM-DD").subtract(
                    3,
                    "years"
                )}
                setDate={(date) => onDobChange(date)}
                maximumDate={
                    new Date(
                        moment(userData.form_date, "YYYY-MM-DD").subtract(
                            3,
                            "years"
                        )
                    )
                }
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
                label={"Country / देश"}
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
                    label={"State / राज्य"}
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
                    label="City / शहर"
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
                    label="District / ज़िला"
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
                    label="Tehsil / तहसील"
                    onValueChange={(value) => {
                        onChange(value, "tehsil_id");
                    }}
                    required={true}
                    data={[other, ...tehsils]}
                    containerStyle={styles.textFieldContainer}
                    placeholderText="Select Tehsil"
                    setOtherSelected={setTehsilOther}
                />
            ) : null}
            {userData?.tehsil_id === -1 ? (
                <FormTextInput
                    label="Other Tehsil / अन्य तहसील"
                    value={userData?.tehsil_name1}
                    required={true}
                    placeholder="Enter Tehsil Name"
                    containerStyle={styles.textFieldContainer}
                    onChangeText={(text) => onChange(text, "tehsil_name1")}
                />
            ) : null}
            <FormTextInput
                label="Address / पता"
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
                label="Pincode / पिन कोड"
                value={userData.pincode}
                placeholder="Enter Pincode"
                required={true}
                maxLength={6}
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
                label="Email ID / ईमेल आईडी"
                value={userData.email}
                placeholder="Enter Email Address"
                onChangeText={(text) => {
                    validateEmail(text);
                    onChange(text, "email");
                }}
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

            {!showOtp ? (
                <TouchableOpacity onPress={requestOtp} style={styles.button}>
                    <Text allowFontScaling={false} style={styles.buttonText}>
                        Get OTP
                    </Text>
                </TouchableOpacity>
            ) : (
                <>
                    <FormTextInput
                        value={otp}
                        onChangeText={(value) => setOtp(value)}
                        placeholder={"Enter the otp we just sent you."}
                        containerStyle={styles.textFieldContainer}
                        label={"One Time Password"}
                        maxLength={6}
                        keyboardType={"numeric"}
                        appendComponent={
                            <Timer
                                color={"blue"}
                                start={showOtp}
                                time={60}
                                onPress={requestOtp}
                            />
                        }
                    />
                </>
            )}
            <TouchableOpacity
                onPress={handleSubmit}
                disabled={isDisable}
                style={[
                    styles.button,
                    { marginBottom: 30 },
                    {
                        backgroundColor: isDisable
                            ? "lightgray"
                            : theme.colors.primary,
                    },
                ]}
            >
                <Text allowFontScaling={false} style={styles.buttonText}>
                    Submit
                </Text>
            </TouchableOpacity>

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
        </ScrollView>
    );
};

export default SignUp;
