import React from "react";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import theme from "../constants/theme";
import { createDrawerNavigator } from "@react-navigation/drawer";
import UserProfile from "../screens/UserProfile";
import MainStackNavigator from "./AppStack";
import CustomDrawer from "../components/CustomDrawer";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
    <Drawer.Navigator
        edgeWidth={0}
        drawerContentOptions={{
            activeTintColor: theme.colors.white,
            activeBackgroundColor: theme.colors.primary,
            labelStyle: { marginLeft: -15 },
        }}
        screenOptions={{
            headerTitleAllowFontScaling: false,
        }}
        drawerContent={(props) => <CustomDrawer {...props} />}
    >
        <Drawer.Screen
            name="Dashboard"
            options={{
                drawerIcon: ({ focused }) => (
                    <MaterialIcons
                        name="dashboard"
                        size={22}
                        color={
                            focused ? theme.colors.white : theme.colors.primary
                        }
                    />
                ),
            }}
            component={MainStackNavigator}
        />
        <Drawer.Screen
            options={{
                headerShown: true,
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor: theme.colors.primary,
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontFamily: theme.fonts.poppins.semiBold,
                },
                drawerIcon: ({ focused }) => (
                    <Feather
                        name="user"
                        size={22}
                        color={
                            focused ? theme.colors.white : theme.colors.primary
                        }
                    />
                ),
            }}
            name="Profile"
            component={UserProfile}
        />
    </Drawer.Navigator>
);

export default DrawerNavigator;
