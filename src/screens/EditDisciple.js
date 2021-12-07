import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState, useCallbak } from "react";
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
import {
    editHajriUrl,
    editPunarUpdeshUrl,
    editSarnamUrl,
    editSarshabdUrl,
    editSatnamExamUrl,
    editSatnamUrl,
    editShuddhikaranUrl,
    getUniqueDispleUrl,
} from "../constants/routes";
import CountryCodePicker from "../components/CountryCodePicker";
import DatePicker from "../components/DatePicker";
import FormTextInput from "../components/FormTextInput";
import FormSelectInput from "../components/FormSelectInput";
import UploadButton from "../components/UploadButton";
import ImagePicker from "../components/ImagePicker";
import Success from "../components/Alert/Success";
import SelfDisableButton from "../components/SelfDisableButton";
import appConfig from "../config";
import Constants from "../constants/text/Signup";
import theme from "../constants/theme";
import styles from "../styles/Singup";
import {
    NewIndianDiscipleSchema,
    NewNonIndianDiscipleSchema,
} from "../utilities/Validation";
import FormData from "form-data";
import { getData, postJsonData, putJsonData } from "../httpClient/apiRequest";
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
import { useAuth } from "../context/AuthContext";
import { withDetailContext } from "../context/DetailContex";
import { FONTS } from "../constants/fonts";

const EditDateButton = ({ label, value, onPress }) => {
    let date = moment(value, "YYYY-MM-DD").format("DD-MM-YYYY");
    return (
        <TouchableOpacity
            style={{
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
                flexDirection: "row",
                marginBottom: 10,
                backgroundColor: theme.colors.lightGray,
                borderRadius: 20,
                paddingHorizontal: 22,
            }}
            onPress={onPress}
        >
            <Text
                allowFontScaling={false}
                style={{
                    ...FONTS.h4,
                    color: theme.colors.primary,
                }}
            >
                {label}
            </Text>
            <Text
                allowFontScaling={false}
                style={{
                    ...FONTS.body4,
                    color: theme.colors.primary,
                }}
            >
                {date}
            </Text>
        </TouchableOpacity>
    );
};

const threeYearsBack = new Date().setDate(new Date().getDate() - 365 * 3 - 1);
const EditDisciple = ({ navigation, route, ...props }) => {
    const user = route.params?.user;
    const { state } = useAuth();
    const authUser = state.user;

    const {
        state: { detail },
        dispatch,
    } = props.global;

    const formFields = {
        unique_id: detail?.unique_id || "",
        otherOccupation: detail.occupation,
        ...detail,
        tehsil_name: detail.tehsil_name === null ? "" : detail.tehsil_name,
        tehsil_id: detail.tehsil_id === null ? -1 : detail.tehsil_id,
        mobile_no:
            detail?.mobile_no.substr(detail?.mobile_no.length - 10) || "",
        whatsapp_no:
            detail?.whatsapp_no.substr(detail?.whatsapp_no.length - 10) || "",
        whatsapp_country_code: detail?.whatsapp_country_code || "+91",
        guardianName: detail?.guardian_name,
        country_code: detail?.country_code || "+91",
    };
    const isIndian = authUser?.country === 2;
    const scrollRef = useRef();
    const [namdan_takenAt, setNamedanTakenAt] = useState([]);
    const [relations, setRelations] = useState([]);
    const [occupations, setOccupations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const [disableScreen, setDisableScreen] = useState(false);
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [countries, setcountries] = useState([]);
    const [tehsils, setTehsils] = useState([]);
    const [cities, setCities] = useState([]);
    const [emailError, setEmailError] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [pic, setPic] = useState(null);
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
        const { data } = await getData("/country/list?page=1&limit=1000");
        const temp = data?.data.countries;
        setcountries(temp ? temp : []);
    };

    const getRelationOption = async () => {
        setLoading(true);
        try {
            const { data } = await getData("/misc/list?slug=relation");
            if (data.success) {
                const temp = [...data?.data].map((item) => item.name);
                setRelations(temp);
            }
        } catch (error) {
            console.log("error", error);
        }
        setLoading(false);
    };
    const getNaamDanTakenOption = async () => {
        setLoading(true);
        try {
            const { data } = await getData("/misc/list?slug=namdan_taken");
            if (data.success) {
                const temp = [...data?.data].map((item) => item.name);
                setNamedanTakenAt(temp);
            }
        } catch (error) {
            console.log("error", error);
        }
        setLoading(false);
    };
    const getOccupationOption = async () => {
        setLoading(true);
        try {
            const { data } = await getData("/misc/list?slug=occupation");
            if (data.success) {
                const temp = [...data?.data].map((item) => item.name);
                if (temp.includes(detail.occupation)) {
                    setUserData({
                        ...userData,
                        occupation: detail.occupation,
                        otherOccupation: "",
                    });
                } else {
                    setUserData({
                        ...userData,
                        occupation: "Other",
                        otherOccupation: detail.occupation,
                    });
                }
                setOccupations(temp);
            }
        } catch (error) {
            console.log("error", error);
        }
        setLoading(false);
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
            setUserData({ ...userData });
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
            await handleEditDisciple();
        } catch (err) {
            if (err.name === "ValidationError") {
                alert(err.errors[0]);
            } else {
                console.log(err);
            }
        }
    };

    const updateSatnam = async () => {
        setDisableScreen(true);
        try {
            const { data } = await putJsonData(editSatnamUrl(user?.id), {
                disciple_id: user?.id,
                remark: "ok",
                satnam_date: userData.satnam_date,
            });
            if (data?.success) {
                setDisableScreen(false);
                dispatch({
                    type: "EDIT_DETAILS",
                    payload: { ...userData },
                });
            }
        } catch (error) {
            setDisableScreen(false);
            console.log(error.response.data.error);
        }
    };

    const updateHajri = async (id, index) => {
        setDisableScreen(true);
        try {
            const { data } = await putJsonData(editHajriUrl(id), {
                disciple_id: user?.id,
                remark: "ok",
                attendance_date:
                    userData.satnam_attendance[index].attendance_date,
            });
            if (data?.success) {
                setDisableScreen(false);
                dispatch({
                    type: "EDIT_DETAILS",
                    payload: { ...userData },
                });
            }
        } catch (error) {
            setDisableScreen(false);
            console.log(error.response.data.error);
        }
    };

    const updateSarnam = async () => {
        setDisableScreen(true);
        try {
            const { data } = await putJsonData(editSarnamUrl(user?.id), {
                disciple_id: user?.id,
                remark: "ok",
                sarnam_date: userData.sarnam_date,
            });
            if (data?.success) {
                setDisableScreen(false);
                dispatch({
                    type: "EDIT_DETAILS",
                    payload: { ...userData },
                });
            }
        } catch (error) {
            setDisableScreen(false);
            console.log(error.response.data.error);
        }
    };
    const updateSarshabd = async () => {
        setDisableScreen(true);
        try {
            const { data } = await putJsonData(editSarshabdUrl(user?.id), {
                disciple_id: user?.id,
                remark: "ok",
                sarshabd_date: userData.sarshabd_date,
            });
            if (data?.success) {
                setDisableScreen(false);
                dispatch({
                    type: "EDIT_DETAILS",
                    payload: { ...userData },
                });
            }
        } catch (error) {
            setDisableScreen(false);
            console.log(error.response.data.error);
        }
    };

    const handleEditDisciple = async () => {
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
                formData.append("tehsil_name", userData.tehsil_name);
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
        formData.append("form_no", userData.form_no);
        formData.append("form_date", userData.form_date);
        if (userData.occupation === "Other") {
            formData.append("occupation", userData.otherOccupation);
        } else {
            formData.append("occupation", userData.occupation);
        }
        formData.append("namdan_taken", userData.namdan_taken);
        formData.append("email", userData.email);
        if (userData.unique_id !== "" && userData.unique_id.length >= 12) {
            formData.append("unique_id", userData.unique_id);
        }
        if (userData.avatar !== detail?.avatar) {
            formData.append("avatar", {
                uri:
                    Platform.OS === "android"
                        ? userData.avatar
                        : userData.avatar.replace("file://", ""),
                type: "image/jpeg",
                name: pic,
            });
        }

        const config = {
            method: "put",
            url: `${appConfig.api_url}/disciple/${userData.id}/edit`,
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
                    navigation.pop();
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
        setPic(fileName);
        setUserData({ ...userData, avatar: uri });
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
        onChange(text, "unique_id");
        if (text.length == 12) {
            setaddharLoading(true);
            try {
                const { data } = await postJsonData(searchDiscipleUrl(1), {
                    search_by: "unique_id",
                    search_value: text,
                    country_id: userData?.country_id,
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
                    country_id: userData?.country_id,
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
                    country_id: userData?.country_id,
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
    if (loading)
        return (
            <ActivityIndicator
                style={{ marginVertical: 60 }}
                size={"large"}
                color={theme.colors.primaryLight}
                animating={loading}
            />
        );
    return (
        <ScrollView
            ref={scrollRef}
            style={styles.mainContainer}
            keyboardShouldPersistTaps={enableSearch ? "always" : "never"}
        >
            <View
                pointerEvents={disableScreen ? "none" : "auto"}
                style={{ flex: 1 }}
            >
                <Success
                    message={"Entry Edited Successfully!"}
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
                        {Constants.uploadPhoto}
                    </Text>
                </TouchableOpacity>
                <DatePicker
                    label="Form Date"
                    date={userData.form_date}
                    value={moment(userData.form_date, "YYYY-MM-DD")}
                    setDate={(date) => onChange(date, "form_date")}
                    maximumDate={new Date()}
                    containerStyle={styles.dateContainer}
                    required={true}
                    appendComponent={
                        <Image
                            source={calendarIcon}
                            style={styles.appendIcon}
                        />
                    }
                />

                <FormTextInput
                    label="Form No."
                    value={userData.form_no}
                    placeholder={"Enter Form Number"}
                    containerStyle={styles.textFieldContainer}
                    onChangeText={(text) => onChange(text, "form_no")}
                />
                <FormTextInput
                    label={`${fields.uniqueNoField} Number`}
                    value={userData.unique_id}
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
                                                text: `${userData.unique_id}`,
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
                                    userData.unique_id == ""
                                        ? null
                                        : userData.unique_id?.length < 12
                                        ? crossIcon
                                        : checkIcon
                                }
                                style={{
                                    width: 18,
                                    height: 18,
                                    tintColor:
                                        userData.unique_id?.length < 12
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
                    label="Whatsapp Number"
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
                <SearchableFlatlist
                    defaultValue={userData.occupation}
                    setEnableSearch={setEnableSearch}
                    containerStyle={styles.textFieldContainer}
                    label={"Occupation"}
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
                        label="Other Occupation "
                        value={userData.otherOccupation}
                        placeholder={"Enter your other occupation"}
                        required={true}
                        containerStyle={styles.textFieldContainer}
                        onChangeText={(text) =>
                            onChange(text, "otherOccupation")
                        }
                    />
                )}
                <DatePicker
                    label="Date of Birth"
                    date={userData.dob}
                    value={moment(userData.dob, "YYYY-MM-DD")}
                    setDate={(date) => onDobChange(date)}
                    maximumDate={new Date(threeYearsBack)}
                    containerStyle={styles.dateContainer}
                    required={true}
                    appendComponent={
                        <Image
                            source={calendarIcon}
                            style={styles.appendIcon}
                        />
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
                        required={true}
                        data={[{ id: -1, name: "Other" }, ...tehsils]}
                        containerStyle={styles.textFieldContainer}
                        placeholderText="Select Tehsil"
                    />
                ) : null}
                {userData?.tehsil_id === -1 ? (
                    <FormTextInput
                        label="Other Tehsil"
                        value={userData?.tehsil_name1}
                        required={true}
                        placeholder="Enter Tehsil Name"
                        containerStyle={styles.textFieldContainer}
                        onChangeText={(text) => onChange(text, "tehsil_name")}
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
                        <Image
                            source={buildingIcon}
                            style={styles.appendIcon}
                        />
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
                    keyboardType={"email-address"}
                    appendComponent={
                        <View style={{ flexDirection: "row" }}>
                            <Image
                                source={
                                    userData.email == ""
                                        ? null
                                        : userData.email != "" &&
                                          emailError == ""
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

                <View style={{ marginTop: 10 }}>
                    {detail?.satnam_attendance.map((item, index) => {
                        return (
                            <EditDateButton
                                key={index}
                                value={item.attendance_date}
                                onPress={() => {
                                    navigation.navigate("EditDate", {
                                        dateType: "Hajri",
                                        index,
                                    });
                                }}
                                label={`Hajri ${index + 1}`}
                            />
                        );
                    })}
                    {detail?.satnam_date !== "" &&
                        detail?.satnam_date !== null && (
                            <EditDateButton
                                value={detail?.satnam_date}
                                onPress={() => {
                                    navigation.navigate("EditDate", {
                                        dateType: "Satnam",
                                    });
                                }}
                                label={"Satnam"}
                            />
                        )}
                    {detail?.satnam_exam.map((item, index) => {
                        return (
                            <EditDateButton
                                key={index}
                                value={item.exam_date}
                                onPress={() => {
                                    navigation.navigate("EditDate", {
                                        dateType: "Satnam Exam",
                                        index,
                                    });
                                }}
                                label={`Satnam Exam ${index + 1}`}
                            />
                        );
                    })}
                    {detail?.sarnam_date !== "" &&
                        detail?.sarnam_date !== null && (
                            <EditDateButton
                                value={detail?.sarnam_date}
                                onPress={() => {
                                    navigation.navigate("EditDate", {
                                        dateType: "Sarnam",
                                    });
                                }}
                                label={"Sarnam"}
                            />
                        )}
                    {userData?.sarshabd_date !== "" &&
                        detail?.sarshabd_date !== null && (
                            <DatePicker
                                label="Sarshabd Date"
                                date={userData?.sarshabd_date}
                                value={moment(
                                    userData?.sarshabd_date,
                                    "YYYY-MM-DD"
                                )}
                                setDate={(date) =>
                                    onChange(date, "satshabd_date")
                                }
                                maximumDate={new Date()}
                                containerStyle={styles.dateContainer}
                                appendComponent={
                                    <>
                                        {userData?.sarshabd_date !==
                                            detail?.sarshabd_date && (
                                            <SelfDisableButton
                                                label="Update date"
                                                onPress={updateSarshabd}
                                            />
                                        )}
                                        <Image
                                            source={calendarIcon}
                                            style={styles.appendIcon}
                                        />
                                    </>
                                }
                            />
                        )}
                    {detail?.shuddhikaran.map((item, index) => {
                        return (
                            <EditDateButton
                                key={index}
                                value={item.date}
                                onPress={() => {
                                    navigation.navigate("EditDate", {
                                        dateType: "Shuddhikaran",
                                        index,
                                    });
                                }}
                                label={`Shuddhikaran ${index + 1}`}
                            />
                        );
                    })}
                    {detail?.reupdesh.length > 0 && (
                        <EditDateButton
                            value={detail?.reupdesh.slice(-1)[0].reupdesh_date}
                            onPress={() => {
                                navigation.navigate("EditDate", {
                                    dateType: "Reupdesh",
                                    index: detail?.reupdesh.length - 1,
                                });
                            }}
                            label={`Punar Updesh ${detail?.reupdesh.length}`}
                        />
                    )}
                </View>
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
            </View>
        </ScrollView>
    );
};

export default withDetailContext(EditDisciple);
