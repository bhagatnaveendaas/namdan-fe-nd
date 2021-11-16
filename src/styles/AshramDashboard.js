import { StyleSheet } from "react-native";
import theme from "../constants/theme";
import { FONTS } from "../constants/fonts";

export default StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    scoreBoard: {
        backgroundColor: theme.colors.primary,
        borderRadius: 10,
        paddingBottom: "2%",
        elevation: 5,
    },
    prathamDiv: {
        alignContent: "center",
        alignSelf: "center",
        color: theme.colors.white,
    },
    label: {
        color: theme.colors.primary,
        ...FONTS.h4,
        marginVertical: 10,
    },
});
