import { StyleSheet } from "react-native";
import theme from "../constants/theme";
import { FONTS } from "../constants/fonts";

export default StyleSheet.create({
    wrapper: { marginTop: 10 },
    label: {
        color: theme.colors.primary,
        ...FONTS.body4,
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
        color: theme.colors.primary,
        ...FONTS.body3,
    },
    dateText: {
        flex: 1,
        lineHeight: 22,
        color: theme.colors.primary,
        ...FONTS.body3,
    },
    firstPickerItem: { color: theme.colors.primaryLight, ...FONTS.body3 },
    pickerItem: {
        color: theme.colors.primary,
        ...FONTS.body3,
    },
    required: { color: "red" },
    placeholderColor: { color: theme.colors.primaryLight },
});
