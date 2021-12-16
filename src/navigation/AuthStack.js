import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import VerifyOtp from "../screens/verifyOtp";
import TermsAndCondi from "../screens/TermsAndCondi";

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Verify" component={VerifyOtp} />
            <Stack.Screen name="Terms" component={TermsAndCondi} />
        </Stack.Navigator>
    );
};

export default AuthStack;
