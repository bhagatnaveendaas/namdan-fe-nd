import { StatusBar, StyleSheet, Dimensions } from "react-native";
import theme from "../constants/theme";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    subject: {
        fontFamily:theme.fonts.poppins.semiBold,
        fontSize: 15,
        color: "#5E5E5E",
    },
    rightlabelContainer: {
        width: "10%",
    },
    labels: {
        fontSize: 13,
        fontFamily:theme.fonts.poppins.regular,
        color: "#8A8A81",
    },
    row: {
        flexDirection: "row",
    },
    body: {
        fontSize: 14,
        fontFamily:theme.fonts.poppins.regular,
        color: "#8A8A81",
    },
    upperContainer: {
        paddingHorizontal: "3.5%",
        paddingVertical: "4%",
        backgroundColor: "#F2F2F2",
        flex: 1,
    },
    bottomContainer: {
        flex: 1,
        flexDirection: "column",
        paddingHorizontal: "3.5%",
        paddingTop: "4%",
        paddingBottom: "12%",
    },
    approvedbyContainer: {
        paddingTop: "3.5%",
    },
    chipOuterContainer: {
        padding: "2%",
    },
    approvedbyChip: {
        paddingHorizontal: "2.5%",
        paddingVertical: "1.5%",
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#C7C7C7",
        backgroundColor: "#F2F2F2",
    },
    chipText: {
        color: "#8A8A81",
        fontSize: 15,
        fontFamily:theme.fonts.poppins.regular,
        textAlign: "center",
    },
});
