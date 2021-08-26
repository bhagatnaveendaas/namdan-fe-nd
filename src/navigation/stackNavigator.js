import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AshramDashboard from "../screens/AshramDashboard";
import CountryDashboard from "../screens/CountryDashboard";
import StateDashboard from "../screens/StateDashboard";
import DistrictDashboard from "../screens/DistrictDashboard";
import NaamdanSevadarDashboard from "../screens/NaamdanSevadarDashboard";
import Login from "../screens/Login";
import HomeHeader from "../components/HomeHeader";
import SignUp from "../screens/SignUp";
import verifyOtp from "../screens/verifyOtp";
import Entry from "../screens/Entry";
import NaamdanReport from "../screens/NaamdanReport";
import NaamdanCentre from "../screens/NaamdanCentre";
import PendingSatnaam from "../screens/PendingSatnaam";
import EligibilityForPunarUpdesh from "../screens/EligiblityForPunarUpdesh";
import AddNaamdanCenter from "../screens/AddNaamdanCenter";
import Approvals from "../screens/Approvals";
import Messages from "../screens/Messages";
import CreateMessage from "..//screens/CreateMessage";
import MessageDetails from "../screens/MessageDetails";

const Stack = createStackNavigator();

const MainStackNavigator = () => (
    <Stack.Navigator headerMode="screen">
        <Stack.Screen
            name="Login"
            component={Login}
            options={{ header: () => {} }}
        />
        <Stack.Screen name="Entry" component={Entry} />
        <Stack.Screen name="verifyOtp" component={verifyOtp} />
        <Stack.Screen
            name="Ashram Dashboard"
            component={AshramDashboard}
            // options={{
            //     headerTitle: (props) => (
            //         <HomeHeader {...props} title="Ashram dashboard" />
            //     ),
            // }}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
                headerTitle: (props) => (
                    <HomeHeader {...props} title="Sign up" />
                ),
            }}
        />
        <Stack.Screen name="Country Dashboard" component={CountryDashboard} />
        <Stack.Screen name="State Dashboard" component={StateDashboard} />
        <Stack.Screen name="District Dashboard" component={DistrictDashboard} />
        <Stack.Screen name="Naamdan Sevadar Dashboard" component={NaamdanSevadarDashboard} />
        <Stack.Screen name="NaamdanReport" component={NaamdanReport} />
        <Stack.Screen name="NaamdanCentre" component={NaamdanCentre} />
        <Stack.Screen name="PendingSatnaam" component={PendingSatnaam} />
        <Stack.Screen
            name="EligibilityForPunarUpdesh"
            component={EligibilityForPunarUpdesh}
        />
        <Stack.Screen name="AddNaamdanCenter" component={AddNaamdanCenter} />
        <Stack.Screen name="Approvals" component={Approvals} />
        <Stack.Screen name="Messages" component={Messages} />
        <Stack.Screen name="Compose Message" component={CreateMessage} />
        <Stack.Screen name="Message" component={MessageDetails} />
    </Stack.Navigator>
);

export default MainStackNavigator;
