import { StyleSheet } from 'react-native'
import { FONTS, SIZES } from "../constants/fonts";
import theme from "../constants/theme";

export default StyleSheet.create({
    historyBtn: {
        marginTop: 15,
        padding: 5,
        paddingHorizontal: 10,
        backgroundColor: theme.colors.white,
        borderRadius: 5,
        flexDirection: "row",
        elevation: 5,
        justifyContent: "space-between",
        alignItems: "center",
    }
})