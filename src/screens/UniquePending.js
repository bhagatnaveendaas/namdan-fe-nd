import React, { useState, useEffect, useCallback, useRef } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    Animated,
} from "react-native";
import { getData, postJsonData } from "../httpClient/apiRequest";
import { useAuth } from "../context/AuthContext";
import theme from "../constants/theme";
import UserCard from "./entry/components/UserCard";
import { FONTS } from "../constants/fonts";
import { duration } from "moment";

const Options = [
    { name: "All", ref: React.createRef() },
    { name: "Pending", ref: React.createRef() },
    { name: "Satnam", ref: React.createRef() },
];
const UniquePending = ({ navigation }) => {
    const {
        state: { user },
    } = useAuth();
    const [loading, setLoading] = useState(false);
    const [disciples, setDisciples] = useState([]);
    const [stopFetchMore, setStopFetchMore] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const translateX = useRef(new Animated.Value(0)).current;

    const getPendingList = async () => {
        setLoading(true);
        try {
            const { data } = await postJsonData(
                "/disciple/search_unique?page=1&limit=10",
                { country_id: user.country }
            );
            if (data?.success) {
                setDisciples(data?.data?.disciples);
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

    const handleSlide = useCallback((item) => {
        item.ref.current.measureInWindow((x) => {
            Animated.spring(translateX, {
                toValue: x - 25,
                duration: 300,
                useNativeDriver: true,
            }).start();
        });
    });

    useEffect(() => {
        getPendingList();
    }, []);

    if (loading) {
        return (
            <ActivityIndicator
                size={"large"}
                animating={loading}
                style={{ marginVertical: 60 }}
                color={theme.colors.primaryLight}
            />
        );
    }
    return (
        <View
            style={{
                backgroundColor: theme.colors.white,
                flex: 1,
            }}
        >
            <View
                style={{
                    marginVertical: 20,
                    marginHorizontal: 20,
                    alignItems: "center",
                    justifyContent: "space-around",
                    borderRadius: 8,
                    overflow: "hidden",
                    backgroundColor: theme.colors.lightGray,
                }}
            >
                <View
                    style={{
                        margin: 5,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-around",
                    }}
                >
                    <Animated.View
                        style={{
                            position: "absolute",
                            backgroundColor: theme.colors.primary,
                            width: 114,
                            height: 30,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 5,
                            transform: [{ translateX }],
                        }}
                    />
                    {Options.map((item, index) => {
                        return (
                            <TouchableOpacity
                                ref={item.ref}
                                onPress={() => {
                                    handleSlide(item);
                                    setSelectedIndex(index);
                                }}
                                key={index}
                                style={{
                                    flex: 1,
                                    height: 30,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 5,
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: "center",
                                        ...FONTS.h3,
                                        color:
                                            index === selectedIndex
                                                ? theme.colors.white
                                                : theme.colors.primary,
                                    }}
                                >
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
            <FlatList
                data={disciples}
                style={{ padding: 15, paddingTop: 5 }}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.01}
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
                    </>
                )}
                renderItem={({ item }) => {
                    return <UserCard user={item} />;
                }}
            />
        </View>
    );
};

export default UniquePending;
