import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useAuth } from "../context/AuthContext";
import MessageCard from "../components/MessageCard";
import { getData } from "../httpClient/apiRequest";

const messages1 = [
    {
        subject: "Message Subject 1",
        content:
            "Message Content 1 In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
    },
    {
        subject: "Message Subject 2",
        content:
            "Message Content 2 In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
    },
];

const Message = ({ navigation }) => {
    const {
        state: { user },
    } = useAuth();
    const [messages, setMessages] = useState([]);

    const getMessages = async () => {
        try {
            const { data } = await getData(
                `/message/list?role_id=${user.role_id}&status=approved`
            );
            if (data?.success) {
                setMessages(data?.data);
                // console.log(data?.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getMessages();
    }, []);
    return (
        <ScrollView style={{ flex: 1, backgroundColor: "white", padding: 15 }}>
            {messages.map((item, index) => {
                return (
                    <MessageCard
                        key={index}
                        item={item}
                        onPress={() =>
                            navigation.navigate("MessageDetail", {
                                message: item,
                            })
                        }
                    />
                );
            })}
        </ScrollView>
    );
};

export default Message;
