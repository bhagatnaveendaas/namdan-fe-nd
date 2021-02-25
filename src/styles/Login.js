import { StatusBar, StyleSheet } from "react-native";
import theme from '../constants/theme';
import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        backgroundColor: theme.colors.primary,
        flex: 1,
        marginTop: StatusBar.currentHeight,
        paddingTop: height * 0.08

    },
    image: {
        height: width * 0.6,
        width: width * 0.6,
        alignSelf: "center"
    },
    textCenter: {
        textAlign: "center"
    },
    textWhite: {
        color: theme.colors.white
    },
    appName: {
        fontSize: height * 0.045
    },
    inputs: {
        backgroundColor: theme.colors.white,
        flex: 1,
        paddingHorizontal: width * 0.03
    },
    iconContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.06,
        paddingHorizontal: width * 0.05,
        backgroundColor: theme.colors.white,
        borderRadius: height * 0.1,
        marginVertical: height * 0.01
    },
    icons: {
        padding: 0,
    },
    inputContainer: {
        paddingHorizontal: width * 0.07,
        paddingTop: height * 0.05
    },
    loginButton: {
        backgroundColor: theme.colors.secondary,
        padding: width * .038,
        borderRadius: width * 0.1,
        alignItems: "center"
    },
    loginButtonText: {
        textTransform: "uppercase",
        fontWeight: "bold"
    },
    buttonContainer: {
        paddingTop: height * 0.04,
        paddingBottom: height * 0.02
    },
    signUpContainer: {
        paddingTop: height * 0.09
    }
});