import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/context/AuthContext";
import MainStack from "./src/navigation/MainStack";

const App = () => {
    return (
        <AuthProvider>
            <NavigationContainer>
                <MainStack />
            </NavigationContainer>
        </AuthProvider>
    );
};
export default App;
