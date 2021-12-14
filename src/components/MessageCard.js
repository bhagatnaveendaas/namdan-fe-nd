import React, { memo } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import theme from "../constants/theme";
import Avatar from "../components/Avatar";
import { FONTS } from "../constants/fonts";
const userDefaultImage = require("../../assets/icons/user.png");

const MessageCard = ({ message, onPress }) => {
    const { subject, content } = message;
    return (
        <TouchableHighlight
            activeOpacity={1}
            style={{ marginHorizontal: 5, borderRadius: 8, marginBottom: 16 }}
            onPress={onPress}
        >
            <View style={styles.container}>
                <Avatar imageSource={userDefaultImage} />
                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: 10,
                        flexDirection: "column",
                    }}
                >
                    <Text style={styles.name}>{subject}</Text>

                    <Text style={styles.address}>
                        {content.substring(0, 90)}
                        <Text style={styles.more}>...more</Text>
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    );
};

export default memo(MessageCard);

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
        ...FONTS.h4,
        textTransform: "capitalize",
        color: theme.colors.primary,
    },
    address: {
        ...FONTS.body5,
    },
    more: {
        ...FONTS.h5,
        color: theme.colors.primary,
    },
});
