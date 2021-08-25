import { StatusBar, StyleSheet, Dimensions } from "react-native";

import theme from "../constants/theme";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    fontType:{
        fontFamily:theme.fonts.poppins.regular
    },
    container: {
        backgroundColor: theme.colors.primary,
        flex: 1,
        marginTop: StatusBar.currentHeight,
        paddingTop: height * 0.08,
    },
    image: {
        height: width * 0.6,
        width: width * 0.6,
        alignSelf: "center",
    },
    textCenter: {
        textAlign: "center",
    },
    textWhite: {
        color: theme.colors.white,
    },
    appName: {
        fontSize: height * 0.045,
        fontFamily:theme.fonts.poppins.semiBold
    },
    inputs: {
        backgroundColor: theme.colors.white,
        flex: 1,
        paddingHorizontal: width * 0.03,
        fontFamily:theme.fonts.poppins.regular
    },
    iconContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: height * 0.06,
        paddingHorizontal: width * 0.05,
        backgroundColor: theme.colors.white,
        borderRadius: height * 0.1,
        marginVertical: height * 0.01,
    },
    icons: {
        padding: 0,
    },
    inputContainer: {
        paddingHorizontal: width * 0.07,
        paddingTop: height * 0.05,
    },
    loginButton: {
        backgroundColor: theme.colors.primary,
        padding: width * 0.038,
        borderRadius: width * 0.1,
        alignItems: "center",
        elevation: 4,
        shadowColor: "rgba(0,0,0, .4)", // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, // IOS
    },
    GreyButton: {
        backgroundColor: "#F2F2F2",
        padding: width * 0.038,
        borderRadius: width * 0.1,
        alignItems: "center",
        elevation: 4,
        shadowColor: "rgba(0,0,0, .4)", // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, // IOS
    },
    loginButtonText: {
        textTransform: "uppercase",
        // fontWeight: "bold",
        fontFamily:theme.fonts.poppins.semiBold
    },
    GreyButtonText: {
        textTransform: "uppercase",
        fontFamily:theme.fonts.poppins.semiBold,
        color: "#666666",
    },
    buttonContainer: {
        paddingTop: height * 0.04,
        paddingBottom: height * 0.02,
    },
    signUpContainer: {
        paddingTop: height * 0.09,
    },
});
