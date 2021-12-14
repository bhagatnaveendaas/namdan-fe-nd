import React from "react";
import { View, Text, ScrollView } from "react-native";
import MessageCard from "../components/MessageCard";

const messages = [
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
    return (
        <ScrollView style={{ flex: 1, backgroundColor: "white", padding: 15 }}>
            {messages.map((item, index) => {
                return (
                    <MessageCard
                        key={index}
                        message={item}
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
