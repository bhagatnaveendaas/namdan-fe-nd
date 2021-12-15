import React, { useState, memo, useCallback } from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    View,
} from "react-native";
import styles from "../../styles/FormInput";
import searchbleFlatlistStyles from "./SearchbleFlatlistStyles";

const SearchableFlatlist = ({
    data,
    label,
    placeholderText,
    required,
    containerStyle,
    onValueChange,
    setEnableSearch,
    defaultValue,
    wrapperStyle,
    disabled,
}) => {
    const defaultOption = data.filter((item) => {
        if (typeof item === "string") {
            return item === defaultValue;
        } else return item.id == defaultValue;
    });
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(defaultOption[0]);

    const sortedItems = data.filter((item) =>
        new RegExp(`${search}`, "gi").test(
            typeof item === "string" ? item : item?.name
        )
    );

    const openOnPress = useCallback(() => {
        if (disabled) return;
        setOpen(true);
    }, []);

    const onItemSelected = (item) => {
        setSelectedItem(item);
        onValueChange(typeof item === "string" ? item : item?.id);
        setSearch("");
        setOpen(false);
    };

    return (
        <View style={[styles.wrapper, wrapperStyle, { position: "relative" }]}>
            {label && (
                <Text
                    allowFontScaling={false}
                    style={[styles.label, { marginBottom: -4 }]}
                >
                    {label}
                    {required && <Text style={styles.required}>{" *"}</Text>}
                </Text>
            )}
            <View style={[styles.container, containerStyle]}>
                {open ? (
                    <TextInput
                        allowFontScaling={false}
                        onFocus={() => {
                            setEnableSearch(true);
                        }}
                        autoFocus={true}
                        value={search}
                        style={styles.input}
                        placeholderTextColor={styles.placeholderColor.color}
                        placeholder={placeholderText}
                        onChangeText={(text) => setSearch(text)}
                        onBlur={() => {
                            setEnableSearch(false);
                            setOpen(false);
                        }}
                    />
                ) : (
                    <TouchableOpacity
                        onPress={openOnPress}
                        style={{
                            width: "100%",
                            height: 40,
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            allowFontScaling={false}
                            style={searchbleFlatlistStyles.itemText}
                        >
                            {typeof defaultValue === "string" ? (
                                defaultValue === "" ? (
                                    <Text
                                        style={
                                            searchbleFlatlistStyles.placeholderText
                                        }
                                    >
                                        {placeholderText}
                                    </Text>
                                ) : (
                                    defaultOption[0]
                                )
                            ) : defaultValue !== 0 ? (
                                defaultOption[0]?.name
                            ) : (
                                <Text
                                    style={
                                        searchbleFlatlistStyles.placeholderText
                                    }
                                >
                                    {placeholderText}
                                </Text>
                            )}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
            {open && (
                <ScrollView
                    nestedScrollEnabled={true}
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="always"
                    showsVerticalScrollIndicator={false}
                    style={searchbleFlatlistStyles.dropdown}
                >
                    {sortedItems.map((item, index) => {
                        return (
                            <View key={index}>
                                <TouchableOpacity
                                    style={searchbleFlatlistStyles.dropdownItem}
                                    onPress={() => onItemSelected(item)}
                                >
                                    <Text
                                        style={searchbleFlatlistStyles.itemText}
                                    >
                                        {typeof item === "string"
                                            ? item
                                            : item.name}
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

export default memo(SearchableFlatlist);
