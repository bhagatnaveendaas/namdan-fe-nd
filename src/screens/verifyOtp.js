import React, { useState, useRef } from "react";
import { View, Text, Image, AsyncStorage } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import RoundButton from "../components/RoundButton";
import theme from "../constants/theme";
import styles from "../styles/Login";
import { useAuth } from "../context/AuthContext";
import { postJsonData } from "../httpClient/apiRequest";

const VerifyOtp = ({ route, navigation }) => {
    const { dispatch } = useAuth();
    const { userName, deviceToken } = route.params;
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const ref = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];
    const onKeyPress = (e, index) => {
        if (e.nativeEvent?.key === "Backspace") {
            if (otp[index] === "") {
                if (index > 0) {
                    ref[index - 1].current.focus();
                }
            }
        }
    };
    const handleChange = (value, index) => {
        if (isNaN(value)) return false;
        if (index <= 4 && value != "") {
            ref[index + 1].current.focus();
        }
        setOtp([...otp.map((d, idx) => (idx === index ? value : d))]);
    };
    const verifyOtp = async () => {
        try {
            const { data, headers } = await postJsonData("/auth/login", {
                username: userName,
                device_id: deviceToken,
                longitude: "20.000",
                latitude: "30.555",
                channel: "mobile",
                device_token: "asdad",
                login_otp: otp.join(""),
            });
            if (data?.success === true) {
                let cookies = headers["set-cookie"];
                cookies = cookies[0].split("namdan_csrf_key=");
                // eslint-disable-next-line prefer-destructuring
                const csrfKey = cookies[1].split(";")[0];
                console.log(csrfKey);
                const user = data?.data;
                await AsyncStorage.setItem("token", csrfKey);
                await AsyncStorage.setItem("user", JSON.stringify(user));
                dispatch({
                    type: "LOGIN_USER",
                    payload: { user },
                });
            }
        } catch (error) {
            if (error && error.response) {
                console.error("Error", error.response.data.error);
            } else {
                console.error("Error in login request.", error.message);
            }
        }
    };
    return (
        <View
            style={{
                backgroundColor: theme.colors.primary,
                flex: 1,
                padding: 15,
                paddingTop: "10%",
            }}
        >
            <Image
                style={styles.image}
                source={require("../../assets/Guruji2.png")}
            />
            <Text allowFontScaling={false} style={styles.label}>
                Enter OTP
            </Text>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                {otp.map((_, index) => {
                    return (
                        <TextInput
                            ref={ref[index]}
                            keyboardType="numeric"
                            autoFocus={index === 0 ? true : undefined}
                            value={otp[index]}
                            onTouchCancel={() => console.log("hello")}
                            key={index}
                            style={styles.otp}
                            maxLength={1}
                            onKeyPress={(e) => onKeyPress(e, index)}
                            onChangeText={(e) => handleChange(e, index)}
                        />
                    );
                })}
            </View>
            <View style={{ paddingTop: "20%", alignItems: "center" }}>
                <RoundButton
                    label="Verify OTP"
                    handlePress={() => {
                        if (otp.join("").length >= 6) {
                            verifyOtp();
                        } else {
                            alert("Please fill OTP correctly.");
                        }
                    }}
                />
            </View>
        </View>
    );
};

export default VerifyOtp;
