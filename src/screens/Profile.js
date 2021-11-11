import React, { useEffect } from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
    AsyncStorage,
} from "react-native";
import theme from "../constants/theme";
import Avatar from "../components/Avatar";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import { executeRequest } from "../helper/network/link";
import { getData } from "../httpClient/apiRequest";

const userDefaultImage = require("../../assets/icons/user.png");
const calenderImage = require("../../assets/icons/calendar.png");
const clockImage = require("../../assets/icons/clock.png");

const tempData = [
    { label: "Pratham Naam", value: "01/02/2021" },
    { label: "Hajri 1", value: "01/02/2021" },
    { label: "Hajri 2", value: "01/02/2021" },
    { label: "Hajri 3", value: "01/02/2021" },
    { label: "Sataam", value: "01/02/2021" },
    { label: "Sarnaam", value: "01/02/2021" },
    { label: "Sarshabd", value: "01/02/2021" },
];

const Field = ({ label, value, text }) => {
    return (
        <View
            style={{
                padding: 5,
                paddingHorizontal: 10,
                backgroundColor: theme.colors.lightGray,
                marginVertical: 4,
                borderRadius: 5,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            fontFamily: theme.fonts.poppins.semiBold,
                            fontSize: 14,
                            color: theme.colors.darkgray,
                        }}
                    >
                        {label}
                    </Text>
                    <Text>{value}</Text>
                </View>
                <Image
                    style={{ width: 25, height: 25, marginLeft: 10 }}
                    source={calenderImage}
                />
            </View>
            {text && (
                <Text
                    style={{
                        backgroundColor: theme.colors.white,
                        marginTop: 5,
                        padding: 5,
                        borderRadius: 5,
                        color: theme.colors.darkgray,
                    }}
                >
                    {text}
                </Text>
            )}
        </View>
    );
};

const Profile = ({ route, navigation }) => {
    const { user } = route.params;
    console.log(user.id);

    useEffect(() => {
        const load = async () => {
            try {
                const { data } = await getData(`/disciple/${user.id}/show`);
                console.log(data.data);
            } catch (error) {
                console.log(error);
            }
        };

        load();
    }, []);
    return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: theme.colors.white,
                    padding: 20,
                }}
            >
                <View
                    style={{
                        backgroundColor: theme.colors.white,
                        borderRadius: 8,
                        marginTop: 30,
                        elevation: 5,
                        padding: 15,
                    }}
                >
                    <View style={{ marginTop: -50, alignItems: "center" }}>
                        <Avatar
                            status={"Active"}
                            imageSource={userDefaultImage}
                        />
                    </View>
                    <View style={{ alignItems: "center", marginTop: 10 }}>
                        <Text
                            style={{
                                fontSize: 16,
                                color: theme.colors.primary,
                                fontFamily: theme.fonts.poppins.semiBold,
                                lineHeight: 18,
                            }}
                        >
                            {user.name}
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                color: theme.colors.primary,
                                fontFamily: theme.fonts.poppins.semiBold,
                                lineHeight: 18,
                            }}
                        >
                            {user.relation} {user.guardian_name}
                        </Text>
                        <Text>
                            Form No: <Text>{user.form_no}</Text>
                        </Text>
                        <Text>
                            Sadasyata No: <Text>12345</Text>
                        </Text>
                        <Text>
                            Date of Birth: <Text>12345</Text>
                        </Text>
                    </View>
                    <View style={{ marginVertical: 15 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text
                                style={{
                                    fontFamily: theme.fonts.poppins.semiBold,
                                    fontSize: 14,
                                    width: 90,
                                    color: theme.colors.darkgray,
                                }}
                            >
                                Mobile No:{" "}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: theme.fonts.poppins.regular,
                                    fontSize: 14,
                                    color: "black",
                                }}
                            >
                                {user.mobile_no}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text
                                style={{
                                    fontFamily: theme.fonts.poppins.semiBold,
                                    fontSize: 14,
                                    width: 90,
                                    color: theme.colors.darkgray,
                                }}
                            >
                                Address:{" "}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: theme.fonts.poppins.regular,
                                    fontSize: 14,
                                    color: "black",
                                    textTransform: "capitalize",
                                    width: 240,
                                }}
                            >
                                {user.address}
                                {", "}
                                {[
                                    user.tehsil_name,
                                    user.district_name,
                                    user.state_name,
                                    user.country_name,
                                ].join(", ")}
                            </Text>
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        marginVertical: 15,
                        padding: 5,
                        paddingHorizontal: 10,
                        backgroundColor: theme.colors.white,
                        borderRadius: 5,
                        flexDirection: "row",
                        elevation: 5,
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Text>View History</Text>
                    <Image
                        style={{ width: 25, height: 25, marginLeft: 10 }}
                        source={clockImage}
                    />
                </View>

                <View>
                    {tempData.map(({ label, value }, index) => (
                        <Field key={index} label={label} value={value} />
                    ))}
                    <View
                        style={{
                            marginVertical: 6,
                            backgroundColor: theme.colors.lightGray,
                            height: 2,
                        }}
                    />
                    <Field
                        label={"Suddhikaran 1"}
                        value={"29/10/2021"}
                        text={
                            "lorem ipsum publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visua"
                        }
                    />
                </View>
                <View
                    style={{
                        justifyContent: "center",
                        flexDirection: "row",
                        marginVertical: 30,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => console.log("Hold pressed")}
                        style={{
                            paddingHorizontal: 20,
                            paddingVertical: 5,
                            marginHorizontal: 10,
                            backgroundColor: theme.colors.yellow,
                            elevation: 3,
                            borderRadius: 10,
                        }}
                    >
                        <Text style={{ color: theme.colors.white }}>Hold</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => console.log("Ban pressed")}
                        style={{
                            paddingHorizontal: 20,
                            paddingVertical: 5,
                            marginHorizontal: 10,
                            backgroundColor: theme.colors.red,
                            elevation: 3,
                            borderRadius: 10,
                        }}
                    >
                        <Text style={{ color: theme.colors.white }}>Ban</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default Profile;

const styles = StyleSheet.create({});
