import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Dropdown from "../components/Dropdown";
import InputFieldWithLabel from "../components/InputFieldWithLabel";
import UploadButton from "../components/UploadButton";
import Files from "../components/Files";
import * as DocumentPicker from "expo-document-picker";

const CreateMessage = ({ navigation }) => {
    const [message, setMessage] = useState({
        to: "",
        subject: "",
        message: "",
        files: [],
    });
    const pickFiles = async () => {
        const result = await DocumentPicker.getDocumentAsync({});

        console.log({ result });

        if (!result.cancelled) {
            const temp = {
                ...message,
                files: [...message.files, result],
            };
            setMessage(temp);
        }
    };
    const removeSelectedFile = (pos) => {
        const temp = message.files.filter((item, index) => index !== pos);
        setMessage({
            ...message,
            files: temp,
        });
    };
    return (
        <ScrollView style={{ paddingHorizontal: "3.5%" }}>
            <Dropdown
                label="To,"
                value={message.to}
                changeFn={(value) => setMessage({ ...message, to: value })}
                options={["Country Admin", "State Admin", "Naamdan Sevadar"]}
            />
            <InputFieldWithLabel
                label="Subject"
                value={message.subject}
                changeFn={(event) =>
                    setMessage({ ...message, subject: event.nativeEvent.text })
                }
                placeholder="Enter Subject of your message"
            />
            <InputFieldWithLabel
                label="Message"
                value={message.message}
                changeFn={(event) =>
                    setMessage({ ...message, message: event.nativeEvent.text })
                }
                placeholder="Enter message"
                rows={7}
            />

            <View>
                <View style={{ paddingBottom: "1.5%", paddingTop: "3.5%" }}>
                    <Text style={{ color: "#8A8A81" }}>Files</Text>
                </View>
                <Files
                    data={message.files}
                    removeSelectedFile={removeSelectedFile}
                />
            </View>

            <UploadButton onPressFn={pickFiles} label="Upload files" />
        </ScrollView>
    );
};

export default CreateMessage;
