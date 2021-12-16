import { StatusBar, StyleSheet, Dimensions } from "react-native";

import theme from "../constants/theme";
import { FONTS } from "../constants/fonts";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    fontType: {
        fontFamily: theme.fonts.poppins.regular,
    },
    container: {
        backgroundColor: theme.colors.primary,
        flex: 1,
        // marginTop: StatusBar.currentHeight,
        // paddingTop: height * 0.08,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    term: {
        marginLeft: 10,
        ...FONTS.body3,
        color: theme.colors.white,
    },
    image: {
        flex: 1,
        marginBottom: 15,
        height: width,
        width: width,
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
        fontFamily: theme.fonts.poppins.semiBold,
    },
    inputs: {
        backgroundColor: theme.colors.white,
        flex: 1,
        ...FONTS.h3,
        fontSize: 18,
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
        borderWidth: 1,
        borderColor: theme.colors.primaryLight,
    },
    icons: {
        padding: 0,
    },
    inputContainer: {
        paddingHorizontal: width * 0.07,
        alignItems: "center",
    },
    loginButton: {
        backgroundColor: theme.colors.white,
        color: theme.colors.primary,
        padding: width * 0.035,
        width: 200,
        borderRadius: width * 0.5,
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
        ...FONTS.h3,
        color: theme.colors.primary,
    },
    GreyButtonText: {
        textTransform: "uppercase",
        fontFamily: theme.fonts.poppins.semiBold,
        color: "#666666",
    },
    buttonContainer: {
        paddingTop: height * 0.04,
        paddingBottom: height * 0.02,
    },
    signUpContainer: {
        paddingTop: height * 0.09,
    },
    label: {
        color: theme.colors.white,
        textAlign: "center",
        ...FONTS.h2,
        marginTop: 30,
        marginBottom: 15,
    },
    otpContainer: {},
    otp: {
        width: 55,
        height: 55,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: theme.colors.primaryLight,
        backgroundColor: theme.colors.white,
        ...FONTS.body1,
        textAlign: "center",
    },
});
