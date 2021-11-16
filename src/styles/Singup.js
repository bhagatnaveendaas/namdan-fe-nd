import { StatusBar, StyleSheet, Dimensions } from "react-native";
import theme from "../constants/theme";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    inputField: {
        paddingTop: "3.5%",
        textAlignVertical: "top",
        paddingHorizontal: "1%",
        width: "100%",
    },
    label: {
        paddingBottom: "0.3%",
        color: theme.colors.primary,
        fontFamily: theme.fonts.poppins.regular,
    },
    textFieldContainer: {
        borderBottomWidth: 1,
    },
    selectFieldContainer: {
        borderWidth: 1,
        borderRadius: 50,
    },
    dateContainer: {
        borderWidth: 1,
        paddingHorizontal: 15,
        borderRadius: 50,
    },
    dropdown: {
        width: "100%",
        borderColor: theme.colors.grey,
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: "center",
        height: 40,

        backgroundColor: theme.colors.white,
    },
    textInput: {
        borderColor: theme.colors.grey,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: "2.5%",
        paddingHorizontal: "2%",
        backgroundColor: theme.colors.white,
        textAlignVertical: "top",
        fontFamily: theme.fonts.poppins.regular,
    },
    mainContainer: {
        paddingHorizontal: theme.screenPadding.horizontal,
        paddingBottom: theme.screenPadding.bottom,
        backgroundColor: theme.colors.white,
        paddingTop: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 100,
        alignSelf: "center",
    },
    textCenter: {
        textAlign: "center",
    },
    buttonContainer: { paddingVertical: "5%", paddingHorizontal: "1%" },
    placeholder: {
        color: "#A4A4A4",
    },
    appendIcon: {
        width: 20,
        height: 20,
        tintColor: "#B1B1B1",
    },
    countryCodeBtn: {
        width: 50,
        height: 25,
        alignItems: "center",
        justifyContent: "center",
        borderRightColor: theme.colors.primaryLight,
        borderRightWidth: 2,
        marginRight: 5,
    },
    button: {
        marginVertical: 20,
        marginBottom: 30,
        backgroundColor: theme.colors.primary,
        height: 50,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 18,
        fontFamily: theme.fonts.poppins.regular,
        color: theme.colors.white,
    },
});
