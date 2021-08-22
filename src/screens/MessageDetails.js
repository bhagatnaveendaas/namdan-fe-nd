/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Files from "../components/Files";
import GreyButton from "../components/GreyRoundButton";
import RoundButton from "../components/RoundButton";

import style from "../styles/MessageDetails";

const roles = {
    1: "Ashram Admin",
    2: "Country Admin",
    3: "State Admin",
    4: "District Admin",
    5: "Naamdan Sevadar",
};
const messageData = {
    subject: "Adesh from Guruji",
    created_by: {
        id: 1,
        name: "Ram Suthar",
    },
    role_id: 2,
    message: {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        files: [
            {
                name: "adesh.pdf",
                uri: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            },
        ],
    },
    approved_by: [
        {
            id: 1,
            name: "Ram Suthar",
        },
        {
            id: 2,
            name: "Ram Suthar",
        },
        {
            id: 3,
            name: "Ram Suthar",
        },
    ],
    rejected_by: [
        {
            id: 1,
            name: "Ram Suthar",
        },
        {
            id: 2,
            name: "Ram Suthar",
        },
        {
            id: 3,
            name: "Ram Suthar",
        },
    ],
    created_at: "Feb 31, 2019, 03.50 PM",
};

const MessageDetails = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        setData(messageData);
        console.log(messageData.created_by.name);
    }, []);
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "white",
            }}
        >
            <ScrollView style={{ flex: 1 }}>
                {data && (
                    <View style={{ flex: 1 }}>
                        <View style={style.upperContainer}>
                            <Text style={style.subject}>{data.subject}</Text>
                            <View style={{ paddingTop: "4%" }}>
                                <View style={style.row}>
                                    <View style={style.rightlabelContainer}>
                                        <Text style={style.labels}>From</Text>
                                    </View>
                                    <View>
                                        <Text style={style.labels}>
                                            {data.created_by?.name}
                                        </Text>
                                    </View>
                                </View>
                                <View style={style.row}>
                                    <View style={style.rightlabelContainer}>
                                        <Text style={style.labels}>To</Text>
                                    </View>
                                    <View>
                                        <Text style={style.labels}>
                                            {roles[data.role_id]}
                                        </Text>
                                    </View>
                                </View>
                                <View style={style.row}>
                                    <View style={style.rightlabelContainer}>
                                        <Text style={style.labels}>Date</Text>
                                    </View>
                                    <View>
                                        <Text style={style.labels}>
                                            {data.created_at}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={style.bottomContainer}>
                            <Text style={style.body}>{data.message.text}</Text>
                            <View style={{ paddingTop: "4%" }}>
                                <Files
                                    data={data.message.files}
                                    disableRemove={true}
                                />
                            </View>
                            <View style={style.approvedbyContainer}>
                                <View>
                                    <Text
                                        style={[style.labels, { fontSize: 15 }]}
                                    >
                                        Approved By
                                    </Text>
                                </View>
                                <View style={style.row}>
                                    {data.approved_by.map((item) => (
                                        <View
                                            style={style.chipOuterContainer}
                                            key={item.id}
                                        >
                                            <View style={style.approvedbyChip}>
                                                <Text style={style.chipText}>
                                                    {item.name}
                                                </Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View>
                            <View style={style.approvedbyContainer}>
                                <View>
                                    <Text
                                        style={[style.labels, { fontSize: 15 }]}
                                    >
                                        Rejected By
                                    </Text>
                                </View>
                                <View style={style.row}>
                                    {data.rejected_by.map((item) => (
                                        <View
                                            style={style.chipOuterContainer}
                                            key={item.id}
                                        >
                                            <View style={style.approvedbyChip}>
                                                <Text style={style.chipText}>
                                                    {item.name}
                                                </Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>
            {(!data?.approved_by.length < 3 || !data?.rejected_by.length < 3) && (
                <View style={{ padding: "3.5%", justifyContent: "flex-end" }}>
                    <View style={{ paddingBottom: "4%" }}>
                        <GreyButton label={"Approve"} />
                    </View>
                    <RoundButton label={"Reject"} />
                </View>
            )}
        </SafeAreaView>
    );
};

export default MessageDetails;
