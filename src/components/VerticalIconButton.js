import React from "react";
import { View, Text, Image, Dimensions } from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import theme from "../constants/theme";

const { height, width } = Dimensions.get("window");

const VerticalIconButton = ({ label, icon, pressHandler }) => (
    <View
        style={{
            width: "30%",
            elevation: 5,
            marginBottom: 10,
            backgroundColor: "white",
            borderRadius: 15,
            paddingVertical: 10,
        }}
    >
        <TouchableOpacity
            style={{ alignItems: "center", justifyContent: "center" }}
            onPress={pressHandler}
        >
            <Image source={icon} style={{ width: 60, height: 60 }} />
            <Text
                style={{
                    marginTop: 5,
                    color: theme.colors.primary,
                    fontFamily: theme.fonts.poppins.regular,
                    fontSize: 13
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    </View>
);

export default VerticalIconButton;
