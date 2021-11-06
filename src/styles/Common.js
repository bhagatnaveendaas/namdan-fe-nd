import { StyleSheet } from "react-native";
import theme from "../constants/theme";

export default StyleSheet.create({
    inputField: {
        paddingVertical: "3.5%",
        textAlignVertical: "top",
    },
    label: {
        color: theme.colors.primary,
        fontFamily:theme.fonts.poppins.semiBold,
        textTransform:"capitalize",
        alignItems:'center',
        paddingTop:3
    },
    upload: {
        height: 50,
        flexDirection:'row',
        alignItems:"center",
        justifyContent: "center",
        backgroundColor: "#EBEBEB",
        borderRadius: 25,
        marginTop: 20,
    },
    container: {
        borderColor: theme.colors.grey,
        borderWidth: 1,
        display: "flex",
        flexDirection: "row",
        borderRadius: 10,
        paddingVertical: "3.5%",
        width:"100%",
        paddingHorizontal: "2%",
        backgroundColor: theme.colors.white,
        textAlignVertical: "top",
    },
});
