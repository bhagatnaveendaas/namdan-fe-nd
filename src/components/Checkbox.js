import React, { memo } from "react";
import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import theme from "../constants/theme";

const Checkbox = ({ checked, setChecked }) => {
    return (
        <TouchableOpacity
            onPress={setChecked}
            style={[
                styles.box,
                { backgroundColor: checked ? "white" : "transparent" },
            ]}
        >
            <Image
                source={require("../../assets/check.png")}
                style={{
                    width: 20,
                    height: 20,
                    tintColor: theme.colors.primary,
                }}
            />
        </TouchableOpacity>
    );
};

export default memo(Checkbox);

const styles = StyleSheet.create({
    box: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderColor: theme.colors.primaryLight,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",

        // backgroundColor: theme.colors.primaryLight,
    },
});
