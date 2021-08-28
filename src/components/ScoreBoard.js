import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/AshramDashboard";
import theme from "../constants/theme";

const ScoreBoard = (props) => (
    <View style={{ paddingHorizontal: "1%" }}>
        <View style={styles.scoreBoard}>
            <View style={{ flexDirection: "column" }}>
                <View
                    style={[
                        styles.prathamDiv,
                        { paddingTop: "3%", paddingBottom: "5%" },
                    ]}
                >
                    <Text
                        style={{
                            fontFamily: theme.fonts.lora.bold,
                            color: theme.colors.white,
                            textAlign: "center",

                            fontSize: 25,
                        }}
                    >
                        {props.prathams}
                    </Text>
                    <Text
                        style={{
                            fontFamily: theme.fonts.lora.bold,
                            color: theme.colors.white,
                            textAlign: "center",

                            paddingTop: "1%",
                        }}
                    >
                        PRATHAM NAM
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignContent: "center",
                        alignSelf: "center",
                        paddingBottom: "3%",
                    }}
                >
                    <View
                        style={{
                            borderRightColor: theme.colors.white,
                            borderRightWidth: 1,
                            paddingVertical: "2%",
                            width: "50%",
                        }}
                    >
                        <View
                            style={[
                                styles.prathamDiv,
                                {
                                    paddingBottom: "10%",
                                    borderBottomColor: theme.colors.white,
                                    borderBottomWidth: 1,
                                    width: "80%",
                                    alignContent: "center",
                                    alignSelf: "center",
                                },
                            ]}
                        >
                            <Text
                                style={{
                                    fontFamily: theme.fonts.lora.bold,
                                    color: theme.colors.white,

                                    fontSize: 20,
                                    textAlign: "center",
                                }}
                            >
                                {props.satnams}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: theme.fonts.lora.bold,
                                    color: theme.colors.white,
                                    textAlign: "center",

                                    paddingTop: "1%",
                                }}
                            >
                                SATNAM
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.prathamDiv,
                                { paddingVertical: "6%" },
                            ]}
                        >
                            <Text
                                style={{
                                    fontFamily: theme.fonts.lora.bold,
                                    color: theme.colors.white,

                                    fontSize: 20,
                                    textAlign: "center",
                                }}
                            >
                                {props.prathamVsSatnam}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: theme.fonts.lora.bold,
                                    color: theme.colors.white,
                                    textAlign: "center",

                                    paddingTop: "1%",
                                }}
                            >
                                PENDING
                                {"\n"}
                                SATNAM{" "}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            borderRightColor: theme.colors.white,
                            paddingVertical: "2%",
                            width: "50%",
                        }}
                    >
                        <View
                            style={[
                                styles.prathamDiv,
                                {
                                    paddingBottom: "10%",
                                    borderBottomColor: theme.colors.white,
                                    borderBottomWidth: 1,
                                    width: "80%",
                                },
                            ]}
                        >
                            <Text
                                style={{
                                    fontFamily: theme.fonts.lora.bold,
                                    color: theme.colors.white,

                                    fontSize: 20,
                                    textAlign: "center",
                                }}
                            >
                                {props.sarnams}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: theme.fonts.lora.bold,
                                    color: theme.colors.white,
                                    textAlign: "center",

                                    paddingTop: "1%",
                                }}
                            >
                                SARNAM
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.prathamDiv,
                                { paddingVertical: "6%" },
                            ]}
                        >
                            <Text
                                style={{
                                    fontFamily: theme.fonts.lora.bold,
                                    color: theme.colors.white,

                                    fontSize: 20,
                                    textAlign: "center",
                                }}
                            >
                                {props.punarUpdesh}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: theme.fonts.lora.bold,
                                    color: theme.colors.white,
                                    textAlign: "center",

                                    paddingTop: "1%",
                                }}
                            >
                                PUNAR
                                {"\n"}
                                UPDESH
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    </View>
);

export default ScoreBoard;
