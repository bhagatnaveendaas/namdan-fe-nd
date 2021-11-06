import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/navigation/drawerNavigator";
import FontContainer from "./FontContainer";
import { AuthProvider } from "./src/context/AuthContext";

const App = () => (
    <FontContainer>
        <AuthProvider>
            <NavigationContainer>
                <DrawerNavigator />
            </NavigationContainer>
        </AuthProvider>
    </FontContainer>
);
export default App;
