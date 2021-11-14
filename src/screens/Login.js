import { Feather } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    AsyncStorage,
    Image,
    SafeAreaView,
    Text,
    View,
    StatusBar,
} from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import {
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native-gesture-handler";
import RoundButton from "../components/RoundButton";
import textConstants from "../constants/text/Login";
import theme from "../constants/theme";
import styles from "../styles/Login";
import appConfig from "../config";
import { useAuth } from "../context/AuthContext";

function Login({ navigation }) {
    const { dispatch } = useAuth();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState({
        show: false,
        title: "",
        message: "",
        confirm: "Ok",
    });

    const handleUserNameChange = (value) => {
        setUserName(value);
    };
    const handlePasswordChange = (value) => {
        setPassword(value);
    };
    const getCountries = async () => {
        try {
            console.log("Called");
            const config = {
                method: "get",
                url: `${appConfig.api_url}/country/list?page=1&limit=1000`,
                headers: {
                    key: "dsv213a213sfv21123fs31d3fd132c3dv31dsf33",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": await AsyncStorage.getItem("token"),
                },
            };

            const response = await axios(config);

            await AsyncStorage.setItem(
                "countries",
                JSON.stringify(response.data.data.countries)
            );
        } catch (error) {
            console.log(error);
        }
    };

    const getStates = async () => {
        try {
            const config = {
                method: "get",
                url: `${appConfig.api_url}/state/list?page=1&limit=100000`,
                headers: {
                    key: "dsv213a213sfv21123fs31d3fd132c3dv31dsf33",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": await AsyncStorage.getItem("token"),
                },
            };

            const response = await axios(config);

            await AsyncStorage.setItem(
                "states",
                JSON.stringify(response.data.data.states)
            );
        } catch (error) {
            console.log(error);
        }
    };
    const getCities = async () => {
        try {
            const config = {
                method: "get",
                url: `${appConfig.api_url}/city/list?page=1&limit=10000`,
                headers: {
                    key: "dsv213a213sfv21123fs31d3fd132c3dv31dsf33",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": await AsyncStorage.getItem("token"),
                },
            };

            const response = await axios(config);

            await AsyncStorage.setItem(
                "cities",
                JSON.stringify(response.data.data.cities)
            );
        } catch (error) {
            console.log(error);
        }
    };

    const getDistricts = async () => {
        try {
            const config = {
                method: "get",
                url: `${appConfig.api_url}/district/list?page=1&limit=1000000`,
                headers: {
                    key: "dsv213a213sfv21123fs31d3fd132c3dv31dsf33",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": await AsyncStorage.getItem("token"),
                },
            };

            const response = await axios(config);

            await AsyncStorage.setItem(
                "districts",
                JSON.stringify(response.data.data.districts)
            );
        } catch (error) {
            console.log(error);
        }
    };

    const getTehsils = async () => {
        try {
            const config = {
                method: "get",
                url: `${appConfig.api_url}/tehsil/list?page=1&limit=100000`,
                headers: {
                    key: "dsv213a213sfv21123fs31d3fd132c3dv31dsf33",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": await AsyncStorage.getItem("token"),
                },
            };

            const response = await axios(config);

            await AsyncStorage.setItem(
                "tehsils",
                JSON.stringify(response.data.data.tehsil_list)
            );
        } catch (error) {
            console.log(error);
        }
    };

    const checkDataExist = async () => {
        const countries = await AsyncStorage.getItem("countries");
        const states = await AsyncStorage.getItem("states");
        const districts = await AsyncStorage.getItem("districts");
        const tehsils = await AsyncStorage.getItem("tehsils");
        const cities = await AsyncStorage.getItem("cities");
        return countries && states && districts && tehsils && cities;
    };

    const checkIfLoggedIn = async () => {
        const loggedIn = await AsyncStorage.getItem("token");
        if (loggedIn) {
            console.log("Called2");
            if (!checkDataExist()) {
                await getCountries();
                await getStates();
                await getDistricts();
                await getTehsils();
                await getCities();
            }

            navigation.push("AshramDashboard");
        }
    };

    useEffect(() => {
        checkIfLoggedIn();
    }, []);

    const handleLogin = async () => {
        // TODO: If I uncomment the following line, it's giving No identifiers allowed directly after numeric literal
        // const deviceToken = Math.random() * 1_00_00_000;

        const config = {
            method: "post",
            url: `${appConfig.api_url}/auth/login`,
            headers: {
                key: "dsv213a213sfv21123fs31d3fd132c3dv31dsf33",
                Accept: "application/json",
            },
            data: {
                username: userName,
                password: password,
                device_id: "32123",
                longitude: "20.000",
                latitude: "30.555",
                channel: "mobile",
                device_token: "asdad",
            },
        };

        axios(config)
            .then(async (response) => {
                console.log({ response });
                if (response.data.success) {
                    const temp = {
                        ...showAlert,
                        show: true,
                        title: "Successful",
                        message: "You are successfully logged In",
                    };
                    let user = response.data.data;
                    dispatch({
                        type: "LOGIN_USER",
                        payload: { user },
                    });
                    setShowAlert(temp);
                    let csrfKey = "";

                    let cookies = response.headers["set-cookie"];
                    cookies = cookies[0].split(" namdan_csrf_key=");
                    // eslint-disable-next-line prefer-destructuring
                    csrfKey = cookies[1].split(";")[0];
                    console.log(response.data, "csrf", csrfKey);
                    await AsyncStorage.setItem("token", csrfKey);
                    await AsyncStorage.setItem("name", response.data.data.name);
                    await AsyncStorage.setItem(
                        "user",
                        JSON.stringify(response.data.data)
                    );
                    await AsyncStorage.setItem("role", response.data.data.role);
                    await AsyncStorage.setItem("loggedIn", "true");
                    await getCountries();
                    await getStates();
                    await getDistricts();
                    await getTehsils();
                    await getCities();

                    navigation.push("AshramDashboard");
                } else {
                    const temp = {
                        ...showAlert,
                        show: true,
                        title: "Opps",
                        message: "Wrong credentials",
                    };
                    setShowAlert(temp);
                }
            })
            .catch((error) => {
                console.error(error.response);
            });
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
                        style={[
                            styles.textCenter,
                            styles.textWhite,
                            styles.appName,
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
                                style={styles.inputs}
                                value={userName}
                                onChangeText={handleUserNameChange}
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
                                style={styles.inputs}
                                value={password}
                                onChangeText={handlePasswordChange}
                                secureTextEntry
                                placeholder="Password"
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            {/* <TouchableOpacity style={styles.loginButton} onPress={handleLogin} elevation={5} >
                    <Text style={[styles.textCenter, styles.textWhite, styles.loginButtonText]}>
                        {textConstants.login}
                    </Text>
                </TouchableOpacity> */}
                            <RoundButton
                                label={textConstants.login}
                                handlePress={handleLogin}
                            />
                        </View>
                        <TouchableOpacity>
                            <Text
                                style={[
                                    styles.textCenter,
                                    styles.textWhite,
                                    styles.fontType,
                                ]}
                            >
                                Forget Password?
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.signUpContainer}>
                            <Text
                                style={[
                                    styles.textCenter,
                                    styles.textWhite,
                                    styles.fontType,
                                ]}
                            >
                                {textConstants.signUpLine}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Login;
