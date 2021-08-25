import React from "react";
import { Image, Text, View, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import theme from "../constants/theme";

const { width } = Dimensions.get("window");


const RoundIconButton = ({ handleClick, iconName, label }) => (
    <TouchableOpacity onPress={handleClick}>
        <View style={{ alignContent: "center", alignSelf: "center" }}>
            <Image
                style={{ height: width * 0.2, width: width * 0.2 }}
                source={iconName}
            />
            <Text style={{ fontSize: 13, textAlign: "center", fontFamily:theme.fonts.poppins.regular }}>{label}</Text>
        </View>
    </TouchableOpacity>
);

export default RoundIconButton;
