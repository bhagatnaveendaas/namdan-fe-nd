import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AshramDashboard from "../screens/AshramDashboard";
import CountryDashboard from "../screens/CountryDashboard";
import SignUp from "../screens/SignUp";
import NaamdanReport from "../screens/NaamdanReport";
import NaamdanCentre from "../screens/NaamdanCentre";
import PendingSatnaam from "../screens/PendingSatnaam";
import EligibilityForPunarUpdesh from "../screens/EligiblityForPunarUpdesh";
import AddNaamdanCenter from "../screens/AddNaamdanCenter";
import Approvals from "../screens/Approvals";
import Messages from "../screens/Messages";
import CreateMessage from "../screens/CreateMessage";
import MessageDetails from "../screens/MessageDetails";
import Entry from "../screens/entry/index";
import theme from "../constants/theme";
import AddSewadaar from "../screens/AddSewadaar";
import SearchScreen from "../screens/Search";
import Profile from "../screens/Profile";
import { useAuth } from "../context/AuthContext";

const Stack = createStackNavigator();

const AppStack = () => {
    const {
        state: { user },
    } = useAuth();

    return (
        <Stack.Navigator
            initialRouteName="AshramDashboard"
            headerMode="screen"
            screenOptions={{
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor: theme.colors.primary,
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontFamily: theme.fonts.poppins.semiBold,
                },
                headerBackAllowFontScaling: false,
                headerTitleAllowFontScaling: false,
            }}
        >
            <Stack.Screen
                name="AshramDashboard"
                component={AshramDashboard}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Entry" component={Entry} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Pratham Naam" component={SignUp} />
            <Stack.Screen
                name="CountryDashboard"
                component={CountryDashboard}
            />
            <Stack.Screen name="Naamdan Report" component={NaamdanReport} />
            <Stack.Screen name="Naamdan Centre" component={NaamdanCentre} />
            <Stack.Screen name="Pending Satnaam" component={PendingSatnaam} />
            <Stack.Screen
                name="Punar Updesh Eligibles"
                component={EligibilityForPunarUpdesh}
            />
            <Stack.Screen
                name="Add Naamdan Center"
                component={AddNaamdanCenter}
            />
            <Stack.Screen name="Add Sewadaar" component={AddSewadaar} />
            <Stack.Screen name="Approvals" component={Approvals} />
            <Stack.Screen name="Messages" component={Messages} />
            <Stack.Screen name="Compose Message" component={CreateMessage} />
            <Stack.Screen name="Message" component={MessageDetails} />
        </Stack.Navigator>
    );
};

export default AppStack;