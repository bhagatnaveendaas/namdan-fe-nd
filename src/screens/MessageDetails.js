import React from "react";
import { ScrollView, Text } from "react-native";
import { FONTS } from "../constants/fonts";
import theme from "../constants/theme";

const MessageDetails = ({ navigation, route }) => {
    const { subject, content } = route.params.message;
    return (
        <ScrollView
            style={{
                flex: 1,
                padding: 15,
                backgroundColor: theme.colors.white,
            }}
        >
            <Text
                style={{
                    ...FONTS.h2,
                    color: theme.colors.primary,
                    marginBottom: 10,
                    textAlign: "center",
                }}
            >
                {subject}
            </Text>
            <Text
                style={{
                    ...FONTS.body3,
                    color: theme.colors.primary,
                    marginBottom: 10,
                }}
            >
                {content}
            </Text>
        </ScrollView>
    );
};

export default MessageDetails;
