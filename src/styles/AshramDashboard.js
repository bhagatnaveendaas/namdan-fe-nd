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
    number: {
        ...FONTS.h2,
        color: theme.colors.white,
    },
    label: {
        ...FONTS.h4,
        fontSize: 15,
        color: theme.colors.white,
    },
    prathamDiv: {
        alignContent: "center",
        alignSelf: "center",
        color: theme.colors.white,
    },
    item: {
        width: "45%",
        alignItems: "center",
        paddingVertical: 7,
    },
    lborder: { borderLeftColor: theme.colors.white, borderLeftWidth: 0 },
    bborder: {
        borderBottomColor: theme.colors.white,
        borderBottomWidth: 2,
    },
    label2: {
        color: theme.colors.primary,
        ...FONTS.h4,
        marginVertical: 10,
    },
});
