import React from "react";
import { View, Text } from "react-native";
import theme from "../constants/theme";

const DashboardHeading = ({ label }) => (
    <View
        style={{
            paddingBottom: "2%",
            paddingTop: "3%",
            paddingHorizontal: "1%",
        }}
    >
        <Text style={{ fontFamily: theme.fonts.poppins.semiBold }}>
            {label}
        </Text>
    </View>
);

export default DashboardHeading;
