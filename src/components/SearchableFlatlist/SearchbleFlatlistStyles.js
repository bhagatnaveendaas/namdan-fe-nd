import { StyleSheet } from "react-native";

import theme from "../../constants/theme";

export default StyleSheet.create({
    dropdown: {
        position: "absolute",
        top: "110%",
        backgroundColor: theme.colors.white,
        borderWidth: 1,
        borderColor: theme.colors.primaryLight,
        width: "100%",
        zIndex: 10,
        borderRadius: 10,
        paddingHorizontal: 5,
        elevation: 5,
        maxHeight: 190,
    },
    dropdownItem: {
        padding: 10,
        borderBottomColor: theme.colors.primaryLight,
        borderBottomWidth: 1,
    },
    itemText: {
        fontFamily: theme.fonts.poppins.regular,
        color: theme.colors.primary,
        fontSize: 18,
        paddingLeft: 2,
    },
    placeholderText: {
        color: theme.colors.primaryLight,
    },
});
