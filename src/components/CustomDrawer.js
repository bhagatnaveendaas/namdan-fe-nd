import React from "react";
import { View, Text, TouchableOpacity, AsyncStorage } from "react-native";
import {
    DrawerItemList,
    DrawerContentScrollView,
    DrawerItem,
} from "@react-navigation/drawer";
import { FONTS } from "../constants/fonts";
import theme from "../constants/theme";
import { useAuth } from "../context/AuthContext";
import { deleteData } from "../httpClient/apiRequest";
import Avatar from "./Avatar";
const defaultImage = require("../../assets/icons/user.png");
const visibleItems = ["Dashboard", "SettingsScreen", "HelpScreen"];

const getVisible = (item) => contains(item.key, visibleItems);
const CustomDrawer = (props) => {
    const {
        state: { user },
        dispatch,
    } = useAuth();

    const { role, name, avatar } = user;

    const logout = async () => {
        try {
            const { data } = await deleteData("/auth/logout");
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("user");
            console.log(data);
            props.navigation.closeDrawer();
            dispatch({
                type: "LOGOUT_USER",
            });
        } catch (error) {
            if (error && error.response) {
                console.error(error.response.data.error);
            } else {
                console.log(`Error in logging out.`, error);
            }
        }
    };
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View
                    style={{
                        flexDirection: "row",
                        margin: 10,
                        paddingBottom: 10,
                        borderBottomColor: theme.colors.primaryLight,
                        borderBottomWidth: 4,
                    }}
                >
                    <Avatar uri={avatar && avatar} imageSource={defaultImage} />
                    <View style={{ flex: 1, marginLeft: 15 }}>
                        <Text
                            allowFontScaling={false}
                            style={{ color: theme.colors.primary, ...FONTS.h4 }}
                        >
                            {name}
                        </Text>
                        <Text
                            allowFontScaling={false}
                            style={{
                                color: theme.colors.primary,
                                ...FONTS.body4,
                            }}
                        >
                            {role}
                        </Text>
                    </View>
                </View>
                {/* <DrawerItemList {...props} /> */}
                <TouchableOpacity>
                    <View
                        style={{
                            margin: 10,
                            paddingHorizontal: 10,
                            paddingVertical: 12,
                            borderRadius: 10,
                            backgroundColor: theme.colors.primaryLight,
                        }}
                    >
                        <Text
                            style={{
                                color: theme.colors.primary,
                                ...FONTS.h3,
                                fontSize: 18,
                            }}
                        >
                            Profile
                        </Text>
                    </View>
                </TouchableOpacity>
            </DrawerContentScrollView>
            <TouchableOpacity
                style={{
                    padding: 20,
                    width: "100%",
                    borderTopColor: theme.colors.primaryLight,
                    borderTopWidth: 1,
                }}
                onPress={logout}
            >
                <Text
                    allowFontScaling={false}
                    style={{ ...FONTS.h3, color: theme.colors.primary }}
                >
                    Logout
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default CustomDrawer;
