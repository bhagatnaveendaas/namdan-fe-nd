import React, { useState, useRef, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import {
    View,
    Text,
    Platform,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { FONTS } from "../constants/fonts";
import theme from "../constants/theme";
import FormTextInput from "../components/FormTextInput";
import CountryCodePicker from "../components/CountryCodePicker";
import styles from "../styles/Singup";
import { postJsonData } from "../httpClient/apiRequest";
import UserCard from "./entry/components/UserCard";
import { searchDiscipleUrl } from "../constants/routes";
const filterIcon = require("../../assets/icons/filter.png");

const Search = ({ navigation, route }) => {
    const filterOptions = [
        {
            value: "mobile_no",
            label: "Search By Mobile Number",
        },
        {
            value: "unique_id",
            label: "Search By Aadhaar Number",
        },
    ];
    const [users, setUsers] = useState([]);
    const [notFoundText, setNotFoundText] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchBy, setSearchBy] = useState(filterOptions[0].value);
    const [search, setSearch] = useState("");
    const [code, setCode] = useState("+91");
    const codeRef = useRef();
    const filterRef = useRef();

    useEffect(() => {
        navigation.setOptions({
            title: `${route.params?.entryType ?? "Search"}`,
        });
    }, []);

    const searchDisciple = async () => {
        setLoading(true);
        try {
            const { data } = await postJsonData(searchDiscipleUrl, {
                search_by: searchBy,
                search_value: searchBy === "mobile_no" ? code + search : search,
            });

            if (data?.data) {
                if (data?.data.length === 0) {
                    setNotFoundText("No entry found for this ");
                }
                setUsers(data?.data);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            if (error && error.response) {
                console.error(error.response.data.error);
                alert(error.response.data.error);
            } else {
                console.error(`Error which searching disciple.`, error);
            }
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.white }}>
            <View
                style={{
                    marginHorizontal: 15,
                }}
            >
                <FormTextInput
                    value={search}
                    placeholder={
                        searchBy === "mobile_no"
                            ? "Enter your mobile number"
                            : "Enter your aadhar number"
                    }
                    required={true}
                    keyboardType={
                        Platform.OS === "android" ? "numeric" : "number-pad"
                    }
                    returnKeyType="search"
                    maxLength={searchBy === "mobile_no" ? 10 : 12}
                    containerStyle={{
                        backgroundColor: theme.colors.primaryLight,
                        paddingHorizontal: 10,
                        paddingVertical: 15,
                        height: 50,
                        borderRadius: 50,
                    }}
                    onFocus={() => setNotFoundText("")}
                    placeholderColor={theme.colors.primary}
                    onChangeText={(text) => setSearch(text)}
                    onSubmitEditing={searchDisciple}
                    textStyle={{ marginLeft: 10 }}
                    prependComponent={
                        searchBy === "mobile_no" && (
                            <TouchableOpacity
                                onPress={() => codeRef?.current.focus()}
                                style={[
                                    styles.countryCodeBtn,
                                    { borderColor: theme.colors.primary },
                                ]}
                            >
                                <Text
                                    style={{
                                        color: theme.colors.primary,
                                        ...FONTS.h3,
                                    }}
                                >
                                    {code}
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                    appendComponent={
                        <TouchableOpacity
                            style={{ marginRight: 10 }}
                            onPress={() => filterRef?.current.focus()}
                        >
                            <Image
                                source={filterIcon}
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: theme.colors.primary,
                                }}
                            />
                        </TouchableOpacity>
                    }
                />
                <CountryCodePicker
                    ref={codeRef}
                    onValueChange={(value) => setCode(value)}
                    value={code}
                />
                <Picker
                    ref={filterRef}
                    selectedValue={searchBy}
                    onValueChange={(value) => {
                        setSearchBy(value);
                        setSearch("");
                        setUsers([]);
                    }}
                    style={{ display: "none" }}
                >
                    {filterOptions.map((item, index) => (
                        <Picker.Item
                            key={index}
                            label={item.label}
                            value={item.value}
                        />
                    ))}
                </Picker>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, marginTop: 15 }}
            >
                {!loading && notFoundText !== "" && (
                    <View style={{ marginTop: 60, alignItems: "center" }}>
                        <Text
                            style={{
                                textAlign: "center",
                                color: theme.colors.primaryLight,
                                ...FONTS.h2,
                                width: 300,
                            }}
                        >
                            {notFoundText +
                                `${
                                    searchBy === "mobile_no"
                                        ? "Mobile Number"
                                        : "Unique Id"
                                }`}
                        </Text>
                    </View>
                )}
                <View style={{ paddingHorizontal: 15 }}>
                    {users.map((user, index) => {
                        return (
                            <View
                                key={index}
                                style={{
                                    marginVertical: 6,
                                }}
                            >
                                <UserCard
                                    user={user}
                                    onPress={() => {
                                        navigation.navigate("Profile", {
                                            user,
                                            entryType: route.params?.entryType,
                                        });
                                    }}
                                />
                            </View>
                        );
                    })}
                </View>
                {loading && (
                    <ActivityIndicator
                        color={theme.colors.primaryLight}
                        size="large"
                        style={{ marginTop: 30 }}
                        animating={loading}
                    />
                )}
            </ScrollView>
        </View>
    );
};

export default Search;
