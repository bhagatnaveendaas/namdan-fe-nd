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
        paddingVertical: 5,
    },
    dropdownItem: {
        padding: 10,
        borderBottomColor: theme.colors.primaryLight,
        borderBottomWidth: 1,
        marginBottom: 2,
    },
    itemText: {
        fontFamily: theme.fonts.poppins.regular,
        color: theme.colors.primary,
        fontSize: 15,
    },
});
