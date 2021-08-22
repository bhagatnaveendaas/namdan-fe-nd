import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, View, Image, Button } from "react-native";
import styles from "../styles/Common";

function UploadButton({ label, onPressFn }) {
    return (
        <View style={styles.inputField}>
            <TouchableOpacity style={styles.container} onPress={onPressFn}>
                <View style={{ paddingRight: 10 }}>
                    <Image
                        source={require("../../assets/icons/pin.png")}
                        style={{ height: 18, width: 18 }}
                    />
                </View>
                <Text style={styles.label}>{label}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default UploadButton;
