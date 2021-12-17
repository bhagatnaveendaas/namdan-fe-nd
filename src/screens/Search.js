import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    Platform,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    Image,
} from "react-native";
import { FONTS } from "../constants/fonts";
import theme from "../constants/theme";
import { useAuth } from "../context/AuthContext";
import FormTextInput from "../components/FormTextInput";
import CountryCodePicker from "../components/CountryCodePicker";
import RadioButton from "../components/RadioButton";
import styles from "../styles/Singup";
import { postJsonData } from "../httpClient/apiRequest";
import UserCard from "./entry/components/UserCard";
import { searchDiscipleUrl } from "../constants/routes";
const searchImage = require("../../assets/icons/search.png");

const Search = ({ navigation, route }) => {
    const { state } = useAuth();
    const AuthUser = state.user;
    const [totalDisciples, settotalDisciples] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [notFoundText, setNotFoundText] = useState("");
    const [loading, setLoading] = useState(false);
    const [stopFetchMore, setStopFetchMore] = useState(false);
    const [searchBy, setSearchBy] = useState("mobile_no");
    const [search, setSearch] = useState("");
    const [code, setCode] = useState("+91");
    const codeRef = useRef();

    useEffect(() => {
        navigation.setOptions({
            title: `${route.params?.entryType ?? "Search"}`,
        });
    }, []);

    const searchDisciple = async (page) => {
        if (searchBy === "mobile_no" && search.length < 10) {
            alert("Please enter a valid mobile number.");
            return;
        }
        if (searchBy === "unique_id" && search.length < 12) {
            alert("Please enter a valid aadhaar number.");
            return;
        }
        setLoading(true);
        try {
            const { data } = await postJsonData(searchDiscipleUrl(page), {
                search_by: searchBy,
                search_value: searchBy === "mobile_no" ? code + search : search,
                country_id: AuthUser.country,
            });

            if (data?.data.disciples) {
                if (data?.data.disciples.length === 0) {
                    setStopFetchMore(true);
                    if (page === 1) {
                        setNotFoundText("No desciple found");
                    }
                }
                setUsers([...users, ...data?.data.disciples]);
                settotalDisciples(data?.data.total);
                setCurrentPage(currentPage + 1);
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
    const onOptionChange = (key) => {
        setSearchBy(key);
        setSearch("");
        setUsers([]);
        setCurrentPage(1);
        settotalDisciples(0);
        setStopFetchMore(false);
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
                            : searchBy === "form_no"
                            ? "Enter form number"
                            : "Enter your unique id number"
                    }
                    autoFocus={true}
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
                    onChangeText={(text) => {
                        setSearch(text);
                        setUsers([]);
                        setCurrentPage(1);
                    }}
                    onSubmitEditing={() => searchDisciple(currentPage)}
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
                        <TouchableOpacity onPress={() => searchDisciple(1)}>
                            <Image
                                source={searchImage}
                                style={{
                                    height: 20,
                                    width: 20,
                                    tintColor: theme.colors.primary,
                                    marginRight: 10,
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
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                    marginHorizontal: 15,
                    flexWrap: "wrap",
                }}
            >
                <RadioButton
                    selected={searchBy === "mobile_no"}
                    color={theme.colors.primary}
                    id="mno"
                    labelStyle={{
                        ...FONTS.h5,
                    }}
                    size={20}
                    label="Mobile Number"
                    onPress={() => onOptionChange("mobile_no")}
                />
                <RadioButton
                    selected={searchBy === "unique_id"}
                    color={theme.colors.primary}
                    label="Unique Id Number"
                    labelStyle={{
                        ...FONTS.h5,
                    }}
                    size={20}
                    id="uno"
                    onPress={() => onOptionChange("unique_id")}
                />
                <RadioButton
                    selected={searchBy === "form_no"}
                    color={theme.colors.primary}
                    label="Form Number"
                    labelStyle={{
                        ...FONTS.h5,
                    }}
                    size={20}
                    id="fno"
                    onPress={() => onOptionChange("form_no")}
                />
            </View>
            {users.length > 0 && users && (
                <View style={{ marginVertical: 5 }}>
                    <Text
                        style={{
                            marginLeft: 20,
                            ...FONTS.h5,
                            color: theme.colors.primaryLight,
                            textDecorationLine: "underline",
                        }}
                    >
                        {`Showing ${users.length} ${
                            users.length > 1 ? "disciples" : "disciple"
                        } out of ${totalDisciples}`}
                    </Text>
                </View>
            )}
            <FlatList
                data={users}
                style={{ padding: 15, paddingTop: 5 }}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.01}
                onEndReached={() => {
                    if (!stopFetchMore) {
                        searchDisciple(currentPage);
                    }
                }}
                ListEmptyComponent={() =>
                    notFoundText !== "" && (
                        <View style={{ marginTop: 60, alignItems: "center" }}>
                            <Text
                                style={{
                                    width: 300,
                                    textAlign: "center",
                                    ...FONTS.h1,
                                    color: theme.colors.primaryLight,
                                }}
                            >{`No Disciple Found`}</Text>
                        </View>
                    )
                }
                ListFooterComponent={() => (
                    <>
                        {loading && (
                            <ActivityIndicator
                                style={{ marginBottom: 10 }}
                                color={theme.colors.primaryLight}
                                animating={loading}
                                size={"large"}
                            />
                        )}
                        {stopFetchMore && totalDisciples >= 10 && (
                            <Text
                                style={{
                                    alignSelf: "center",
                                    textAlign: "center",
                                    padding: 5,
                                    width: 150,
                                    color: theme.colors.primaryLight,
                                    marginBottom: 20,
                                    borderRadius: 10,
                                    marginTop: 10,
                                    ...FONTS.h5,
                                }}
                            >
                                No more desciples
                            </Text>
                        )}
                    </>
                )}
                renderItem={({ item }) => {
                    return (
                        <UserCard
                            user={item}
                            onPress={() =>
                                navigation.navigate("Profile", {
                                    user: item,
                                    entryType: route.params?.entryType ?? null,
                                })
                            }
                        />
                    );
                }}
            />
        </View>
    );
};

export default Search;
