import React, { useState } from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    View,
} from "react-native";
import { loginUrl } from "../constants/routes";
import AwesomeAlert from "react-native-awesome-alerts";
import RoundButton from "../components/RoundButton";
import theme from "../constants/theme";
import { postJsonData } from "../httpClient/apiRequest";
import styles from "../styles/Login";

const Login = ({ navigation }) => {
    const [userName, setUserName] = useState("");
    const [showAlert, setShowAlert] = useState({
        show: false,
        title: "",
        message: "",
        confirm: "Ok",
    });
    const handleLogin = async () => {
        // TODO: If I uncomment the following line, it's giving No identifiers allowed directly after numeric literal
        const deviceToken = Math.floor(Math.random() * 10000000);

        const loginData = {
            username: userName,
            device_id: deviceToken,
            longitude: "20.000",
            latitude: "30.555",
            channel: "mobile",
            device_token: "asdad",
        };

        try {
            const { data } = await postJsonData(loginUrl, loginData);
            if (data?.success) {
                console.log(data);
                navigation.navigate("Verify", {
                    userName,
                    deviceToken,
                    loginData,
                });
            }
        } catch (error) {
            if (error && error.response) {
                console.log(error);
                console.error(error.response.data.error);
                setShowAlert({
                    ...showAlert,
                    show: true,
                    title: "Oops",
                    message: error.response.data.error,
                });
            } else {
                console.log(error);
                console.error("Error in login request.", error.message);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={theme.colors.primary} />
            <ScrollView style={{ paddingTop: "10%" }}>
                <AwesomeAlert
                    show={showAlert.show}
                    showProgress={false}
                    title={showAlert.title}
                    message={showAlert.message}
                    closeOnTouchOutside
                    closeOnHardwareBackPress={false}
                    showCancelButton
                    showConfirmButton
                    cancelText={showAlert.cancel}
                    confirmText={showAlert.confirm}
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        const temp = { ...showAlert, show: false };
                        setShowAlert(temp);
                    }}
                    onConfirmPressed={() => {
                        const temp = { ...showAlert, show: false };
                        setShowAlert(temp);
                    }}
                />

                <Image
                    style={styles.image}
                    source={require("../../assets/Guruji2.png")}
                />
                <View>
                    <Text allowFontScaling={false} style={styles.label}>
                        NAMDAN APP
                    </Text>
                    <View style={styles.inputContainer}>
                        <View style={styles.iconContainer}>
                            <TextInput
                                allowFontScaling={false}
                                style={styles.inputs}
                                keyboardType="numeric"
                                value={userName}
                                onChangeText={(text) => setUserName(text)}
                                placeholder="Enter mobile number"
                            />
                        </View>
                        <View style={{ marginTop: 100 }}>
                            <RoundButton
                                label={"Get OTP"}
                                handlePress={() => {
                                    if (userName.length === 10) {
                                        handleLogin();
                                    } else {
                                        alert("Enter a valid mobile number.");
                                    }
                                }}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Login;
