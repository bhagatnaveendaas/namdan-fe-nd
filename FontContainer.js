import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

export default ({ children }) => {
    const [fontsLoaded] = useFonts({
        "poppins-regular": require("./assets/fonts/Poppins-Regular.ttf"),
        "Lora-VariableFont_wght": require("./assets/fonts/Lora-VariableFont_wght.ttf"),
        "Lora-Bold": require("./assets/fonts/Lora-Bold.ttf"),
        "poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
        "poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
        "poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
        "poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
        "poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
        "poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
    });

    return fontsLoaded ? children : <AppLoading />;
};
