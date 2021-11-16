import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import theme from "../constants/theme";
import { FONTS } from "../constants/fonts";
const defaultUserImage = require("../../assets/icons/user.png");

const Avatar = ({ status, imageSource, uri }) => {
    return (
        <View style={styles.imageWrapper}>
            <View style={styles.imageBorder}>
                <Image
                    style={styles.image}
                    source={uri ? { uri } : imageSource}
                />
            </View>
            {status && (
                <Text allowFontScaling={false} style={styles.status}>
                    {status}
                </Text>
            )}
        </View>
    );
};

export default Avatar;

const styles = StyleSheet.create({
    imageWrapper: {
        width: 70,
        alignItems: "center",
        justifyContent: "center",
    },
    imageBorder: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 4,
        alignItems: "center",
        justifyContent: "center",
        borderColor: theme.colors.green,
        backgroundColor: theme.colors.white,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    status: {
        color: theme.colors.white,
        backgroundColor: theme.colors.green,
        marginTop: 2,
        borderRadius: 5,
        ...FONTS.h6,
        paddingHorizontal: 5,
    },
});
