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
import Button from "../components/Button";
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
const EditDate = ({ route, navigation, ...props }) => {
    const dateType = route.params.dateType;
    const index = route.params.index ?? 0;

    const {
        state: { detail },
        dispatch: detailDispatch,
    } = props.global;

    const [userData, setUserData] = useState(detail);
    const [disableScreen, setDisableScreen] = useState(false);
    let date;
    let _update = () => {};
    let compare = false;
    let key = "";
    let id = index;
    let _setDate = () => {};
    let num = 0;

    const onChange = (value, key) => {
        setUserData({ ...userData, [key]: value });
    };
    if (dateType === "Satnam") {
        date = userData.satnam_date;
        _update = () => updateSatnam();
        compare = userData.satnam_date === detail.satnam_date;
        key = "satnam_date";
        _setDate = (date) => onChange(date, "satnam_date");
    } else if (dateType === "Sarnam") {
        date = userData.sarnam_date;
        _update = () => updateSarnam();
        compare = userData.sarnam_date === detail.sarnam_date;
        key = "sarnam_date";
        _setDate = (date) => onChange(date, "sarnam_date");
    } else if (dateType === "Sarshabd") {
        date = userData.sarnam_date;
        _update = () => updateSarshabd();
        compare = userData.sarshabd_date === detail.sarshabd_date;
        key = "sarshabd_date";
        _setDate = (date) => onChange(date, "sarshabd_date");
    } else if (dateType === "Hajri") {
        date = userData.satnam_attendance[id].attendance_date;
        _update = () => updateHajri(userData.satnam_attendance[id].id, id);
        compare =
            userData.satnam_attendance[id].attendance_date ===
            detail.satnam_attendance[id].attendance_date;
        key = "sarnam_date";
        num = id + 1;
        _setDate = (date) =>
            setUserData({
                ...userData,
                satnam_attendance: [
                    ...userData.satnam_attendance.map((j, i) =>
                        i == id
                            ? {
                                  ...j,
                                  attendance_date: date,
                              }
                            : j
                    ),
                ],
            });
    }

    const updateSatnam = async () => {
        setDisableScreen(true);
        putJsonData(editSatnamUrl(userData?.id), {
            disciple_id: userData?.id,
            remark: "ok",
            satnam_date: userData.satnam_date,
        })
            .then(({ data }) => {
                if (data.success) {
                    detailDispatch({
                        type: "EDIT_DETAILS",
                        payload: { ...userData },
                    });
                    navigation.pop();
                }
            })
            .catch((error) => {
                if (error && error.response) {
                    console.error(error.response.data.error);
                    alert(error.response.data.error);
                } else {
                    if (error && error.response) {
                        console.error(error.response.data.error);
                        alert(error.response.data.error);
                    } else {
                        console.error(`Error.`, error);
                    }
                }
            })
            .finally(() => {
                setDisableScreen(false);
            });
    };

    const updateSarnam = async () => {
        setDisableScreen(true);
        putJsonData(editSarnamUrl(userData?.id), {
            disciple_id: userData?.id,
            remark: "ok",
            sarnam_date: userData.sarnam_date,
        })
            .then(({ data }) => {
                if (data.success) {
                    detailDispatch({
                        type: "EDIT_DETAILS",
                        payload: { ...userData },
                    });
                    navigation.pop();
                }
            })
            .catch((error) => {
                if (error && error.response) {
                    console.error(error.response.data.error);
                    alert(error.response.data.error);
                } else {
                    console.error(`Error.`, error);
                }
            })
            .finally(() => {
                setDisableScreen(false);
            });
    };

    const updateHajri = async (id, index) => {
        setDisableScreen(true);
        putJsonData(editHajriUrl(id), {
            disciple_id: userData?.id,
            remark: "ok",
            attendance_date: userData.satnam_attendance[index].attendance_date,
        })
            .then(({ data }) => {
                if (data.success) {
                    detailDispatch({
                        type: "EDIT_DETAILS",
                        payload: { ...userData },
                    });
                    navigation.pop();
                }
            })
            .catch((error) => {
                if (error && error.response) {
                    console.error(error.response.data.error);
                    alert(error.response.data.error);
                } else {
                    console.error(`Error.`, error);
                }
            })
            .finally(() => {
                setDisableScreen(false);
            });
    };

    const updateSarshabd = async () => {
        putJsonData(editSarshabdUrl(userData?.id), {
            disciple_id: userData?.id,
            remark: "ok",
            sarshabd_date: userData.sarshabd_date,
        })
            .then(({ data }) => {
                if (data.success) {
                    detailDispatch({
                        type: "EDIT_DETAILS",
                        payload: { ...userData },
                    });
                    navigation.pop();
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setDisableScreen(false);
            });
    };

    return (
        <View
            pointerEvents={disableScreen ? "none" : "auto"}
            style={{
                flex: 1,
                backgroundColor: theme.colors.white,
                padding: 20,
            }}
        >
            <View style={{ marginTop: 30 }}>
                <Text
                    allowFontScaling={false}
                    style={{
                        ...FONTS.h2,
                        color: theme.colors.primary,
                        marginBottom: 20,
                        textAlign: "center",
                    }}
                >{`Change ${dateType}${num > 0 ? num : ""} Date`}</Text>
                <DatePicker
                    label={`${dateType}${num > 0 ? num : ""} Date`}
                    date={date}
                    value={moment(date, "YYYY-MM-DD")}
                    setDate={_setDate}
                    maximumDate={new Date()}
                    containerStyle={styles.dateContainer}
                    appendComponent={
                        <Image
                            source={calendarIcon}
                            style={styles.appendIcon}
                        />
                    }
                />
                {!compare && (
                    <Button
                        onPress={_update}
                        buttonStyle={{
                            padding: 12,
                            marginVertical: 5,
                            backgroundColor: theme.colors.yellow,
                            elevation: 3,
                            borderRadius: 50,
                            alignItems: "center",
                            marginTop: 30,
                        }}
                        textStyle={{
                            color: theme.colors.white,
                            ...FONTS.h3,
                            fontSize: 18,
                        }}
                        text={`Update ${dateType}`}
                    />
                )}
            </View>
        </View>
    );
};

export default withDetailContext(EditDate);
