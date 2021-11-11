import React, { useState } from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    View,
} from "react-native";
import styles from "../styles/FormInput";
import theme from "../constants/theme";

const SearchableFlatlist = ({
    data,
    label,
    placeholderText,
    required,
    containerStyle,
    onValueChagne,
}) => {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const sortedItems = data.filter((item) =>
        new RegExp(`${search}`, "gi").test(item.name)
    );

    const onItemSelected = (item) => {
        setOpen(false);
        onValueChagne(item.id);
        setSearch(item.name.toUpperCase());
    };

    return (
        <View style={[styles.wrapper, { position: "relative" }]}>
            {label && (
                <Text style={[styles.label, { marginBottom: -4 }]}>
                    {label}
                    {required && <Text style={styles.required}>{" *"}</Text>}
                </Text>
            )}
            <View style={[styles.container, containerStyle]}>
                <TextInput
                    onFocus={() => setOpen(true)}
                    value={search}
                    style={styles.input}
                    placeholderTextColor={styles.placeholderColor.color}
                    placeholder={placeholderText}
                    onChangeText={(text) => setSearch(text)}
                />
            </View>
            {open && (
                <ScrollView
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    style={{
                        position: "absolute",
                        top: "110%",
                        backgroundColor: theme.colors.white,
                        borderWidth: 1,
                        borderColor: theme.colors.primaryLight,
                        width: "100%",
                        zIndex: 10,
                        borderRadius: 10,
                        paddingHorizontal: 5,
                        height:
                            sortedItems.length === 1
                                ? 50
                                : sortedItems.length === 2
                                ? 100
                                : 150,
                        elevation: 5,
                        paddingVertical: 5,
                    }}
                >
                    {sortedItems.map((item, index) => {
                        return (
                            <View key={index}>
                                <TouchableOpacity
                                    style={{
                                        padding: 10,
                                        borderBottomColor:
                                            theme.colors.primaryLight,
                                        borderBottomWidth: 1,
                                        marginBottom: 2,
                                    }}
                                    onPress={() => onItemSelected(item)}
                                >
                                    <Text
                                        style={{
                                            fontFamily:
                                                theme.fonts.poppins.regular,
                                            color: theme.colors.primary,
                                            fontSize: 15,
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </ScrollView>
            )}
        </View>
    );
};

export default SearchableFlatlist;
