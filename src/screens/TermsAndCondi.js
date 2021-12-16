import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import theme from "../constants/theme";
const URL = "https://namdan.jagatgururampalji.org/v1/static/terms.html";

const styles = StyleSheet.create({
    loadingContainer: {
        position: "absolute",
        height: "100%",
        width: "100%",
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },
});

const TermsAndCondi = () => {
    const loadingView = () => {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator
                    size={"large"}
                    color={theme.colors.primary}
                />
            </View>
        );
    };
    return (
        <WebView
            source={{ uri: URL }}
            startInLoadingState
            renderLoading={loadingView}
        />
    );
};

export default TermsAndCondi;
