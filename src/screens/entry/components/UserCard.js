import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
} from "react-native";
import theme from "../../../constants/theme";
import Avatar from "../../../components/Avatar";
const userDefaultImage = require("../../../../assets/icons/user.png");

const UserCard = ({ user, onPress }) => {
    // console.log(user.name)
    const { tehsil_name, district_name, state_name, country_name } = user;
    const numbers = ["1", "2", "3", "4"];
    return (
        <TouchableHighlight
            activeOpacity={1}
            style={{ borderRadius: 8 }}
            onPress={onPress}
        >
            <View style={styles.container}>
                <Avatar imageSource={userDefaultImage} status={"Active"} />
                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: 10,
                    }}
                >
                    <Text style={styles.name}>
                        {user.name.trim()} {user.relation.trim()}{" "}
                        {user.guardian_name.trim()}
                    </Text>

                    <Text style={styles.address}>
                        {[
                            tehsil_name,
                            district_name,
                            state_name,
                            country_name,
                        ].join(", ")}
                    </Text>
                    <Text style={styles.phone}>{user.mobile_no}</Text>
                </View>
                <View style={{ width: 35 }}>
                    {numbers.map((item, index) => {
                        return (
                            <View
                                key={index}
                                style={{
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor:
                                        index <= 1
                                            ? theme.colors.primary
                                            : theme.colors.grey,
                                    borderTopWidth: index > 0 ? 1 : 0,
                                    borderTopColor:
                                        index > 0
                                            ? theme.colors.white
                                            : theme.colors.primary,
                                }}
                            >
                                <Text
                                    style={{
                                        color:
                                            index <= 1
                                                ? theme.colors.white
                                                : theme.colors.primary,
                                    }}
                                >
                                    {item}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </View>
        </TouchableHighlight>
    );
};

export default UserCard;

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
        fontSize: 16,
        lineHeight: 22,
        fontFamily: theme.fonts.poppins.semiBold,
        textTransform: "capitalize",
    },
    address: {
        fontSize: 14,
        lineHeight: 22,
        fontFamily: theme.fonts.poppins.regular,
        textTransform: "capitalize",
    },
    phone: {
        fontSize: 14,
        lineHeight: 22,
        fontFamily: theme.fonts.poppins.regular,
        textTransform: "capitalize",
    },
});
