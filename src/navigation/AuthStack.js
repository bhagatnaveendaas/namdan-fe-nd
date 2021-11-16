import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import VerifyOtp from "../screens/verifyOtp";

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Verify" component={VerifyOtp} />
        </Stack.Navigator>
    );
};

export default AuthStack;
