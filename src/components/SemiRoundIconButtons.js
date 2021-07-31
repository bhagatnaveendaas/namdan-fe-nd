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
                justifyContent: "space-between",
                paddingVertical: "4%",
            }}
        >
            <Image
                style={{ height: height * 0.07, width: height * 0.065 }}
                source={icon}
            />
            <Text
                style={{
                    alignContent: "center",
                    alignSelf: "center",
                    alignItems: "center",
                    fontSize: 16,
                }}
            >
                {label}{" "}
            </Text>
        </TouchableOpacity>
    </View>
);

export default SemiRoundIconButtons;
