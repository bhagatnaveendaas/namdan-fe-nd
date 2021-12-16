import React, { useState, useCallback } from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    Linking,
    View,
} from "react-native";
import { loginUrl } from "../constants/routes";
import AwesomeAlert from "react-native-awesome-alerts";
import RoundButton from "../components/RoundButton";
import theme from "../constants/theme";
import { postJsonData } from "../httpClient/apiRequest";
import styles from "../styles/Login";
import Checkbox from "../components/Checkbox";

const Login = ({ navigation }) => {
    const [userName, setUserName] = useState("");
    const [checked, setChecked] = useState(false);
    const [showAlert, setShowAlert] = useState({
        show: false,
        title: "",
        message: "",
        confirm: "Ok",
    });

    const onPressCheck = useCallback(() => {
        setChecked((pre) => !pre);
    }, []);
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
            <ScrollView>
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
                <View>
                    <Image
                        style={styles.image}
                        source={require("../../assets/guruji22.png")}
                    />
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
                        <View style={[styles.row, { marginTop: 10 }]}>
                            <Checkbox
                                checked={checked}
                                setChecked={onPressCheck}
                            />
                            <Text style={styles.term}>
                                I accept the{" "}
                                <Text
                                    style={{ textDecorationLine: "underline" }}
                                    onPress={() => navigation.navigate("Terms")}
                                >
                                    {"Term & Conditions"}
                                </Text>
                            </Text>
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <RoundButton
                                label={"Get OTP"}
                                handlePress={() => {
                                    if (userName.length === 10) {
                                        if (checked) {
                                            handleLogin();
                                        } else {
                                            alert(
                                                "Please accept Term & Condition before proceeding."
                                            );
                                        }
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
