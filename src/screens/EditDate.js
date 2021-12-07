import moment from "moment";
import React, { useState } from "react";
import { Image, Text, View, TextInput } from "react-native";
import {
    editHajriUrl,
    editPunarUpdeshUrl,
    editSarnamUrl,
    editSarshabdUrl,
    editSatnamExamUrl,
    editSatnamUrl,
    editShuddhikaranUrl,
    deleteHajriUrl,
    deletePunarUpdeshUrl,
    deleteSarnamUrl,
    deleteSarshabdUrl,
    deleteSatnamExamUrl,
    deleteSatnamUrl,
    deleteShuddhikaranUrl,
} from "../constants/routes";
import { putJsonData, deleteData } from "../httpClient/apiRequest";
import theme from "../constants/theme";
import Button from "../components/Button";
import RadioButton from "../components/RadioButton";
import styles from "../styles/Singup";
import DatePicker from "../components/DatePicker";
const calendarIcon = require("../../assets/icons/calenderFilled.png");
import { withDetailContext } from "../context/DetailContex";
import { FONTS } from "../constants/fonts";

const EditDate = ({ route, navigation, ...props }) => {
    const { dateType } = route.params;
    const index = route.params.index ?? 0;

    const {
        state: { detail },
        dispatch: detailDispatch,
    } = props.global;

    const [userData, setUserData] = useState(detail);
    const [disableScreen, setDisableScreen] = useState(false);
    const [showTextInput, setShowTextInput] = useState(false);

    let date;
    let pass = null;
    let _update = () => {};
    let _delete = () => {};
    let compare = false;
    const id = index;
    let _setDate = () => {};
    let num = 0;
    let key = "";
    let remark = "";
    let _onTextChange = () => {};
    let _onOptionChange = () => {};

    const onChange = (value, key) => {
        setUserData({ ...userData, [key]: value });
    };
    if (dateType === "Satnam") {
        date = userData.satnam_date;
        _update = () => updateSatnam();
        _delete = () => deleteSatnam();
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
    } else if (dateType === "Satnam Exam") {
        date = userData.satnam_exam[id].exam_date;
        pass = userData.satnam_exam[id].result;
        remark = userData.satnam_exam[id].reason;
        _update = () => updateSatnamExam(userData.satnam_exam[id].id, id);
        compare =
            userData.satnam_exam[id].exam_date ===
                detail.satnam_exam[id].exam_date &&
            pass === detail.satnam_exam[id].result &&
            remark === detail.satnam_exam[id].reason;
        num = id + 1;
        _onOptionChange = (text) =>
            setUserData({
                ...userData,
                satnam_exam: [
                    ...userData.satnam_exam.map((j, i) =>
                        i == id
                            ? {
                                  ...j,
                                  result: text,
                              }
                            : j
                    ),
                ],
            });
        _onTextChange = (text) =>
            setUserData({
                ...userData,
                satnam_exam: [
                    ...userData.satnam_exam.map((j, i) =>
                        i == id
                            ? {
                                  ...j,
                                  reason: text,
                              }
                            : j
                    ),
                ],
            });
        _setDate = (date) =>
            setUserData({
                ...userData,
                satnam_exam: [
                    ...userData.satnam_exam.map((j, i) =>
                        i == id
                            ? {
                                  ...j,
                                  exam_date: date,
                              }
                            : j
                    ),
                ],
            });
    } else if (dateType === "Shuddhikaran") {
        date = userData.shuddhikaran[id].date;
        _update = () => updateShuddhikaran(userData.shuddhikaran[id].id, id);
        compare =
            userData.shuddhikaran[id].date === detail.shuddhikaran[id].date &&
            userData.shuddhikaran[id].description ===
                detail.shuddhikaran[id].description;
        num = id + 1;
        remark = userData.shuddhikaran[id].description;
        _onTextChange = (text) =>
            setUserData({
                ...userData,
                shuddhikaran: [
                    ...userData.shuddhikaran.map((j, i) =>
                        i == id
                            ? {
                                  ...j,
                                  description: text,
                              }
                            : j
                    ),
                ],
            });
        _setDate = (date) =>
            setUserData({
                ...userData,
                shuddhikaran: [
                    ...userData.shuddhikaran.map((j, i) =>
                        i == id
                            ? {
                                  ...j,
                                  date,
                              }
                            : j
                    ),
                ],
            });
    } else if (dateType === "Reupdesh") {
        date = userData.reupdesh[id].reupdesh_date;
        _update = () => updatePunarUpdesh(userData.reupdesh[id].id, id);
        remark = userData.reupdesh[id].remark;
        compare =
            userData.reupdesh[id].reupdesh_date ===
                detail.reupdesh[id].reupdesh_date &&
            userData.reupdesh[id].remark === detail.reupdesh[id].remark;
        num = id + 1;
        _onTextChange = (text) =>
            setUserData({
                ...userData,
                reupdesh: [
                    ...userData.reupdesh.map((j, i) =>
                        i == id
                            ? {
                                  ...j,
                                  remark: text,
                              }
                            : j
                    ),
                ],
            });
        _setDate = (date) =>
            setUserData({
                ...userData,
                reupdesh: [
                    ...userData.reupdesh.map((j, i) =>
                        i == id
                            ? {
                                  ...j,
                                  reupdesh_date: date,
                              }
                            : j
                    ),
                ],
            });
    }
    const deleteSatnam = async () => {
        setDisableScreen(true);
        deleteData(deleteSatnamUrl(userData?.id))
            .then(({ data }) => {
                if (data?.success) {
                    setUserData({ ...userData, satnam_date: "" });
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
            .finally(() => setDisableScreen(false));
    };

    const deleteSarnam = async () => {
        setDisableScreen(true);
        deleteData(deleteSarnamUrl(userData?.id))
            .then(({ data }) => {
                if (data?.success) {
                    setUserData({ ...userData, sarnam_date: "" });
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
            .finally(() => setDisableScreen(false));
    };
    const deleteSarshabd = async () => {
        setDisableScreen(true);
        deleteData(deleteSarshabdUrl(userData?.id))
            .then(({ data }) => {
                if (data?.success) {
                    setUserData({ ...userData, sarshabd_date: "" });
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
            .finally(() => setDisableScreen(false));
    };
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
                    console.error(`Error.`, error);
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
    const updateSatnamExam = async (id, index) => {
        setDisableScreen(true);
        putJsonData(editSatnamExamUrl(id), {
            disciple_id: userData?.id,
            result: userData.satnam_exam[index].result,
            exam_date: userData.satnam_exam[index].exam_date,
            reason: userData.satnam_exam[index].reason,
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

    const updateShuddhikaran = async (id, index) => {
        setDisableScreen(true);
        putJsonData(editShuddhikaranUrl(id), {
            disciple_id: userData?.id,
            description: userData.shuddhikaran[index].description,
            date: userData.shuddhikaran[index].date,
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
                    console.log(error);
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

    const updatePunarUpdesh = async (id, index) => {
        setDisableScreen(true);
        putJsonData(editPunarUpdeshUrl(id), {
            disciple_id: userData?.id,
            remark,
            reupdesh_date: userData.reupdesh[index].reupdesh_date,
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
                    console.log(error);
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
                {dateType === "Satnam Exam" ? (
                    <View
                        style={{
                            marginTop: 20,
                            flexDirection: "row",
                            justifyContent: "space-around",
                            alignItems: "center",
                        }}
                    >
                        <RadioButton
                            selected={pass === "Pass"}
                            color={theme.colors.primary}
                            id="mno"
                            labelStyle={{
                                ...FONTS.h5,
                            }}
                            size={16}
                            label="Pass"
                            onPress={() => _onOptionChange("Pass")}
                        />
                        <RadioButton
                            selected={pass === "Fail"}
                            color={theme.colors.primary}
                            id="mno"
                            labelStyle={{
                                ...FONTS.h5,
                            }}
                            size={16}
                            label="Fail"
                            onPress={() => _onOptionChange("Fail")}
                        />
                    </View>
                ) : null}
                {(dateType === "Shuddhikaran" ||
                    dateType === "Reupdesh" ||
                    dateType === "Satnam Exam") && (
                    <View
                        style={{
                            marginVertical: 30,
                            backgroundColor: theme.colors.primaryLight,
                        }}
                    >
                        <TextInput
                            value={remark}
                            onChangeText={_onTextChange}
                            style={{
                                backgroundColor: theme.colors.white,
                                ...FONTS.body4,
                                color: theme.colors.primary,
                                padding: 10,
                                margin: 5,
                            }}
                        />
                    </View>
                )}
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
