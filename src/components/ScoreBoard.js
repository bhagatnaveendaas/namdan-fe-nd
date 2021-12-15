import React from "react";
import { View, Text, ToastAndroid } from "react-native";
import styles from "../styles/AshramDashboard";
import theme from "../constants/theme";
import { FONTS } from "../constants/fonts";

const ScoreBoard = (props) => {
    const {
        total,
        prathams,
        sarnams,
        satnams,
        sarshabd,
        punarUpdesh,
        prathamVsSatnam,
    } = props;
    return (
        <View
            style={{
                backgroundColor: theme.colors.primary,
                padding: 15,
                borderRadius: 15,
                width: "100%",
            }}
        >
            <View
                style={{
                    alignItems: "center",
                    marginBottom: 10,
                    paddingBottom: 5,
                    marginHorizontal: 7.5,
                    borderBottomColor: "white",
                    borderBottomWidth: 2,
                }}
            >
                <Text allowFontScaling={false} style={styles.number}>
                    {total}
                </Text>
                <Text allowFontScaling={false} style={styles.label}>
                    {"TOTAL NAMDAN"}
                </Text>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "wrap",
                    width: "100%",
                    justifyContent: "space-around",
                    position: "relative",
                }}
            >
                <View
                    style={{
                        height: "100%",
                        width: 2,
                        backgroundColor: "white",
                        position: "absolute",
                        left: "49.5%",
                    }}
                />
                <View style={[styles.item, styles.bborder]}>
                    <Text allowFontScaling={false} style={styles.number}>
                        {prathams}
                    </Text>
                    <Text allowFontScaling={false} style={styles.label}>
                        {"PRATHAM NAM"}
                    </Text>
                </View>
                <View style={[styles.item, styles.lborder, styles.bborder]}>
                    <Text allowFontScaling={false} style={styles.number}>
                        {satnams}
                    </Text>
                    <Text allowFontScaling={false} style={styles.label}>
                        {"SATNAM"}
                    </Text>
                </View>
                <View style={[styles.item, styles.bborder]}>
                    <Text allowFontScaling={false} style={styles.number}>
                        {sarnams}
                    </Text>
                    <Text allowFontScaling={false} style={styles.label}>
                        {"SARNAM"}
                    </Text>
                </View>
                <View style={[styles.item, styles.lborder, styles.bborder]}>
                    <Text allowFontScaling={false} style={styles.number}>
                        {sarshabd}
                    </Text>
                    <Text allowFontScaling={false} style={styles.label}>
                        {"SARSHABD"}
                    </Text>
                </View>
                <View style={styles.item}>
                    <Text allowFontScaling={false} style={styles.number}>
                        {prathamVsSatnam}
                    </Text>
                    <Text allowFontScaling={false} style={styles.label}>
                        {"PENDING SATNAM"}
                    </Text>
                </View>
                <View style={[styles.item, styles.lborder]}>
                    <Text allowFontScaling={false} style={styles.number}>
                        {punarUpdesh}
                    </Text>
                    <Text allowFontScaling={false} style={styles.label}>
                        {"PUNAR UPDESH"}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default ScoreBoard;
