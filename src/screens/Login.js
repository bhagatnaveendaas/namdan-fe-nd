import { Feather } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AsyncStorage, Image, SafeAreaView, Text, View } from "react-native";
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
import appConfig from '../config';
import roles from '../constants/text/Roles'

function Login({ navigation }) {
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
        console.log("Called");
        const config = {
            method: "get",
            url: `${appConfig.apiUrl}/country/list?page=1&limit=1000`,
            headers: {
                key: appConfig.apiKey,
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
            url: `${appConfig.apiUrl}/state/list?page=1&limit=100000`,
            headers: {
                key: appConfig.apiKey,
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
            url: `${appConfig.apiUrl}/district/list?page=1&limit=1000000`,
            headers: {
                key: appConfig.apiKey,
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
            url: `${appConfig.apiUrl}/tehsil/list?page=1&limit=100000`,
            headers: {
                key: appConfig.apiKey,
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
        const countries = await AsyncStorage.getItem("countries");
        const states = await AsyncStorage.getItem("states");
        const districts = await AsyncStorage.getItem("districts");
        const tehsils = await AsyncStorage.getItem("tehsils");
        return countries && states && districts && tehsils;
    };

    // const checkIfLoggedIn = async () => {
    //     const loggedIn = await AsyncStorage.setItem("token", csrfKey);
    //     return loggedIn ? true : false;
    // };

    useEffect(() => {
        // if (checkIfLoggedIn) {
        console.log("Called2");
        if (!checkDataExist()) {
            getCountries();
            getStates();
            getDistricts();
            getTehsils();
        }

            // navigation.push("AshramDashboard");
        // }
    }, []);

    const handleLogin = async () => {
        // TODO: If I uncomment the following line, it's giving No identifiers allowed directly after numeric literal
        // const deviceToken = Math.random() * 1_00_00_000;

        const config = {
            method: "post",
            url: `${appConfig.apiUrl}/auth/login`,
            headers: {
                "key": appConfig.apiKey,
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            data: {
                "username": userName,
                "password": password,
                "device_id": "fdsfsf",
                "longitude": "20.000",
                "latitude": "30.555",
                "channel": "mobile",
                "device_token": "asdad"
            },
        };
        console.log({ config });
        try {
        axios(config)
            .then(async (response) => {
                console.log("Login Response: ");
                console.log({ response });
                if (response.data.success) {
                    // const temp = {
                    //     ...showAlert,
                    //     show: true,
                    //     title: "Successful",
                    //     message: "You are successfully logged In",
                    // };
                    // setShowAlert(temp);
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
                    // await AsyncStorage.setItem("userCountry", response.data.data.country);
                    // await AsyncStorage.setItem("userState", response.data.data.state);
                    // await AsyncStorage.setItem("userDistrict", response.data.data.district);
                    await getCountries();
                    await getStates();
                    await getDistricts();
                    await getTehsils();
                    if (response.data.data.role === roles.ASHRAM_ADMIN || response.data.data.role === roles.SUPER_ADMIN) {
                        navigation.push("Ashram Dashboard");
                    } else if (response.data.data.role === roles.COUNTRY_COORDINATOR) {
                        navigation.push("Country Dashboard");
                    } else if (response.data.data.role === roles.STATE_COORDINATOR) {
                        navigation.push("State Dashboard");
                    } else if (response.data.data.role === roles.DISTRICT_COORDINATOR) {
                        navigation.push("District Dashboard");
                    } else if (response.data.data.role === roles.NAAMDAN_SEWADAR) {
                        navigation.push("Naamdan Sevadar Dashboard");
                    }
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
                if (error.response && error.response.data) {
                    console.log(error.response.data);
                }
                console.error(error);
            });
        } catch(ex) {
            console.log(ex);
        }
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
