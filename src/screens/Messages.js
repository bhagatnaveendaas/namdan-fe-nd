import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "../constants/theme";
import { SafeAreaView } from "react-native";
import { Image } from "react-native";

const messages = [
    {
        id: 1,
        subject: "Adesh from guruji",
        to: "Naamdan sevadar",
        message: {
            text: "Lorem ipsum dorem lorem ipsum dorem iset.Lorem ipsum dorem lorem ipsum dorem iset.Lorem ipsum dorem lorem ipsum dorem iset.",
            files: [],
        },
        creator: {
            id: 1,
            name: "Ram Suthar",
        },
        created_at: "31 Feb 2019, 3:50 pm",
        approved_by: [
            {
                id: 1,
                name: "Ram Suthar",
            },
            {
                id: 1,
                name: "Ram Suthar",
            },
            {
                id: 1,
                name: "Ram Suthar",
            },
        ],
    },
    {
        id: 1,
        subject: "Adesh from guruji",
        to: "Naamdan sevadar",
        message: {
            text: "Lorem ipsum dorem lorem ipsum dorem iset.Lorem ipsum dorem lorem ipsum dorem iset.Lorem ipsum dorem lorem ipsum dorem iset.",
            files: [],
        },
        creator: {
            id: 1,
            name: "Ram Suthar",
        },
        created_at: "31 Feb 2019, 3:50 pm",
        approved_by: [
            {
                id: 1,
                name: "Ram Suthar",
            },
            {
                id: 1,
                name: "Ram Suthar",
            },
            {
                id: 1,
                name: "Ram Suthar",
            },
        ],
    },
    {
        id: 1,
        subject: "Adesh from guruji",
        to: "Naamdan sevadar",
        message: {
            text: "Lorem ipsum dorem lorem ipsum dorem iset.Lorem ipsum dorem lorem ipsum dorem iset.Lorem ipsum dorem lorem ipsum dorem iset.",
            files: [],
        },
        creator: {
            id: 1,
            name: "Ram Suthar",
        },
        created_at: "31 Feb 2019, 3:50 pm",
        approved_by: [
            {
                id: 1,
                name: "Ram Suthar",
            },
            {
                id: 1,
                name: "Ram Suthar",
            },
            {
                id: 1,
                name: "Ram Suthar",
            },
        ],
    },
    {
        id: 1,
        subject: "Adesh from guruji",
        to: "Naamdan sevadar",
        message: {
            text: "Lorem ipsum dorem lorem ipsum dorem iset.Lorem ipsum dorem lorem ipsum dorem iset.Lorem ipsum dorem lorem ipsum dorem iset.",
            files: [],
        },
        creator: {
            id: 1,
            name: "Ram Suthar",
        },
        created_at: "31 Feb 2019, 3:50 pm",
        approved_by: [
            {
                id: 1,
                name: "Ram Suthar",
            },
            {
                id: 1,
                name: "Ram Suthar",
            },
            {
                id: 1,
                name: "Ram Suthar",
            },
        ],
    },
    {
        id: 1,
        subject: "Adesh from guruji",
        to: "Naamdan sevadar",
        message: {
            text: "Lorem ipsum dorem lorem ipsum dorem iset.Lorem ipsum dorem lorem ipsum dorem iset.Lorem ipsum dorem lorem ipsum dorem iset.",
            files: [],
        },
        creator: {
            id: 1,
            name: "Ram Suthar",
        },
        created_at: "31 Feb 2019, 3:50 pm",
        approved_by: [
            {
                id: 1,
                name: "Ram Suthar",
            },
            {
                id: 1,
                name: "Ram Suthar",
            },
            {
                id: 1,
                name: "Ram Suthar",
            },
        ],
    },
    {
        id: 1,
        subject: "Adesh from guruji",
        to: "Naamdan sevadar",
        message: {
            text: "Lorem ipsum dorem lorem ipsum dorem iset.Lorem ipsum dorem lorem ipsum dorem iset.Lorem ipsum dorem lorem ipsum dorem iset.",
            files: [],
        },
        creator: {
            id: 1,
            name: "Ram Suthar",
        },
        created_at: "31 Feb 2019, 3:50 pm",
        approved_by: [
            {
                id: 1,
                name: "Ram Suthar",
            },
            {
                id: 1,
                name: "Ram Suthar",
            },
            {
                id: 1,
                name: "Ram Suthar",
            },
        ],
    },
    {
        id: 1,
        subject: "Adesh from guruji",
        to: "Naamdan sevadar",
        message: {
            text: "Lorem ipsum dorem lorem ipsum dorem iset.Lorem ipsum dorem lorem ipsum dorem iset.Lorem ipsum dorem lorem ipsum dorem iset.",
            files: [],
        },
        creator: {
            id: 1,
            name: "Ram Suthar",
        },
        created_at: "31 Feb 2019, 3:50 pm",
        approved_by: [
            {
                id: 1,
                name: "Ram Suthar",
            },
            {
                id: 1,
                name: "Ram Suthar",
            },
            {
                id: 1,
                name: "Ram Suthar",
            },
        ],
    },
];

const Messages = ({ navigation }) => {
    const [tab, setTab] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(messages);
    }, []);

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            style={{
                paddingVertical: index === data.length - 1 ? 17 : 7,
                paddingHorizontal: "3.5%",
            }}
            onPress={() => navigation.push("Message")}
        >
            <View
                style={{
                    borderRadius: 8,
                    padding: "3%",
                    shadowColor: "black",
                    shadowOpacity: 0.26,
                    shadowOffset: { width: 2, height: 7 },
                    shadowRadius: 15,
                    elevation: 8,
                    backgroundColor: "white",
                }}
            >
                <View>
                    <Text
                        style={{
                            fontFamily: theme.fonts.poppins.semiBold,
                        }}
                    >
                        {item.subject}
                    </Text>
                </View>
                <View>
                    <Text
                        style={{
                            fontFamily: theme.fonts.poppins.regular,
                            ...theme.sizes.regular,
                        }}
                        numberOfLines={2}
                    >
                        {item.message.text}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        paddingTop: 2,
                        alignItems: "center",
                    }}
                >
                    <Image
                        style={{ height: 12, width: 12 }}
                        source={require("../../assets/icons/user.png")}
                    />
                    <Text
                        style={{
                            fontFamily: theme.fonts.poppins.regular,
                            ...theme.sizes.regular,
                            paddingLeft: 8,
                            textAlignVertical: "center",
                            color: "#636363",
                        }}
                    >
                        {item.creator.name}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignSelf: "flex-end",
                        alignItems: "center",
                    }}
                >
                    <Image
                        style={{ height: 13, width: 13 }}
                        source={require("../../assets/icons/clock.png")}
                    />
                    <Text
                        style={{
                            fontFamily: theme.fonts.poppins.regular,
                            ...theme.sizes.regular,
                            alignSelf: "flex-end",
                            color: "#636363",
                            paddingLeft: 6,
                        }}
                    >
                        {item.created_at}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView
            style={{
                paddingVertical: "3.5%",
                flex: 1,
                backgroundColor: theme.colors.secondary,
            }}
        >
            <View
                style={{
                    paddingTop: 5,

                    paddingHorizontal: "3.5%",
                }}
            >
                <View
                    style={{
                        backgroundColor: "#F3F3F3",
                        height: 40,
                        borderRadius: 8,
                        flexDirection: "row",
                    }}
                >
                    <TouchableOpacity
                        onPress={() => setTab(0)}
                        style={{
                            width: "50%",
                            borderRadius: 8,
                            backgroundColor: tab === 0 ? "white" : "#F3F3F3",
                            elevation: tab === 0 ? 5 : 0,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                fontFamily: theme.fonts.poppins.semiBold,
                                color: "#414040",
                            }}
                        >
                            Pending
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setTab(1)}
                        style={{
                            width: "50%",
                            borderRadius: 8,
                            backgroundColor: tab === 1 ? "white" : "#F3F3F3",
                            elevation: tab === 1 ? 5 : 0,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                fontFamily: theme.fonts.poppins.semiBold,
                                color: "#414040",
                            }}
                        >
                            History
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginBottom: "5%" }}>
                <View style={{ padding: "3.5%" }}>
                    <Text
                        style={{
                            color: "#AFAFAF",
                            fontFamily: theme.fonts.poppins.regular,
                        }}
                    >
                        {data.length} pending approvals
                    </Text>
                </View>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index}
                    style={{ marginBottom: 50 }}
                />
            </View>
            <View
                style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    position: "absolute",
                    right: 30,
                    bottom: 30,
                }}
            >
                <TouchableOpacity
                    style={{
                        alignItems: "center",

                        flexDirection: "row",
                        justifyContent: "center",
                        height: 70,
                        width: 70,
                        elevation: 20,
                        backgroundColor: theme.colors.primary,
                        borderRadius: 100,
                    }}
                    onPress={() => navigation.push("Compose Message")}
                >
                    <MaterialIcons name="message" size={34} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Messages;
