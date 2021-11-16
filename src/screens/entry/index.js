import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import SearchBar from "../../components/SearchBar";
import theme from "../../constants/theme";
import { postJsonData } from "../../httpClient/apiRequest";
import UserCard from "./components/UserCard";

const Entry = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const { searchBy, text, entryType, title } = route.params;
    const [search, setSearch] = useState(text || "");
    const [usersSearched, setUsersSearched] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            title: `${title} Entry`,
        });
    }, []);

    useEffect(() => {
        if (searchBy === "unique_id") {
            searchDiscipleWithAadhar(text);
        } else {
            searchDiscipleWithMobile(text);
        }
    }, [searchBy, text]);

    const searchDiscipleWithAadhar = async (aadharno) => {
        try {
            setLoading(true);
            const { data } = await postJsonData("/disciple/search", {
                search_by: "unique_id",
                search_value: aadharno,
            });
            if (data?.data.length > 0) {
                setUsersSearched(data.data);
            }
            setLoading(false);
        } catch (error) {
            console.log("Error", error);
            setUsersSearched([]);
        }
    };
    const searchDiscipleWithMobile = async (mobileNo) => {
        try {
            setLoading(true);
            const { data } = await postJsonData("/disciple/search", {
                search_by: "mobile_no",
                search_value: mobileNo.includes("+")
                    ? mobileNo
                    : `+91${mobileNo}`,
            });
            if (data?.data.length > 0) {
                setUsersSearched(data.data);
            }
            setLoading(false);
        } catch (error) {
            console.log("Error", error);
            setUsersSearched([]);
        }
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: theme.colors.white,
                height: "100%",
            }}
        >
            <View style={{ paddingHorizontal: 15, marginTop: 15 }}>
                {/* <SearchBar
                    placeholder={"Search by mobile Number"}
                    value={search}
                    setValue={(text) => {
                        setSearch(text);
                    }}
                    onSubmitEditing={() =>
                        searchBy === "unique_id"
                            ? searchDiscipleWithAadhar(text)
                            : searchDiscipleWithMobile(text)
                    }
                    onPress={() =>
                        searchBy === "mobile_id"
                            ? searchDiscipleWithMobile(text)
                            : searchDiscipleWithAadhar(text)
                    }
                    onCancel={() => {
                        setSearch("");
                        setUsersSearched([]);
                    }}
                /> */}
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
            >
                <View style={{ paddingHorizontal: 15 }}>
                    {usersSearched.map((user, index) => {
                        return (
                            <View
                                key={index}
                                style={{
                                    marginVertical: 6,
                                }}
                            >
                                <UserCard user={user} onPress={() => {}} />
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

export default Entry;
