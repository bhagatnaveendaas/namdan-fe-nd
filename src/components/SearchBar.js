import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
} from "react-native";
import theme from "../constants/theme";

const crossImage = require("../../assets/icons/cross.png");
const searchImage = require("../../assets/icons/search.png");

const SeachBar = ({ value, setValue, onCancel }) => {
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 15,
                paddingVertical: 5,
                backgroundColor: "#EDEDEE",
                borderRadius: 50,
            }}
        >
            <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
                <Image
                    source={searchImage}
                    style={{ height: 25, width: 25, tintColor: "white" }}
                />
                <TextInput
                    style={{
                        marginLeft: 5,
                        flex: 1,
                        fontSize: 16,
                        lineHeight: 22,
                        fontFamily: theme.fonts.poppins.regular,
                    }}
                    value={value}
                    onChangeText={(text) => setValue(text)}
                />
            </View>

            {value !== "" && (
                <TouchableOpacity onPress={onCancel}>
                    <Image
                        source={crossImage}
                        style={{ height: 20, width: 20, tintColor: "gray" }}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default SeachBar;

const styles = StyleSheet.create({});
