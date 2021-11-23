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
import { useAuth } from "../context/AuthContext";
import { FONTS, SIZES } from "../constants/fonts";
import { getData, postJsonData } from "../httpClient/apiRequest";
import {
    createHajriUrl,
    createSarnamUrl,
    createSatnamExamUrl,
    createSatnamUrl,
    createShuddhikaranUrl,
    getUniqueDispleUrl,
} from "../constants/routes";
import { useEffect } from "react";
import moment from "moment";
import {
    countMonths,
    countDays,
    countDaysBetween,
    countYears,
} from "../utilities/DateUtils";
const userDefaultImage = require("../../assets/icons/user.png");
const clockImage = require("../../assets/icons/clock.png");

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

let buttonDisable = false;
const Profile = ({ route, navigation }) => {
    const { state } = useAuth();
    const AuthUser = state?.user;
    const user = route.params.user;
    const today = moment().format("YYYY-MM-DD");
    const [pass, setPass] = useState(true);
    const [loading, setLoading] = useState(false);
    const [disciple, setDisciple] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [reason, setReason] = useState("");
    const entryType = route.params?.entryType ?? null;
    const fetchDiscipleDetails = useCallback(
        async (id) => {
            setLoading(true);
            try {
                const { data } = await getData(getUniqueDispleUrl(id));
                if (data?.data) {
                    setDisciple({ ...user, ...data.data });
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
    const createEntry = async () => {
        if (entryType === "Shuddhikaran Entry") {
            if (reason === "") {
                alert(`Please specify a reason for ${entryType.toLowerCase()}`);
                return;
            }
        }
        if (selectedDate === "") {
            alert("Please select a date for entry.");
            return;
        }
        buttonDisable = true;
        let entryData = {
            disciple_id: disciple?.id,
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
                disciple_id: disciple?.id,
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
                disciple_id: disciple?.id,
                date: selectedDate,
                description: reason,
            };
        }
        console.log(entryData, entryUrl);
        try {
            await postJsonData(entryUrl, entryData);
            navigation.pop(1);
        } catch (error) {
            if (error && error.response) {
                console.error(error.response.data.error);
                alert(error.response.data.error);
            } else {
                console.error(`Error which searching disciple.`, error);
            }
        }
        buttonDisable = false;
    };
    let arr = [];
    for (var i = 0; i < 3; i++) {
        if (i < disciple?.satnam_attendance.length) {
            let c = {
                label: `Hajri${i + 1}`,
                value: disciple?.satnam_attendance[i]?.attendance_date,
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
                        ? countMonths(disciple?.form_date, today) >= 1
                        : arr[i - 1].value !== "" &&
                        countMonths(disciple?.form_date, today) >= i + 1,
                minDate:
                    i == 0
                        ? moment(disciple?.form_date, "YYYY-MM-DD").add(1, "M")
                        : moment(arr[i - 1].value, "YYYY-MM-DD").add(1, "M"),
            };
            arr[i] = c;
        }
    }
    let showSubmitButton = false;
    if (entryType === "Attendance Entry") {
        if (
            disciple?.satnam_attendance.length < 3 &&
            countMonths(moment(disciple?.form_date, "YYYY-MM-DD"), today) >= 1
        ) {
            showSubmitButton = true;
        }
    }
    let minDateforSatnam =
        disciple?.satnam_exam.length < 1
            ? true
            : countMonths(
                disciple?.satnam_exam[disciple?.satnam_exam.length - 1]
                    .exam_date,
                today
            ) >= 1;

    const enableSatnam =
        countMonths(disciple?.form_date, today) >=
        disciple?.rules?.min_satnam_month &&
        disciple?.satnam_date === "" &&
        minDateforSatnam;

    if (entryType === "Satnaam Entry" && enableSatnam) {
        showSubmitButton = true;
    }
    const enableSarnam =
        countDays(disciple?.satnam_date, "2015-12-31") >= 1 &&
        entryType === "Sarnaam Entry" &&
        disciple?.sarnam_date === null;

    if (enableSarnam) showSubmitButton = true;
    if (entryType === "Shuddhikaran Entry") {
        buttonDisable = (selectedDate === "" || reason === "") ?? true;
        showSubmitButton = true;
    }
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
                    <TouchableOpacity
                        style={{
                            paddingHorizontal: 5,
                            alignSelf: "flex-end",
                            borderRadius: 5,
                            flexDirection: "row",
                            alignItems: "center",
                            paddingVertical: 2,
                            backgroundColor:
                                disciple?.district_id !== AuthUser.district
                                    ? "lightgray"
                                    : theme.colors.primaryLight,
                        }}
                        onPress={() => { }}
                        disabled={disciple?.district_id !== AuthUser.district}
                    >
                        <Image
                            source={clockImage}
                            style={{
                                marginRight: 4,
                                width: 10,
                                height: 10,
                                tintColor:
                                    disciple?.district_id !== AuthUser.district
                                        ? "gray"
                                        : theme.colors.primary,
                            }}
                        />
                        <Text
                            style={{
                                color:
                                    disciple?.district_id !== AuthUser.district
                                        ? "gray"
                                        : theme.colors.primary,
                                ...FONTS.h6,
                            }}
                        >
                            Edit
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setShowModal(true)}
                        style={{
                            width: 110,
                            marginTop: -75,
                            alignSelf: "center",
                            alignItems: "center",
                        }}
                    >
                        <Avatar
                            borderSize={110}
                            imageSize={100}
                            status={"Active"}
                            uri={disciple && disciple.avatar}
                            imageSource={userDefaultImage}
                        />
                    </TouchableOpacity>
                    <View style={{ alignItems: "center", marginTop: 10 }}>
                        <Text
                            allowFontScaling={false}
                            style={{
                                color: theme.colors.primary,
                                ...FONTS.h3,
                            }}
                        >
                            {/* {user.name} */}
                            {disciple?.name} {disciple?.relation}{" "}
                            {disciple?.guardian_name}
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
                                {disciple?.form_no}
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
                                {moment(disciple?.dob).format("DD-MM-YYYY")}
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
                                {disciple?.namdan_taken}
                            </Text>
                        </Text>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <FieldLine
                            label={"Mobile No."}
                            value={disciple?.mobile_no}
                        />
                        {(disciple?.whatsapp_no !== null ||
                            disciple?.whatsapp_no !== "") && (
                                <FieldLine
                                    label={"Whatsapp No."}
                                    value={disciple?.mobile_no}
                                />
                            )}
                        <FieldLine
                            label={"Address"}
                            value={[
                                disciple?.address,
                                disciple?.tehsil_name,
                                disciple?.district_name,
                                disciple?.state_name,
                                disciple?.country_name,
                                disciple?.pincode ?? null,
                            ].join(", ")}
                        />
                        <FieldLine
                            label={"Occupation"}
                            value={disciple?.occupation}
                        />
                        {(disciple?.unique_id !== null ||
                            disciple?.unique_id !== "") && (
                                <FieldLine
                                    label={"Aadhaar No."}
                                    value={disciple?.unique_id}
                                />
                            )}
                        {(disciple?.email !== null ||
                            disciple?.email !== "") && (
                                <FieldLine
                                    label={"Email ID"}
                                    value={disciple?.email}
                                />
                            )}
                    </View>
                </View>
                <View style={{ marginVertical: 15 }}>
                    <Field
                        label={"Pratham Naam"}
                        value={user?.form_date}
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
                                    onDateChange={(e) => { }}
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
                        disciple?.satnam_exam.length > 0 && (
                            <Field
                                label="Satnaam"
                                value={disciple?.satnam_date}
                                enable={false}
                            >
                                <View
                                    style={{
                                        backgroundColor: "white",
                                        paddingHorizontal: 5,
                                    }}
                                >
                                    {disciple?.satnam_exam.map(
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
                    {entryType === "Satnaam Entry" ? (
                        <Field
                            label="Satnaam"
                            value={disciple?.satnam_date}
                            enable={false}
                        >
                            <View
                                style={{
                                    backgroundColor: "white",
                                    paddingHorizontal: 5,
                                }}
                            >
                                {disciple?.satnam_exam.map((item, index) => {
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
                                })}
                                {enableSatnam && (
                                    <Field3
                                        label={`Exam ${disciple?.satnam_exam.length + 1
                                            }`}
                                        value={selectedDate}
                                        enable={enableSatnam}
                                        onOptionChange={setPass}
                                        optionValue={pass}
                                        minDate={
                                            disciple?.satnam_exam.length < 1
                                                ? moment(
                                                    disciple?.form_date,
                                                    "YYYY-MM-DD"
                                                ).add(4, "M")
                                                : moment(
                                                    disciple?.satnam_exam[
                                                        disciple?.satnam_exam
                                                            .length - 1
                                                    ].exam_date,
                                                    "YYYY-MM-DD"
                                                ).add(1, "d")
                                        }
                                        onDateChange={setSelectedDate}
                                    />
                                )}
                            </View>
                        </Field>
                    ) : null}
                    {entryType !== "Sarnaam Entry" &&
                        disciple?.sarnam_date !== null && (
                            <Field
                                label="Sarnaam"
                                enable={false}
                                value={disciple?.sarnam_date}
                                minDate={null}
                                onDateChange={(e) => { }}
                            />
                        )}
                    {entryType === "Sarnaam Entry" ? (
                        enableSarnam ? (
                            <Field
                                label={"Sarnaam"}
                                enable={enableSarnam}
                                value={selectedDate}
                                minDate={null}
                                onDateChange={setSelectedDate}
                            />
                        ) : disciple?.sarnam_date !== null ? (
                            <Field
                                label="Sarnaam"
                                enable={false}
                                value={disciple?.sarnam_date}
                                minDate={null}
                                onDateChange={(e) => { }}
                            />
                        ) : null
                    ) : null}
                    {disciple?.shuddhikaran.length > 0 && (
                        <>
                            <View
                                style={{
                                    marginVertical: 5,
                                    backgroundColor: theme.colors.primaryLight,
                                    height: 2,
                                }}
                            />
                            {disciple?.shuddhikaran.map((item, index) => (
                                <Field2
                                    key={index}
                                    label={`Shuddhikaran ${index + 1}`}
                                    value={item.date}
                                    enable={false}
                                    reason={item.description}
                                    onReasonChange={(e) => { }}
                                    onDateChange={(e) => { }}
                                />
                            ))}
                        </>
                    )}
                    {entryType === "Shuddhikaran Entry" && (
                        <Field2
                            label={`Shuddhikaran ${disciple?.shuddhikaran.length + 1
                                }`}
                            value={selectedDate}
                            enable={true}
                            reason={reason}
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
                                color: theme.colors.primaryLight,
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
                        source={{ uri: disciple?.avatar }}
                    />
                </View>
            </Modal>
        </ScrollView>
    );
};

export default Profile;
