import React, { useState, useEffect } from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { FONTS } from "../constants/fonts";
import theme from "../constants/theme";
import UploadButton from "../components/UploadButton";
import { getData } from "../httpClient/apiRequest";
import moment from "moment";

const MessageDetails = ({ navigation, route }) => {
    const { id } = route.params.message;

    const [files, setFiles] = useState([]);
    const [messageDetails, setMessageDetails] = useState({});

    const getMessageDetails = async () => {
        try {
            const { data } = await getData(`message/${id}/detail`);
            if (data?.success) {
                setMessageDetails(data?.data);
                setFiles(data.data?.files);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getMessageDetails();
    }, []);
    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: theme.colors.white,
            }}
        >
            <View style={styles.box}>
                <Text style={styles.subject}>{messageDetails?.subject}</Text>
                <Text style={styles.caption}>
                    {"Form: " + messageDetails?.from}
                </Text>
                <Text style={styles.caption}>
                    {"Date: " +
                        moment(messageDetails?.approved_at).format(
                            "DD-MM-YYYY hh:mm A"
                        )}
                </Text>
                {files.map((item, index) => {
                    return (
                        <UploadButton
                            key={index}
                            onPressFn={() =>
                                navigation.navigate("Pdf", {
                                    url: item.url,
                                    name: item.name,
                                })
                            }
                            tintColor={theme.colors.primary}
                            label={item.name}
                        />
                    );
                })}
            </View>
            <Text style={styles.body}>{messageDetails?.message}</Text>
        </ScrollView>
    );
};

export default MessageDetails;

const styles = StyleSheet.create({
    box: {
        elevation: 5,
        padding: 15,
        backgroundColor: theme.colors.white,
        marginHorizontal: 15,
        borderRadius: 15,
        marginVertical: 15,
    },
    subject: {
        ...FONTS.h2,
        color: theme.colors.primary,
        marginTop: 10,
    },
    body: {
        ...FONTS.body3,
        color: theme.colors.primary,
        marginBottom: 10,
        marginHorizontal: 15,
    },
    caption: {
        ...FONTS.body5,
        color: theme.colors.primary,
        marginTop: 10,
    },
});
