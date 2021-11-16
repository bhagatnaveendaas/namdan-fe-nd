import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import theme from "../constants/theme";
import Avatar from "../components/Avatar";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FONTS } from "../constants/fonts";

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
                        allowFontScaling={false}
                        style={{
                            color: theme.colors.darkgray,
                            ...FONTS.h5,
                        }}
                    >
                        {label}
                    </Text>
                    <Text allowFontScaling={false} style={{ ...FONTS.body5 }}>
                        {value}
                    </Text>
                </View>
                <Image
                    style={{ width: 25, height: 25, marginLeft: 10 }}
                    source={calenderImage}
                />
            </View>
            {text && (
                <Text
                    allowFontScaling={false}
                    style={{
                        backgroundColor: theme.colors.white,
                        marginTop: 5,
                        padding: 5,
                        borderRadius: 5,
                        color: theme.colors.darkgray,
                        ...FONTS.body5,
                    }}
                >
                    {text}
                </Text>
            )}
        </View>
    );
};

const Profile = ({ route, navigation }) => {
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
                            allowFontScaling={false}
                            style={{
                                color: theme.colors.primary,
                                ...FONTS.h3,
                            }}
                        >
                            {/* {user.name} */}
                            Name
                        </Text>
                        <Text
                            allowFontScaling={false}
                            style={{
                                ...FONTS.h3,
                                color: theme.colors.primary,
                            }}
                        >
                            {/* {user.relation} {user.guardian_name} */}
                            S/O Guardian Name
                        </Text>
                        <Text
                            allowFontScaling={false}
                            style={{ ...FONTS.body5 }}
                        >
                            Form No:{" "}
                            <Text style={{ ...FONTS.body5 }}>1234456</Text>
                        </Text>
                        <Text
                            allowFontScaling={false}
                            style={{ ...FONTS.body5 }}
                        >
                            Sadasyata No:{" "}
                            <Text style={{ ...FONTS.body5 }}>12345</Text>
                        </Text>
                        <Text
                            allowFontScaling={false}
                            style={{ ...FONTS.body5 }}
                        >
                            Date of Birth:{" "}
                            <Text style={{ ...FONTS.body5 }}>12345</Text>
                        </Text>
                    </View>
                    <View style={{ marginVertical: 15 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text
                                allowFontScaling={false}
                                style={{
                                    ...FONTS.h5,
                                    width: 90,
                                    color: theme.colors.darkgray,
                                }}
                            >
                                Mobile No:{" "}
                            </Text>
                            <Text
                                allowFontScaling={false}
                                style={{
                                    ...FONTS.body5,
                                    color: "black",
                                }}
                            >
                                {/* {user.mobile_no} */}
                                1234567890
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text
                                allowFontScaling={false}
                                style={{
                                    ...FONTS.h5,
                                    width: 90,
                                    color: theme.colors.darkgray,
                                }}
                            >
                                Address:{" "}
                            </Text>
                            <Text
                                allowFontScaling={false}
                                style={{
                                    ...FONTS.body5,
                                    color: "black",
                                    textTransform: "capitalize",
                                    width: 240,
                                }}
                            >
                                Address
                                {/* {user.address}
                                {", "}
                                {[
                                    user.tehsil_name,
                                    user.district_name,
                                    user.state_name,
                                    user.country_name,
                                ].join(", ")} */}
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
                    <Text allowFontScaling={false} style={{ ...FONTS.h5 }}>
                        View History
                    </Text>
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
                        <Text
                            allowFontScaling={false}
                            style={{ color: theme.colors.white }}
                        >
                            Hold
                        </Text>
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
                        <Text
                            allowFontScaling={false}
                            style={{ color: theme.colors.white }}
                        >
                            Ban
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default Profile;

const styles = StyleSheet.create({});
