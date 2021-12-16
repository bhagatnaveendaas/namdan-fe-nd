import React, { useEffect } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import Pdf from "react-native-pdf";

const PdfScreen = ({ navigation, route }) => {
    const source = {
        uri: route.params.url,
        cache: true,
    };

    useEffect(() => {
        navigation.setOptions({
            title: route.params?.name,
        });
    }, []);

    return (
        <View style={styles.container}>
            <Pdf
                source={source}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Filepath: ${filePath}`);
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});

export default PdfScreen;
