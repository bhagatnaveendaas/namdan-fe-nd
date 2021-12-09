import React, { memo } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Linking,
    TouchableHighlight,
} from "react-native";
import theme from "../../../constants/theme";
import Avatar from "../../../components/Avatar";
import { FONTS } from "../../../constants/fonts";
const userDefaultImage = require("../../../../assets/icons/user.png");

const UserCard = ({ user, onPress }) => {
    const {
        tehsil_name,
        district_name,
        state_name,
        country_name,
        form_date,
        satnam_date,
        sarnam_date,
        sarshabd_date,
    } = user;

    let avatar = user?.avatar;
    const naamLevel = [form_date, satnam_date, sarnam_date, sarshabd_date];
    return (
        <TouchableHighlight
            activeOpacity={1}
            style={{ marginHorizontal: 5, borderRadius: 8, marginBottom: 16 }}
            onPress={onPress}
        >
            <View style={styles.container}>
                <Avatar
                    uri={avatar && avatar}
                    imageSource={userDefaultImage}
                    status={"Active"}
                />
                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: 10,
                        flexDirection: "column",
                    }}
                >
                    <Text style={styles.name}>
                        {user.name.trim()} {user.relation.trim()}{" "}
                        {user.guardian_name.trim()}
                    </Text>

                    <Text style={styles.address}>
                        {[
                            tehsil_name ?? user?.tehsil_name1,
                            district_name,
                            state_name,
                            country_name,
                        ].join(", ")}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text
                            onPress={() => {
                                Linking.openURL(
                                    `tel:${user.mobile_no.substr(
                                        user.mobile_no.length - 10
                                    )}`
                                );
                            }}
                            style={styles.phone}
                        >
                            {user.mobile_no}
                        </Text>
                        {/* <Text
                            onPress={() => {
                                Linking.openURL(
                                    `tel:${user.mobile_no.substr(
                                        user.mobile_no.length - 10
                                    )}`
                                );
                            }}
                            style={[styles.phone, { marginLeft: 5 }]}
                        >
                            {user?.mobile_no}
                        </Text> */}
                    </View>
                </View>
                <View style={{ width: 35 }}>
                    {naamLevel.map((item, index) => {
                        return (
                            <View
                                key={index}
                                style={{
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor:
                                        item !== null
                                            ? theme.colors.primary
                                            : theme.colors.grey,
                                    borderTopWidth: 1,
                                    borderTopColor: theme.colors.white,
                                }}
                            >
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        ...FONTS.h5,
                                        color:
                                            item !== null
                                                ? theme.colors.white
                                                : theme.colors.primary,
                                    }}
                                >
                                    {index + 1}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </View>
        </TouchableHighlight>
    );
};

export default memo(UserCard);

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 110,
        elevation: 5,
        flexDirection: "row",
        backgroundColor: theme.colors.white,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        paddingLeft: 10,
    },
    name: {
        ...FONTS.h5,
        textTransform: "capitalize",
    },
    address: {
        ...FONTS.body5,
        textTransform: "capitalize",
    },
    phone: {
        ...FONTS.h5,
        textTransform: "capitalize",
        color: theme.colors.primary,
    },
});
