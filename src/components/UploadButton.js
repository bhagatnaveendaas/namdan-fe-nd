import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, View, Image, Button } from "react-native";
import styles from "../styles/Common";
import theme from "../constants/theme";

function UploadButton({ label, onPressFn }) {
    return (
        // <View style={styles.inputField}>
            <TouchableOpacity style={styles.upload} onPress={onPressFn}>
                <View style={{ paddingRight: 10 }}>
                    <Image
                        source={require("../../assets/icons/pin.png")}
                        style={{ height: 18, width: 18, tintColor: theme.colors.primary }}
                    />
                </View>
                <Text style={styles.label}>{label}</Text>
            </TouchableOpacity>
        // </View>
    );
}

export default UploadButton;
