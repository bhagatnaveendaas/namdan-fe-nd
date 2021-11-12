import React, { useState } from "react";
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
}) => {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const sortedItems = data.filter((item) =>
        new RegExp(`${search}`, "gi").test(item.name)
    );

    const onItemSelected = (item) => {
        setOpen(false);
        onValueChange(item.id);
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
