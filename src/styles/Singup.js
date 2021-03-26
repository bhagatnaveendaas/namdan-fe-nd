import { StatusBar, StyleSheet } from "react-native";
import theme from '../constants/theme';
import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    inputField: {
        paddingTop: "3.5%"
    },
    label: {
        paddingBottom: "2%"
    },
    dropdown: {
        width: "100%",
        borderColor: theme.colors.grey,
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: theme.colors.white
    },
    textInput: {
        borderColor: theme.colors.grey,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: "2.5%",
        paddingHorizontal: "2%",
        backgroundColor: theme.colors.white
    },
    mainContainer: {
        paddingHorizontal: theme.screenPadding.horizontal,
        paddingBottom: theme.screenPadding.bottom,
        backgroundColor: "#FAFAFA"
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 100,
        alignSelf: "center"
    },
    textCenter: {
        textAlign: "center"
    },
    buttonContainer: { paddingVertical: "5%" }
})
