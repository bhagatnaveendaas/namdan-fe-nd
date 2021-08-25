import { StatusBar, StyleSheet, Dimensions } from "react-native";
import theme from "../constants/theme";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    inputField: {
        paddingTop: "3.5%",
        textAlignVertical: "top",
        paddingHorizontal: "1%",
        width:"100%"
    },
    label: {
        paddingBottom: "2%",
        color: "#8A8A81",
        fontFamily: theme.fonts.poppins.regular,
    },
    dropdown: {
        width: "100%",
        borderColor: theme.colors.grey,
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: "center",
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
        backgroundColor: theme.colors.secondary,
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
});
