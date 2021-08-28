import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import theme from "../../../constants/theme";
const userDefaultImage = require("../../../../assets/icons/user.png")

const UserListRowItem = (props) => {
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        setUserInfo(props.user);
    }, [props.user]);

    const [
        useDefaultImage,
        setUseDefaultImage
    ] = useState(false)
    return (
        <TouchableOpacity
            onPress={
                () => {
                    props.onClickHandler && props.onClickHandler(userInfo)
                }
            }
            style={{
                width: "100%",
                height: 64,
                elevation: 20,
                flexDirection: "row",
                backgroundColor: "#FFFFFF",
                marginTop: 6,
                marginBottom: 6,
                borderRadius: 8,
                alignContent: 'center',
                justifyContent: 'center'
            }}
        >
            <View
                style={{
                    margin: 8,
                    flex: 1,
                    alignContent: 'center',
                    justifyContent: 'center',
                    flexDirection: "row",
                }}
            >
                <Image
                    source={
                        userDefaultImage
                    }
                    style={{
                        borderRadius: 8,
                        width: 30,
                        height: 30,
                        shadowColor: "#000000",
                    }}
                    onError={
                        () => {
                            setUseDefaultImage(true)
                        }
                    }
                />
                <View
                    style={{
                        marginLeft: 10,
                        flexDirection: "column",
                        alignContent: "flex-start",
                        justifyContent: "space-between",
                        flex: 1,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            flex: 1,
                            color: "#3C3C3C",
                            fontFamily: theme.fonts.poppins.semiBold,
                            textTransform: "capitalize",
                        }}
                    >
                        {userInfo && userInfo.name && userInfo.name.trim()}
                    </Text>
                    <Text
                        style={{
                            flex: 1,
                            color: "#3C3C3C",
                            fontFamily: theme.fonts.poppins.regular,
                            textTransform: "capitalize",
                        }}
                    >
                        {userInfo && ([userInfo.district_name, userInfo.state_name, userInfo.country_name].join(", ") )}
                    </Text>
                    <Text
                        style={{
                            flex: 1,
                            color: "#3C3C3C",
                            fontFamily: theme.fonts.poppins.regular,
                            textTransform: "capitalize",
                        }}
                    >
                        {userInfo && userInfo.mobile_no}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default UserListRowItem;
