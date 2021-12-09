import React, { useState, useCallback } from "react";
import {
    Image,
    TouchableOpacity,
    Modal,
    Text,
    View,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import theme from "../constants/theme";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import Field from "../components/ProfileField";
import Field2 from "../components/ProfileField2";
import Field3 from "../components/ProfileField3";
import Success from "../components/Alert/Success";
import { useAuth } from "../context/AuthContext";
import { FONTS, SIZES } from "../constants/fonts";
import { getData, postJsonData } from "../httpClient/apiRequest";
import {
    createHajriUrl,
    createPunarUpdeshUrl,
    createSarnamUrl,
    createSarshabdUrl,
    createSatnamExamUrl,
    createShuddhikaranUrl,
    editHajriUrl,
    getUniqueDispleUrl,
} from "../constants/routes";
import { useEffect } from "react";
import moment from "moment";
import { countMonths, countDays, countYears } from "../utilities/DateUtils";
const userDefaultImage = require("../../assets/icons/user.png");
const clockImage = require("../../assets/icons/clock.png");
import styles from "../styles/Profile";
import { withDetailContext } from "../context/DetailContex";
import { TextInput } from "react-native-gesture-handler";

const FieldLine = ({ label, value }) => {
    return (
        <View style={{ flexDirection: "row" }}>
            <Text
                allowFontScaling={false}
                style={{
                    ...FONTS.h5,
                    width: 120,
                    color: theme.colors.darkgray,
                }}
            >
                {label}
                {": "}
            </Text>
            <Text
                allowFontScaling={false}
                style={{
                    ...FONTS.body5,
                    width: 200,
                    color: "black",
                }}
            >
                {value}
            </Text>
        </View>
    );
};

const Profile = ({ route, navigation, ...props }) => {
    const {
        state: { detail },
        dispatch: detailDispatch,
    } = props.global;
    const { state } = useAuth();
    const [showAlert, setShowAlert] = useState(false);
    const AuthUser = state?.user;
    const user = route.params.user;
    const today = moment().format("YYYY-MM-DD");
    const [buttonDisable, setButtonDisable] = useState(false);
    const [pass, setPass] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [reason, setReason] = useState("");
    const entryType = route.params?.entryType ?? null;
    const [userData, setUserData] = useState(null);
    const fetchDiscipleDetails = useCallback(
        async (id) => {
            setLoading(true);
            try {
                const { data } = await getData(getUniqueDispleUrl(id));
                if (data?.data) {
                    setUserData({
                        ...user,
                        ...data?.data,
                    });
                    detailDispatch({
                        type: "LOAD_DETAILS",
                        payload: { detail: { ...user, ...data.data } },
                    });
                }
            } catch (error) {
                if (error && error.response) {
                    console.error(error.response.data.error);
                    alert(error.response.data.error);
                } else {
                    console.error(`Error which searching disciple.`, error);
                }
            }
            setLoading(false);
        },
        [user?.id]
    );

    let update_at = userData?.updated_at?.split("T")[0];
    const createEntry = async () => {
        if (selectedDate === "") {
            alert("Please select a date for entry.");
            return;
        }

        if (entryType === "Satnaam Entry" && pass === null) {
            alert("Please select pass or fail option.");
            return;
        }
        if (
            entryType === "Shuddhikaran Entry" ||
            entryType === "Punar Updesh Entry"
        ) {
            if (reason === "") {
                alert(`Please specify a reason for ${entryType.toLowerCase()}`);
                return;
            }
        }

        setButtonDisable(true);
        let entryData = {
            disciple_id: userData?.id,
            remark: "ok",
        };
        let entryUrl = createHajriUrl;
        if (entryType === "Attendance Entry") {
            entryData = {
                ...entryData,
                attendance_date: selectedDate,
            };
        }
        if (entryType === "Satnaam Entry") {
            entryUrl = createSatnamExamUrl;
            entryData = {
                exam_date: selectedDate,
                result: pass ? "pass" : "fail",
                disciple_id: userData?.id,
                reason: pass ? "" : reason,
            };
        }
        if (entryType === "Sarnaam Entry") {
            entryUrl = createSarnamUrl;
            entryData = {
                ...entryData,
                sarnam_date: selectedDate,
            };
        }
        if (entryType === "Shuddhikaran Entry") {
            entryUrl = createShuddhikaranUrl;
            entryData = {
                disciple_id: userData?.id,
                date: selectedDate,
                description: reason,
            };
        }
        if (entryType === "Punar Updesh Entry") {
            entryUrl = createPunarUpdeshUrl;
            entryData = {
                disciple_id: userData?.id,
                reupdesh_date: selectedDate,
                remark: reason,
            };
        }
        if (entryType === "Sarshabd Entry") {
            entryUrl = createSarshabdUrl;
            entryData = {
                disciple_id: userData?.id,
                sarshabd_date: selectedDate,
                remark: "ok",
            };
        }
        console.log(entryData, entryUrl);
        try {
            const { data } = await postJsonData(entryUrl, entryData);
            if (data.success) {
                setReason("");
                setSelectedDate("");
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                    navigation.goBack();
                }, 1500);
            }
        } catch (error) {
            setReason("");
            setSelectedDate("");
            setButtonDisable(false);
            if (error && error.response) {
                console.error(error.response.data.error);
                alert(error.response.data.error);
            } else {
                console.error(`Error which searching disciple.`, error);
            }
        }
    };
    let arr = [];
    for (var i = 0; i < 3; i++) {
        if (i < userData?.satnam_attendance.length) {
            let c = {
                label: `Hajri${i + 1}`,
                value: userData?.satnam_attendance[i]?.attendance_date,
                enable: false,
                minDate: null,
            };
            arr[i] = c;
        } else {
            let c = {
                label: `Hajri${i + 1}`,
                value: "",
                enable:
                    i == 0
                        ? countMonths(userData?.form_date, today) >= 1 &&
                          (userData?.satnam_date === "" ||
                              userData?.satnam_date === null)
                        : arr[i - 1].value !== "" &&
                          countMonths(arr[i - 1].value, today) >= 1 &&
                          (userData?.satnam_date === "" ||
                              userData?.satnam_date === null) &&
                          countMonths(userData?.form_date, today) >= i + 1,
                minDate:
                    i == 0
                        ? moment(userData?.form_date, "YYYY-MM-DD").add(1, "M")
                        : moment(arr[i - 1].value, "YYYY-MM-DD").add(1, "M"),
            };
            arr[i] = c;
        }
    }
    let showSubmitButton = false;
    if (entryType === "Attendance Entry") {
        if (
            userData?.satnam_attendance.length < 3 &&
            (userData?.satnam_date === "" || userData?.satnam_date === null) &&
            (userData?.satnam_attendance.length > 0
                ? countMonths(
                      arr[userData?.satnam_attendance.length - 1].value,
                      today
                  ) >= 1
                : countMonths(userData?.form_date, today) >= 1) &&
            countMonths(moment(userData?.form_date, "YYYY-MM-DD"), today) >= 1
        ) {
            showSubmitButton = true;
        }
    }
    let minDateforSatnam =
        userData?.satnam_exam.length < 1
            ? true
            : countMonths(
                  userData?.satnam_exam[userData?.satnam_exam.length - 1]
                      .exam_date,
                  today
              ) >= 1;

    const showSatnam =
        countMonths(userData?.form_date, today) >=
            userData?.rules?.min_satnam_month &&
        countYears(userData?.dob, today) >= userData?.rules?.satnam_age;
    const enableSatnam =
        showSatnam &&
        (userData?.satnam_date === null || userData?.satnam_date === "") &&
        minDateforSatnam;
    if (entryType === "Satnaam Entry" && enableSatnam) {
        showSubmitButton = true;
    }
    const enableSarnam =
        countDays(userData?.satnam_date, userData?.rules?.sarnam_date) >= 0 &&
        entryType === "Sarnaam Entry" &&
        (userData?.sarnam_date === "" || userData?.sarnam_date === null);

    const enableSarshabd =
        countDays(userData?.sarnam_date, userData?.rules?.sarshabd_date) >= 0 &&
        (userData?.sarnam_date !== "" || userData?.sarnam_date !== null) &&
        (userData?.sarshabd_date === "" || userData?.sarshabd_date === null);

    if (enableSarnam) showSubmitButton = true;
    if (entryType === "Sarshabd Entry" && enableSarshabd) {
        showSubmitButton = true;
    }

    if (
        entryType === "Shuddhikaran Entry" ||
        entryType === "Punar Updesh Entry"
    ) {
        showSubmitButton = true;
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            fetchDiscipleDetails(user?.id);
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        navigation.setOptions({
            title: `${entryType ?? "Disciple's Detail"}`,
        });
        fetchDiscipleDetails(user?.id);
    }, [fetchDiscipleDetails, user?.id]);
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
            style={{
                flex: 1,
                backgroundColor: theme.colors.white,
            }}
            showsVerticalScrollIndicator={false}
        >
            <Success
                message={"Entry Added Successfully!"}
                visible={showAlert}
            />
            <View
                style={{
                    flex: 1,
                    padding: 20,
                }}
            >
                <View
                    style={{
                        position: "relative",
                        backgroundColor: theme.colors.white,
                        borderRadius: 8,
                        marginTop: 30,
                        elevation: 5,
                        padding: 15,
                    }}
                >
                    {entryType === null && (
                        <TouchableOpacity
                            style={{
                                paddingHorizontal: 5,
                                alignSelf: "flex-end",
                                borderRadius: 5,
                                flexDirection: "row",
                                alignItems: "center",
                                paddingVertical: 2,
                                backgroundColor:
                                    userData?.district_id !== AuthUser.district
                                        ? "lightgray"
                                        : theme.colors.primaryLight,
                            }}
                            onPress={() =>
                                navigation.navigate("Edit", { user: detail })
                            }
                            disabled={
                                userData?.district_id !== AuthUser.district
                            }
                        >
                            <Image
                                source={clockImage}
                                style={{
                                    marginRight: 4,
                                    width: 10,
                                    height: 10,
                                    tintColor:
                                        userData?.district_id !==
                                        AuthUser.district
                                            ? "gray"
                                            : theme.colors.primary,
                                }}
                            />
                            <Text
                                style={{
                                    color:
                                        userData?.district_id !==
                                        AuthUser.district
                                            ? "gray"
                                            : theme.colors.primary,
                                    ...FONTS.h6,
                                }}
                            >
                                Edit
                            </Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        onPress={() => setShowModal(true)}
                        style={{
                            width: 110,
                            marginTop: entryType === null ? -85 : -55,
                            alignSelf: "center",
                            alignItems: "center",
                        }}
                    >
                        <Avatar
                            borderSize={110}
                            imageSize={100}
                            status={"Active"}
                            uri={userData && userData.avatar}
                            imageSource={userDefaultImage}
                        />
                    </TouchableOpacity>
                    <View style={{ alignItems: "center", marginTop: 10 }}>
                        <Text
                            allowFontScaling={false}
                            style={{
                                color: theme.colors.primary,
                                ...FONTS.h3,
                                textAlign: "center",
                            }}
                        >
                            {/* {user.name} */}
                            {userData?.name} {userData?.relation}{" "}
                            {userData?.guardian_name}
                        </Text>
                        <Text
                            allowFontScaling={false}
                            style={{
                                color: theme.colors.primary,
                                ...FONTS.body5,
                            }}
                        >
                            Form No:{" "}
                            <Text style={{ ...FONTS.body5 }}>
                                {userData?.form_no}
                            </Text>
                        </Text>
                        <Text
                            allowFontScaling={false}
                            style={{
                                color: theme.colors.primary,
                                ...FONTS.body5,
                            }}
                        >
                            Date of Birth:{" "}
                            <Text style={{ ...FONTS.body5 }}>
                                {moment(userData?.dob).format("DD-MM-YYYY")}
                            </Text>
                        </Text>
                        <Text
                            allowFontScaling={false}
                            style={{
                                color: theme.colors.primary,
                                ...FONTS.body5,
                            }}
                        >
                            Naamdan Center:{" "}
                            <Text style={{ ...FONTS.body5 }}>
                                {userData?.namdan_center_name}
                            </Text>
                        </Text>
                        <Text
                            allowFontScaling={false}
                            style={{
                                color: theme.colors.primary,
                                ...FONTS.body5,
                            }}
                        >
                            Naamdan Taken:{" "}
                            <Text style={{ ...FONTS.body5 }}>
                                {userData?.namdan_taken}
                            </Text>
                        </Text>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <FieldLine
                            label={"Mobile No."}
                            value={userData?.mobile_no}
                        />
                        {userData?.whatsapp_no !== "" && (
                            <FieldLine
                                label={"Whatsapp No."}
                                value={userData?.whatsapp_no ?? "NA"}
                            />
                        )}

                        <FieldLine
                            label={"Address"}
                            value={[
                                userData?.address,
                                userData?.tehsil_name ?? userData?.tehsil_name1,
                                userData?.district_name,
                                userData?.state_name,
                                userData?.country_name,
                                userData?.pincode ?? null,
                            ].join(", ")}
                        />
                        <FieldLine
                            label={"Occupation"}
                            value={userData?.occupation}
                        />
                        {(userData?.unique_id !== "" ||
                            userData?.unique_id !== null) && (
                            <FieldLine
                                label={"Aadhaar No."}
                                value={userData?.unique_id ?? "NA"}
                            />
                        )}
                        {userData?.email !== "" && (
                            <FieldLine
                                label={"Email ID"}
                                value={userData?.email ?? "NA"}
                            />
                        )}
                    </View>
                </View>
                {userData?.history.length > 0 && (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.push("History", {
                                history: userData?.history,
                            })
                        }
                        style={styles.historyBtn}
                    >
                        <Text
                            allowFontScaling={false}
                            style={{ ...FONTS.h5, color: theme.colors.primary }}
                        >
                            View History
                        </Text>
                        <Image
                            style={{
                                width: 25,
                                height: 25,
                                marginLeft: 10,
                                tintColor: theme.colors.grey,
                            }}
                            source={clockImage}
                        />
                    </TouchableOpacity>
                )}
                <View style={{ marginVertical: 15 }}>
                    <Field
                        label={
                            userData?.history.length > 0
                                ? `Punar Updesh ${userData?.history.length}`
                                : "Pratham Naam"
                        }
                        value={userData?.form_date}
                        enable={false}
                    />
                    {arr.map(({ label, value, minDate, enable }, i) => {
                        if (entryType === null && value !== "" && !enable) {
                            return (
                                <Field
                                    key={i}
                                    label={label}
                                    enable={enable}
                                    value={value}
                                    minDate={minDate}
                                    onDateChange={(e) => {}}
                                />
                            );
                        }
                        if (
                            (entryType === "Attendance Entry" &&
                                value == "" &&
                                enable) ||
                            (value !== "" && !enable)
                        ) {
                            return (
                                <Field
                                    key={i}
                                    label={label}
                                    enable={enable}
                                    value={enable ? selectedDate : value}
                                    minDate={enable ? minDate : null}
                                    onDateChange={setSelectedDate}
                                />
                            );
                        }
                    })}
                    {entryType !== "Satnaam Entry" &&
                        userData?.satnam_exam.length > 0 && (
                            <Field
                                label="Satnaam"
                                value={userData?.satnam_date}
                                enable={false}
                            >
                                <View
                                    style={{
                                        backgroundColor: "white",
                                        paddingHorizontal: 5,
                                    }}
                                >
                                    {userData?.satnam_exam.map(
                                        (item, index) => {
                                            return (
                                                <Field3
                                                    key={index}
                                                    label={`Exam ${index + 1}`}
                                                    value={item.exam_date}
                                                    enable={false}
                                                    optionValue={
                                                        item.result === "Pass"
                                                            ? true
                                                            : false
                                                    }
                                                />
                                            );
                                        }
                                    )}
                                </View>
                            </Field>
                        )}
                    {entryType === "Satnaam Entry" && showSatnam ? (
                        <Field
                            label="Satnaam"
                            value={userData?.satnam_date}
                            enable={false}
                        >
                            <View
                                style={{
                                    backgroundColor: "white",
                                    paddingHorizontal: 5,
                                }}
                            >
                                {userData?.satnam_exam.map((item, index) => {
                                    return (
                                        <Field3
                                            key={index}
                                            label={`Exam ${index + 1}`}
                                            value={item.exam_date}
                                            enable={false}
                                            optionValue={
                                                item.result === "Pass"
                                                    ? true
                                                    : false
                                            }
                                        >
                                            {item.result === "Fail" ? (
                                                <TextInput
                                                    value={item.reason}
                                                    editable={false}
                                                    onChangeText={(text) => {}}
                                                    style={{
                                                        backgroundColor:
                                                            theme.colors.white,
                                                        padding: 0,
                                                        paddingHorizontal: 5,
                                                        ...FONTS.body5,
                                                        marginTop: 5,
                                                        borderRadius: 5,
                                                    }}
                                                />
                                            ) : null}
                                        </Field3>
                                    );
                                })}
                                {enableSatnam && (
                                    <Field3
                                        label={`Exam ${
                                            userData?.satnam_exam.length + 1
                                        }`}
                                        value={selectedDate}
                                        enable={enableSatnam}
                                        onOptionChange={setPass}
                                        optionValue={pass}
                                        minDate={
                                            userData?.satnam_exam.length < 1
                                                ? moment(
                                                      userData?.form_date,
                                                      "YYYY-MM-DD"
                                                  ).add(4, "M")
                                                : moment(
                                                      userData?.satnam_exam[
                                                          userData?.satnam_exam
                                                              .length - 1
                                                      ].exam_date,
                                                      "YYYY-MM-DD"
                                                  ).add(1, "d")
                                        }
                                        onDateChange={setSelectedDate}
                                    >
                                        {pass === false && (
                                            <TextInput
                                                value={reason}
                                                placeholder="Enter the reason...."
                                                multiline
                                                editable={pass === false}
                                                autoFocus
                                                onChangeText={(text) =>
                                                    setReason(text)
                                                }
                                                style={{
                                                    backgroundColor:
                                                        theme.colors.white,
                                                    padding: 0,
                                                    paddingHorizontal: 5,
                                                    ...FONTS.body5,
                                                    marginTop: 5,
                                                    borderRadius: 5,
                                                }}
                                            />
                                        )}
                                    </Field3>
                                )}
                            </View>
                        </Field>
                    ) : null}
                    {entryType !== "Sarnaam Entry" &&
                        userData?.sarnam_date !== "" &&
                        userData?.sarnam_date !== null && (
                            <Field
                                label="Sarnaam"
                                enable={false}
                                value={userData?.sarnam_date}
                                minDate={null}
                                onDateChange={(e) => {}}
                            />
                        )}
                    {entryType === "Sarnaam Entry" ? (
                        enableSarnam ? (
                            <Field
                                label={"Sarnaam"}
                                enable={enableSarnam}
                                value={selectedDate}
                                minDate={moment(
                                    userData?.satnam_date,
                                    "YYYY-MM-DD"
                                ).add("1", "d")}
                                onDateChange={setSelectedDate}
                            />
                        ) : userData?.sarnam_date !== "" &&
                          userData?.sarnam_date !== null ? (
                            <Field
                                label="Sarnaam"
                                enable={false}
                                value={userData?.sarnam_date}
                                minDate={null}
                                onDateChange={(e) => {}}
                            />
                        ) : null
                    ) : null}
                    {entryType !== "Sarshabd Entry" &&
                        userData?.sarshabd_date !== "" &&
                        userData?.sarshabd_date !== null && (
                            <Field
                                label="Sarshabd"
                                enable={false}
                                value={userData?.sarshabd_date}
                                minDate={null}
                                onDateChange={(e) => {}}
                            />
                        )}
                    {entryType === "Sarshabd Entry" ? (
                        enableSarshabd ? (
                            <Field
                                label={"Sarshabd"}
                                enable={true}
                                value={selectedDate}
                                minDate={moment(
                                    userData?.rules.sarshabd_date,
                                    "YYYY-MM-DD"
                                ).add(1, "d")}
                                onDateChange={setSelectedDate}
                            />
                        ) : userData?.sarshabd_date !== null &&
                          userData?.sarshabd_date !== "" ? (
                            <Field
                                label="Sarshabd"
                                enable={false}
                                value={userData?.sarshabd_date}
                                minDate={null}
                                onDateChange={(e) => {}}
                            />
                        ) : null
                    ) : null}
                    {userData?.shuddhikaran.length > 0 && (
                        <>
                            <View
                                style={{
                                    marginVertical: 5,
                                    backgroundColor: theme.colors.primaryLight,
                                    height: 2,
                                }}
                            />
                            {userData?.shuddhikaran.map((item, index) => (
                                <Field2
                                    key={index}
                                    label={`Shuddhikaran ${index + 1}`}
                                    value={item.date}
                                    enable={false}
                                    reason={item.description}
                                    onReasonChange={(e) => {}}
                                    onDateChange={(e) => {}}
                                />
                            ))}
                        </>
                    )}
                    {entryType === "Shuddhikaran Entry" && (
                        <Field2
                            label={`Shuddhikaran ${
                                userData?.shuddhikaran.length + 1
                            }`}
                            value={selectedDate}
                            enable={true}
                            reason={reason}
                            minDate={
                                userData?.shuddhikaran.length === 0
                                    ? moment(update_at, "YYYY-MM-DD").add(
                                          1,
                                          "d"
                                      )
                                    : moment(update_at, "YYYY-MM_DD").add(
                                          1,
                                          "d"
                                      )
                            }
                            onReasonChange={(text) => setReason(text)}
                            onDateChange={setSelectedDate}
                        />
                    )}
                    {entryType === "Punar Updesh Entry" && (
                        <Field2
                            label={`Punar Updesh ${
                                userData?.history.length + 1
                            }`}
                            value={selectedDate}
                            enable={true}
                            reason={reason}
                            minDate={moment(update_at, "YYYY-MM-DD").add(
                                1,
                                "d"
                            )}
                            onReasonChange={(text) => setReason(text)}
                            onDateChange={setSelectedDate}
                        />
                    )}
                </View>

                <View>
                    {showSubmitButton && (
                        <Button
                            onPress={() => createEntry()}
                            disabled={buttonDisable}
                            buttonStyle={{
                                padding: 12,
                                marginVertical: 5,
                                backgroundColor: buttonDisable
                                    ? "lightgray"
                                    : theme.colors.primary,
                                elevation: 3,
                                borderRadius: 50,
                                alignItems: "center",
                                marginTop: 30,
                            }}
                            textStyle={{
                                color: buttonDisable
                                    ? "gray"
                                    : theme.colors.white,
                                ...FONTS.h3,
                                fontSize: 18,
                            }}
                            text="Submit"
                        />
                    )}
                    {!showSubmitButton && entryType !== null && (
                        <Text
                            style={{
                                alignSelf: "center",
                                textAlign: "center",
                                padding: 5,
                                width: 250,
                                color: theme.colors.primary,
                                borderRadius: 10,
                                marginVertical: 10,
                                ...FONTS.h5,
                            }}
                        >
                            Nothing to update here.
                        </Text>
                    )}
                </View>
            </View>
            <Modal
                visible={showModal}
                animationType={"fade"}
                style={{ flex: 1 }}
                transparent={true}
                onRequestClose={() => setShowModal(false)}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "black",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Image
                        resizeMode="contain"
                        style={{ width: SIZES.width, height: SIZES.height }}
                        source={{ uri: userData?.avatar }}
                    />
                </View>
            </Modal>
        </ScrollView>
    );
};

export default withDetailContext(Profile);
