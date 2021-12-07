import React, { useState, useEffect, useCallback, useRef } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    Animated,
    Image,
} from "react-native";
import { getData, postJsonData } from "../httpClient/apiRequest";
import { useAuth } from "../context/AuthContext";
import theme from "../constants/theme";
import UserCard from "./entry/components/UserCard";
import DatePicker from "../components/DatePicker";
import FormSelectInput from "../components/FormSelectInput";
import styles from "../styles/Singup";
import moment from "moment";
import { getDiscipleList } from "../constants/routes";
const calendarIcon = require("../../assets/icons/calenderFilled.png");

const UniquePending = ({ navigation }) => {
    const {
        state: { user },
    } = useAuth();
    const [loading, setLoading] = useState(false);
    const [disciples, setDisciples] = useState([]);
    const [searchOption, setSearchOption] = useState([]);
    const [searchType, setSearchType] = useState(null);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [stopFetchMore, setStopFetchMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalDisciples, settotalDisciples] = useState(0);
    const [notFoundText, setNotFoundText] = useState("");

    const getOptions = async () => {
        try {
            const { data } = await getData("/misc/list?slug=search_type");
            if (data.success) {
                const temp = [...data?.data].map((item) => item.name);
                setSearchOption(temp);
                setSearchType(temp[0]);
            }
        } catch (error) {
            console.log("error", error);
        }
    };
    const getList = async (page) => {
        setLoading(true);
        try {
            const { data } = await postJsonData(getDiscipleList(page), {
                country_id: user.country,
                search_type: searchType,
                from_date: fromDate,
                to_date: toDate,
            });
            if (data?.success) {
                if (data?.data.disciples.length === 0) {
                    setStopFetchMore(true);
                    if (page === 1) {
                        setNotFoundText("No desciple found");
                    }
                }
                setDisciples([...disciples, ...data?.data.disciples]);
                setCurrentPage((pre) => pre + 1);
                settotalDisciples(data?.data.total);
            }
        } catch (error) {
            if (error && error.response) {
                console.error(error.response.data.error);
                console.log(error);
                alert(error.response.data.error);
            } else {
                console.log("Error: ", error);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        getOptions();
    }, []);

    useEffect(() => {
        if (searchType !== null) {
            getList(1);
        }
    }, [searchType]);

    return (
        <View
            style={{
                backgroundColor: theme.colors.white,
                flex: 1,
                paddingBottom: 10,
            }}
        >
            <View
                style={{
                    marginVertical: 20,
                    marginHorizontal: 20,
                }}
            >
                <FormSelectInput
                    value={searchType}
                    onValueChange={(value) => {
                        setSearchType(value);
                        setCurrentPage(1);
                        setDisciples([]);
                        settotalDisciples(0);
                    }}
                    options={searchOption}
                    containerStyle={styles.selectFieldContainer}
                    placeholder="Select Option"
                />
                <DatePicker
                    placeholder="Pick From Date"
                    date={fromDate}
                    value={moment()}
                    setDate={(date) => {
                        setFromDate(date);
                        console.log(date);
                    }}
                    maximumDate={new Date()}
                    containerStyle={styles.dateContainer}
                    appendComponent={
                        <Image
                            source={calendarIcon}
                            style={styles.appendIcon}
                        />
                    }
                />

                <DatePicker
                    placeholder="Pick To Date"
                    date={toDate}
                    value={moment()}
                    setDate={(date) => setToDate(date)}
                    maximumDate={new Date()}
                    containerStyle={styles.dateContainer}
                    appendComponent={
                        <Image
                            source={calendarIcon}
                            style={styles.appendIcon}
                        />
                    }
                />
            </View>
            <FlatList
                data={disciples}
                style={{ padding: 15, paddingTop: 5 }}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.01}
                onEndReached={() => {
                    if (!stopFetchMore) {
                        getList(currentPage);
                    }
                }}
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
                                    entryType: null,
                                })
                            }
                        />
                    );
                }}
            />
        </View>
    );
};

export default UniquePending;
