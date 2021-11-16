import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    AsyncStorage,
} from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import RoundButton from "../components/RoundButton";
import textConstants from "../constants/text/Login";
import theme from "../constants/theme";
import { useAuth } from "../context/AuthContext";
import { postJsonData } from "../httpClient/apiRequest";
import styles from "../styles/Login";

const Login = ({ navigation }) => {
    const { dispatch } = useAuth();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState({
        show: false,
        title: "",
        message: "",
        confirm: "Ok",
    });
    const handleLogin = async () => {
        // TODO: If I uncomment the following line, it's giving No identifiers allowed directly after numeric literal
        // const deviceToken = Math.random() * 1_00_00_000;
        const loginData = {
            username: userName,
            password: password,
            device_id: "32123",
            longitude: "20.000",
            latitude: "30.555",
            channel: "mobile",
            device_token: "asdad",
        };

        try {
            const { data, headers } = await postJsonData(
                "/auth/login",
                loginData
            );

            if (data?.success === true) {
                let cookies = headers["set-cookie"];
                cookies = cookies[0].split(" namdan_csrf_key=");
                // eslint-disable-next-line prefer-destructuring

                const csrfKey = cookies[1].split(";")[0];
                const user = data?.data;
                console.log(csrfKey);
                await AsyncStorage.setItem("token", csrfKey);
                await AsyncStorage.setItem("user", JSON.stringify(user));
                dispatch({
                    type: "LOGIN_USER",
                    payload: { user },
                });
            }
        } catch (error) {
            if (error && error.response) {
                setPassword("");
                console.error(error.response.data.error);
                setShowAlert({
                    ...showAlert,
                    show: true,
                    title: "Oops",
                    message: error.response.data.error,
                });
            } else {
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

                <View>
                    <Image
                        style={styles.image}
                        source={require("../../assets/Guruji2.png")}
                    />
                </View>
                <View>
                    <Text
                        allowFontScaling={false}
                        style={[
                            styles.textCenter,

                            styles.appName,
                            { color: theme.colors.primary },
                        ]}
                    >
                        {textConstants.appName}
                    </Text>
                    <View style={styles.inputContainer}>
                        <View style={styles.iconContainer}>
                            <Feather
                                style={styles.icons}
                                name="user"
                                size={20}
                                color={theme.colors.primary}
                            />
                            <TextInput
                                allowFontScaling={false}
                                style={styles.inputs}
                                value={userName}
                                onChangeText={(text) => setUserName(text)}
                                placeholder="UserName"
                            />
                        </View>
                        <View style={styles.iconContainer}>
                            <Feather
                                style={styles.icons}
                                name="key"
                                size={20}
                                color={theme.colors.primary}
                            />
                            <TextInput
                                allowFontScaling={false}
                                style={styles.inputs}
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry
                                placeholder="Password"
                                returnKeyType="go"
                                onSubmitEditing={handleLogin}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <RoundButton
                                label={textConstants.login}
                                handlePress={handleLogin}
                            />
                        </View>
                        <TouchableOpacity>
                            <Text
                                allowFontScaling={false}
                                style={[
                                    styles.textCenter,
                                    styles.textWhite,
                                    styles.fontType,
                                ]}
                            >
                                Forget Password?
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Login;
