/* eslint-disable no-nested-ternary */
import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, View, Image, Button } from "react-native";
import {
    MaterialCommunityIcons,
    AntDesign,
    Feather,
    Ionicons,
} from "@expo/vector-icons";
import styles from "../styles/Common";
import * as WebBrowser from "expo-web-browser";

function Files({ data, removeSelectedFile, disableRemove }) {
    console.log({ data });
    const openFile = async (uri) => {
        // if (item.uri.includes("http")) {
        //     openFile(item.uri);
        // }
        await WebBrowser.openBrowserAsync(uri);
    };
    return data.map((item, index) => (
        <View
            style={[styles.inputField, { paddingVertical: "1%" }]}
            key={index}
        >
            <View
                style={[
                    { flexDirection: "row", justifyContent: "space-between" },
                    styles.container,
                ]}
            >
                <TouchableOpacity
                    onPress={() => {
                        // openFile(item.uri);
                        if (item.uri.includes("http")) {
                            openFile(item.uri);
                        }
                    }}
                    style={{ flexDirection: "row" }}
                >
                    <View>
                        <View style={{ paddingRight: 10 }}>
                            {item.name.toLowerCase().includes(".pdf") ? (
                                <MaterialCommunityIcons
                                    name="file-pdf-box-outline"
                                    size={24}
                                    color="#8A8A81"
                                />
                            ) : item.name.toLowerCase().includes(".jpg") ||
                              item.name.toLowerCase().includes(".jpeg") ||
                              item.name.toLowerCase().includes(".png") ? (
                                <Feather
                                    name="image"
                                    size={24}
                                    color="#8A8A81"
                                />
                            ) : (
                                <AntDesign
                                    name="file1"
                                    size={24}
                                    color="#8A8A81"
                                />
                            )}
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => {}} >
                        <Text style={styles.label}>{item.name}</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
                {!disableRemove && (
                    <TouchableOpacity
                        onPress={() => removeSelectedFile(index)}
                        style={{ alignSelf: "flex-end" }}
                    >
                        <Ionicons
                            name="close-sharp"
                            size={24}
                            color="#8A8A81"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    ));
}

export default Files;
