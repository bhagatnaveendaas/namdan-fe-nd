import { StyleSheet } from 'react-native'
import theme from "../../constants/theme";
import { FONTS } from "../../constants/fonts";
export default StyleSheet.create({
    imageWrapper: {
        alignItems: "center",
        justifyContent: "center",
    },
    imageBorder: {
        borderWidth: 4,
        alignItems: "center",
        justifyContent: "center",
        borderColor: theme.colors.green,
        backgroundColor: theme.colors.white,
    },
    image: {},
    status: {
        color: theme.colors.white,
        backgroundColor: theme.colors.green,
        marginTop: 2,
        borderRadius: 5,
        ...FONTS.h6,
        paddingHorizontal: 5,
    },
});
