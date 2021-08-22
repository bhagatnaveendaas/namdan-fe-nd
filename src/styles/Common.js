import { StatusBar, StyleSheet, Dimensions } from "react-native";
import theme from "../constants/theme";

const { height, width } = Dimensions.get("window");

export default StyleSheet.create({
    inputField: {
        paddingVertical: "3.5%",
        textAlignVertical: "top",
    },
    label: {
        color: "#8A8A81",
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
