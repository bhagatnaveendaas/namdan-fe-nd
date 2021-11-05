import { StyleSheet } from "react-native";
import theme from "../constants/theme";

export default StyleSheet.create({
    wrapper: { marginTop: 10 },
    label: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.poppins.regular,
        fontSize: 14,
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: theme.colors.primaryLight,
        paddingRight: 10,
        height: 40,
    },
    input: {
        height: "100%",
        padding: 0,
        paddingLeft: 2,
        flex: 1,
        lineHeight: 22,
        fontSize: 15,
        fontFamily: theme.fonts.poppins.regular,
        color: theme.colors.primary,
    },
    dateText: {
        flex: 1,
        fontSize: 15,
        lineHeight: 22,
        fontFamily: theme.fonts.poppins.regular,
        color: theme.colors.primary,
    },
    firstPickerItem: { color: theme.colors.primaryLight },
    pickerItem: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.poppins.regular,
    },
    required: { color: "red" },
    placeholderColor: { color: theme.colors.primaryLight },
});
