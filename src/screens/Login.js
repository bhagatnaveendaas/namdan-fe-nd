import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, Image, AsyncStorage } from "react-native";
import {
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import AwesomeAlert from "react-native-awesome-alerts";
import theme from "../constants/theme";
import textConstants from "../constants/text/Login";
import styles from "../styles/Login";
import RoundButton from "../components/RoundButton";

function Login({ navigation }) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState({
        show: false,
        title: "",
        message: "",
        cancel: "",
        confirm: "",
    });

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const getCountries = async () => {
        console.log("Called");
        const config = {
            method: "get",
            url: "https://drfapi.jagatgururampalji.org/v1/country/list?page=1&limit=1000",
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
        

    };

    const getStates = async () => {
        const config = {
            method: "get",
            url: `https://drfapi.jagatgururampalji.org/v1/state/list?page=1&limit=100000`,
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
    };

    const getDistricts = async () => {
        const config = {
            method: "get",
            url: "https://drfapi.jagatgururampalji.org/v1/district/list?page=1&limit=1000000",
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
    };

    const getTehsils = async () => {
        const config = {
            method: "get",
            url: "https://drfapi.jagatgururampalji.org/v1/tehsil/list?page=1&limit=100000",
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
    };

    const checkDataExist = async () => {
        let countries = await AsyncStorage.getItem("countries");
        let states = await AsyncStorage.getItem("states");
        let districts = await AsyncStorage.getItem("districts");
        let tehsils = await AsyncStorage.getItem("tehsils");
        return countries && states && districts && tehsils;
    };

    const checkIfLoggedIn = async () => {
        const loggedIn = await AsyncStorage.setItem("token", csrfKey);
        return loggedIn ? true : false;
    };

    useEffect(() => {
        if (checkIfLoggedIn) {
            console.log("Called2");
            if (!checkDataExist()) {
            getCountries();
            getStates();
            getDistricts();
            getTehsils();
            //     console.log("Called");
            }

            navigation.push("AshramDashboard");
        }
    }, []);

    const handleLogin = async () => {
        const config = {
            method: "post",
            url: "https://drfapi.jagatgururampalji.org/v1/auth/login",
            headers: {
                key: "dsv213a213sfv21123fs31d3fd132c3dv31dsf33",
                Accept: "application/json",
            },
            data: {
                "username": "9623099600",
                "password": "ankush",
                "device_id": "fdsfsf",
                "longitude": "20.000",
                "latitude": "30.555",
                "channel": "mobile",
                "device_token": "asdad",
            },
        };

        axios(config)
            .then(async (response) => {
                // console.log(response);
                if (response.data.success) {
                    const temp = {
                        ...showAlert,
                        show: true,
                        title: "Successful",
                        message: "You are successfully logged In",
                    };
                    setShowAlert(temp);
                    let csrfKey = "";
                    let cookies = response.headers["set-cookie"];
                    cookies = cookies[0].split(" namdan_csrf_key=");
                    // eslint-disable-next-line prefer-destructuring
                    csrfKey = cookies[1].split(";")[0];
                    console.log(response.data, "csrf", csrfKey);
                    await AsyncStorage.setItem("token", csrfKey);
                    await AsyncStorage.setItem("name", response.data.data.name);
                    await AsyncStorage.setItem("role", response.data.data.role);
                    await AsyncStorage.setItem("loggedIn", "true");
                    await getCountries();
                    await getStates();
                    await getDistricts();
                    await getTehsils();
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
                console.log(error);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
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
            <ScrollView style={{}}>
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
                                onChange={handleUserNameChange}
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
                                onChange={handlePasswordChange}
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
                            <Text style={[styles.textCenter, styles.textWhite]}>
                                Forget Password?
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.signUpContainer}>
                            <Text style={[styles.textCenter, styles.textWhite]}>
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
