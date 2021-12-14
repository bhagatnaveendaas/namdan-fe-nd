import React, { useEffect, useState } from "react";
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
import AwesomeAlert from "react-native-awesome-alerts";
import Field from "../components/ProfileField";
import Field2 from "../components/ProfileField2";
import Field3 from "../components/ProfileField3";
import { FONTS, SIZES } from "../constants/fonts";
import { getData, postJsonData } from "../httpClient/apiRequest";
import styles from "../styles/Profile";
import moment from "moment";
import { countMonths, countDays } from "../utilities/DateUtils";
const userDefaultImage = require("../../assets/icons/user.png");
const clockImage = require("../../assets/icons/clock.png");
import { useAuth } from "../context/AuthContext";

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

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const { state } = useAuth();
    const AuthUser = state?.user;
    const permissions = AuthUser?.permissions;
    console.log(permissions);
    const getProfileData = async () => {
        try {
            const { data } = await getData("/user/profile");
            let location = {};

            const {
                data: { user_info, ...rest },
            } = data;
            location.district_name = user_info.district;
            location.country_name = user_info.country;
            location.state_name = user_info.state;
            location.tehsil_name = user_info.tehsil;
            location.city_name = user_info.city;

            setUser({ ...rest, ...location });
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getProfileData();
    }, []);
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
                        onPress={() => setShowModal(true)}
                        style={{
                            width: 110,
                            marginTop: -55,
                            alignSelf: "center",
                            alignItems: "center",
                        }}
                    >
                        <Avatar
                            borderSize={110}
                            imageSize={100}
                            status={"Active"}
                            uri={user && user.avatar}
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
                            {user?.name} {user?.relation} {user?.guardian_name}
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
                                {user?.form_no}
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
                                {moment(user?.dob).format("DD-MM-YYYY")}
                            </Text>
                        </Text>
                        {user?.namdan_center_name && (
                            <Text
                                allowFontScaling={false}
                                style={{
                                    color: theme.colors.primary,
                                    ...FONTS.body5,
                                }}
                            >
                                Naamdan Center:{" "}
                                <Text style={{ ...FONTS.body5 }}>
                                    {user?.namdan_center_name}
                                </Text>
                            </Text>
                        )}
                        <Text
                            allowFontScaling={false}
                            style={{
                                color: theme.colors.primary,
                                ...FONTS.body5,
                            }}
                        >
                            Naamdan Taken:{" "}
                            <Text style={{ ...FONTS.body5 }}>
                                {user?.namdan_taken}
                            </Text>
                        </Text>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <FieldLine
                            label={"Mobile No."}
                            value={user?.mobile_no}
                        />
                        {user?.whatsapp_no !== null && (
                            <FieldLine
                                label={"Whatsapp No."}
                                value={user?.whatsapp_no}
                            />
                        )}
                        <FieldLine
                            label={"Address"}
                            value={[
                                user?.address,
                                user?.tehsil_name,
                                user?.district_name,
                                user?.state_name,
                                user?.country_name ?? null,
                                user?.pincode ?? null,
                            ].join(", ")}
                        />
                        {user?.occupation !== null && (
                            <FieldLine
                                label={"Occupation"}
                                value={user?.occupation}
                            />
                        )}
                        {user?.unique_id !== null && (
                            <FieldLine
                                label={"Aadhaar No."}
                                value={user?.unique_id}
                            />
                        )}
                        {user?.email !== null && (
                            <FieldLine label={"Email ID"} value={user?.email} />
                        )}
                    </View>

                    {user?.history.length > 0 && (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.push("History", {
                                    history: disciple?.history,
                                })
                            }
                            style={styles.historyBtn}
                        >
                            <Text
                                allowFontScaling={false}
                                style={{ ...FONTS.h5 }}
                            >
                                View History
                            </Text>
                            <Image
                                style={{
                                    width: 25,
                                    height: 25,
                                    marginLeft: 10,
                                }}
                                source={clockImage}
                            />
                        </TouchableOpacity>
                    )}
                </View>
                <View style={{ marginVertical: 15 }}>
                    <Field
                        label={
                            user?.history.length > 0
                                ? `Punar Updesh ${user?.history.length}`
                                : "Pratham Naam"
                        }
                        value={user?.form_date}
                        enable={false}
                    />
                    {user?.satnam_attendance.map((attendance, i) => {
                        return (
                            <Field
                                key={i}
                                label={`Hajri${i + 1}`}
                                value={attendance?.attendance_date}
                            />
                        );
                    })}
                    <Field
                        label="Satnaam"
                        value={user?.satnam_date}
                        enable={false}
                    >
                        <View
                            style={{
                                backgroundColor: "white",
                                paddingHorizontal: 5,
                            }}
                        >
                            {user?.satnam_exam.map((item, index) => {
                                return (
                                    <Field3
                                        key={index}
                                        label={`Exam ${index + 1}`}
                                        value={item.exam_date}
                                    />
                                );
                            })}
                        </View>
                    </Field>
                    <Field label={`Sarnam`} value={user?.sarnam_date} />
                    <Field label={`Sarshabd`} value={user?.sarshabd_date} />
                    {user?.shuddhikaran.map((item, index) => (
                        <Field2
                            key={index}
                            label={`Shuddhikaran ${index + 1}`}
                            value={item.date}
                            reason={item.description}
                        />
                    ))}
                    {user?.history.map((item, index) => (
                        <Field2
                            key={index}
                            label={`Punar Updesh  ${index + 1}`}
                            value={item.date}
                            reason={item.description}
                        />
                    ))}
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text
                        style={{
                            ...FONTS.h3,
                            color: theme.colors.primary,
                            marginBottom: 10,
                        }}
                    >
                        Permissions
                    </Text>
                    {permissions.map((item, index) => (
                        <Text
                            key={index}
                            style={{
                                ...FONTS.body4,
                                color: theme.colors.primary,
                                textTransform: "capitalize",
                                marginBottom: 5,
                            }}
                        >
                            {item.replace(/_/g, " ")}
                        </Text>
                    ))}
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
                        source={{ uri: user?.avatar }}
                    />
                </View>
            </Modal>
        </ScrollView>
    );
};

export default UserProfile;
