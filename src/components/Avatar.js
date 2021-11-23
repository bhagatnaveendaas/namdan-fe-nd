import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import theme from "../constants/theme";
import { FONTS } from "../constants/fonts";
const defaultUserImage = require("../../assets/icons/user.png");

const Avatar = ({
    status,
    imageSource,
    uri,
    imageSize = 60,
    borderSize = 70,
}) => {
    return (
        <View style={[{ width: borderSize }, styles.imageWrapper]}>
            <View
                style={[
                    {
                        width: borderSize,
                        height: borderSize,
                        borderRadius: borderSize / 2,
                    },
                    styles.imageBorder,
                ]}
            >
                <Image
                    style={[
                        {
                            width: imageSize,
                            height: imageSize,
                            borderRadius: imageSize / 2,
                        },
                        styles.image,
                    ]}
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
        alignItems: "center",
        justifyContent: "center",
    },
    imageBorder: {
        borderWidth: 4,
        alignItems: "center",
        justifyContent: "center",
        borderColor: theme.colors.green,
        backgroundColor: theme.colors.white,
    },
    image: {},
    status: {
        color: theme.colors.white,
        backgroundColor: theme.colors.green,
        marginTop: 2,
        borderRadius: 5,
        ...FONTS.h6,
        paddingHorizontal: 5,
    },
});
