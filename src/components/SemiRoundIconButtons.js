import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import theme from "../constants/theme";

const { height } = Dimensions.get("window");

const SemiRoundIconButtons = ({ label, icon, pressHandler }) => (
    <View
        style={[
            {
                width: "49%",
                marginTop: "2%",
                paddingHorizontal: label.length > 20 ? "5%" : "8%",
            },
            theme.semiRoundCard,
        ]}
    >
        <TouchableOpacity
            onPress={pressHandler}
            style={{
                flexDirection: "row",
                justifyContent: "space-around",
            }}
        >
            <Image
                style={{ height: height * 0.03, width: height * 0.03 }}
                source={icon}
            />
            <Text
                style={{
                    alignContent: "center",
                    alignSelf: "center",
                    alignItems: "center",
                    ...theme.sizes.regular,
                    fontFamily: theme.fonts.poppins.regular,
                }}
            >
                {label}{" "}
            </Text>
        </TouchableOpacity>
    </View>
);

export default SemiRoundIconButtons;
