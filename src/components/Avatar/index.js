import React from "react";
import { Text, View, Image } from "react-native";

import styles from "./styles";

const Avatar = ({
    status,
    imageSource,
    uri,
    imageSize = 60,
    borderSize = 70,
}) => {
    return (
        <View style={[{ width: borderSize }, styles.imageWrapper]}>
            <View
                style={[
                    {
                        width: borderSize,
                        height: borderSize,
                        borderRadius: borderSize / 2,
                    },
                    styles.imageBorder,
                ]}
            >
                <Image
                    style={[
                        {
                            width: imageSize,
                            height: imageSize,
                            borderRadius: imageSize / 2,
                        },
                        styles.image,
                    ]}
                    source={uri ? { uri } : imageSource}
                />
            </View>
            {status && (
                <Text allowFontScaling={false} style={styles.status}>
                    {status}
                </Text>
            )}
        </View>
    );
};

export default Avatar;

