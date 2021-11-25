import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { FONTS } from "../constants/fonts";
import theme from "../constants/theme";
import moment from "moment";
import { lastIndexOf } from "lodash";
const clockImage = require("../../assets/icons/clock.png");

const History = ({ route }) => {
    let history = route.params?.history;

    let newTemp = [...history].map((h, j) => {
        let pratham = h.detail.filter((item) => item.name === "first_mantra" || item.name === 'satnam_attendance')
        let satnam = h.detail.filter((item) => item.name === "satnam" )
        let satnam_exam = h.detail.filter(item => item.name==="satnam_exam")
        let sarnam = h.detail.filter((item) => item.name === "sarnam" )
        let sarnam_exam = h.detail.filter(item => item.name==="sarnam_exam")
        let shuddhikaran = h.detail.filter(item => item.name.includes("shuddhikaran"))
        let reupdesh = h.detail.filter((item) => item.name === "reupdesh")
        
        return [pratham, satnam, satnam_exam, sarnam, sarnam_exam, shuddhikaran, reupdesh];
    })


    let newHistory = [...newTemp].map((k, l) => {
        return k.map((h, i) => {
            return h.map(({ name, date, remark }, j) => {
                if (name === "first_mantra")
                    return {
                        name: l === 0 ? `Pratham Naam` : `Punar Updesh ${l}`,
                        date: moment(date, "YYYY-MM-DD").format("DD-MM-YYYY"),
                        remark,
                    };
                if (name === "satnam_attendance")
                    return {
                        name: `Hajri${j}`,
                        date: moment(date, "YYYY-MM-DD").format("DD-MM-YYYY"),
                        remark,
                    };
                if (name === "satnam_exam")
                    return {
                        name: `Satnam Exam ${j+1}`,
                        date: moment(date, "YYYY-MM-DD").format("DD-MM-YYYY"),
                        remark,
                    };
                if (name === `satnam_shuddhikaran`)
                    return {
                        name: `Satnam Shuddhikaran ${j+1}`,
                        date: moment(date, "YYYY-MM-DD").format("DD-MM-YYYY"),
                        remark,
                    };
                if (name === "reupdesh")
                    return {
                        name: `Punar Updesh ${j + 1}`,
                        date: moment(date, "YYYY-MM-DD").format("DD-MM-YYYY"),
                        remark,
                    };
                else
                    return {
                        name,
                        date: moment(date, "YYYY-MM-DD").format("DD-MM-YYYY"),
                        remark,
                    };
            });
        })
    });

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: theme.colors.white,
            }}
        >
            <View pointerEvents="none" style={{ flex: 1, margin: 40 }}>
                <View
                    style={[
                        styles.row,
                        {
                            marginBottom: 20,
                        },
                    ]}
                >
                    <Text
                        allowFontScaling={false}
                        style={{
                            color: theme.colors.primary,
                            ...FONTS.h2,
                        }}
                    >
                        History
                    </Text>
                    <Image style={styles.image} source={clockImage} />
                </View>
                {newHistory.map((item, i) => {
                    return (
                        <View key={i}>
                            {item.map((d, j) => {
                                return (
                                    <View key={j} >
                                        {
                                            d.map((k, l) => {
                                                return  <View key={l} style={{ marginBottom: 5 }}>
                                                <View style={styles.row}>
                                                    <Text
                                                        style={styles.text}
                                                        allowFontScaling={false}
                                                    >
                                                        {k.name}
                                                    </Text>
                                                    <Text
                                                        style={styles.date}
                                                        allowFontScaling={false}
                                                    >
                                                        {k.date}
                                                    </Text>
                                                </View>
                                                {k.remark && k.remark !== "ok" && (
                                                    <Text
                                                        style={styles.remark}
                                                        allowFontScaling={false}
                                                    >
                                                        {k.remark}
                                                    </Text>
                                                )}
                                            </View>
                                            })
                                        }
                                    </View>
                                );
                            })}
                            {i <= history.length - 2 && (
                                <View style={styles.line} />
                            )}
                        </View>
                    );
                })}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    box: {
        marginBottom: 7,
    },
    image: {
        width: 25,
        height: 25,
        marginLeft: 10,
        tintColor: theme.colors.primary,
    },
    remark: {
        ...FONTS.body5,
        color: theme.colors.grey,
    },
    text: {
        ...FONTS.h4,
        color: theme.colors.grey,
        textTransform: "capitalize",
    },
    line: {
        height: 2,
        backgroundColor: theme.colors.lightGray,
        marginVertical: 10,
    },
    date: {
        ...FONTS.body4,
        color: theme.colors.primary,
    },
});

export default History;
