import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, StatusBar, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import ScoreBoard from "../components/ScoreBoard";
import VerticalIconButton from "../components/VerticalIconButton";
import Button from "../components/Button";
import { FONTS } from "../constants/fonts";
import theme from "../constants/theme";
import { postJsonData } from "../httpClient/apiRequest";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/AshramDashboard";

const Home = ({ navigation }) => {
    const [kpiCounts, setKpiCounts] = useState({});
    const [showAlert, setShowAlert] = useState({
        show: false,
        title: "",
        message: "",
        confirm: "Ok",
    });

    const {
        state: { user },
        dispatch,
    } = useAuth();

    const permissions = user?.permissions;
    const role = user?.role;
    const roleId = user?.role_id;

    const getKPICounts = async () => {
        try {
            const { data } = await postJsonData("/reports/kpi_counts");
            console.log(data?.data);
            setKpiCounts(data?.data);
        } catch (error) {
            if (error && error.response) {
                console.error(`KPI Error: ${error.response.data.error}`);
            } else {
                console.log(`KPI: ${error}`);
            }
        }
    };
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getKPICounts();
        });
        return unsubscribe;
    }, [navigation]);
    useEffect(() => {
        getKPICounts();
    }, []);
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "white",
            }}
        >
            <StatusBar backgroundColor={theme.colors.primary} />
            <View
                style={{
                    backgroundColor: theme.colors.primary,
                    flexDirection: "row",
                    padding: 20,
                    paddingVertical: 10,
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15,
                    elevation: 5,
                }}
            >
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Image
                        style={{ height: 18, width: 22 }}
                        source={require("../../assets/icons/white_side_menu.png")}
                    />
                </TouchableOpacity>
                <View>
                    <Text
                        allowFontScaling={false}
                        style={{
                            color: "white",
                            ...FONTS.h3,
                            textAlign: "center",
                            fontSize: 20,
                        }}
                    >
                        {user?.district_name.toUpperCase()}
                    </Text>
                    <Text
                        allowFontScaling={false}
                        style={{ color: "white", ...FONTS.h2, fontSize: 20 }}
                    >
                        {role.toUpperCase()}
                    </Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                    <Image
                        style={{ height: 18, width: 22, tintColor: "white" }}
                        source={require("../../assets/icons/search.png")}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView
                style={{
                    paddingHorizontal: "3.5%",
                    paddingTop: "5%",
                }}
            >
                <ScoreBoard
                    prathams={kpiCounts.prathams ?? 0}
                    satnams={kpiCounts.satnams ?? 0}
                    sarnams={kpiCounts.sarnams ?? 0}
                    sarshabd={kpiCounts?.sarshabds ?? 0}
                    prathamVsSatnam={kpiCounts?.pending_satnams ?? 0}
                    punarUpdesh={kpiCounts?.reupdesh ?? 0}
                />
                {roleId === 8 && (
                    <View>
                        <Text allowFontScaling={false} style={styles.label}>
                            Entries
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                flexWrap: "wrap",
                                justifyContent: "space-evenly",
                            }}
                        >
                            {permissions.includes("pratham_mantra") && (
                                <VerticalIconButton
                                    label={`Pratham Naam`}
                                    icon={require("../../assets/icons/pratham_naam.png")}
                                    pressHandler={() =>
                                        navigation.navigate("Pratham Naam")
                                    }
                                />
                            )}
                            {permissions.includes("attendance") && (
                                <VerticalIconButton
                                    label="Attendance"
                                    icon={require("../../assets/icons/attendance.png")}
                                    pressHandler={() => {
                                        navigation.navigate("Search", {
                                            entryType: "Attendance Entry",
                                        });
                                    }}
                                />
                            )}
                            {permissions.includes("satnam") && (
                                <VerticalIconButton
                                    label="Satnaam"
                                    icon={require("../../assets/icons/satnaam.png")}
                                    pressHandler={() => {
                                        navigation.navigate("Search", {
                                            entryType: "Satnaam Entry",
                                        });
                                    }}
                                />
                            )}
                            {permissions.includes("sarnam") && (
                                <VerticalIconButton
                                    label="Sarnaam"
                                    icon={require("../../assets/icons/sarnaam.png")}
                                    pressHandler={() => {
                                        navigation.navigate("Search", {
                                            entryType: "Sarnaam Entry",
                                        });
                                    }}
                                />
                            )}
                            {permissions.includes("sarshabd") && (
                                <VerticalIconButton
                                    label={`Sarshabd`}
                                    icon={require("../../assets/icons/sr2.png")}
                                    pressHandler={() => {
                                        navigation.navigate("Search", {
                                            entryType: "Sarshabd Entry",
                                        });
                                    }}
                                />
                            )}
                            {permissions.includes("shudhikaran") && (
                                <VerticalIconButton
                                    label="Shudhikaran"
                                    icon={require("../../assets/icons/sk.png")}
                                    pressHandler={() => {
                                        navigation.navigate("Search", {
                                            entryType: "Shuddhikaran Entry",
                                        });
                                    }}
                                />
                            )}
                            {permissions.includes("punar_updesh") && (
                                <VerticalIconButton
                                    label={`Punar Updesh`}
                                    icon={require("../../assets/icons/punar_updesh.png")}
                                    pressHandler={() => {
                                        navigation.navigate("Search", {
                                            entryType: "Punar Updesh Entry",
                                        });
                                    }}
                                />
                            )}
                        </View>
                    </View>
                )}
                {roleId === 8 && (
                    <Button
                        onPress={() => navigation.navigate("Pending")}
                        buttonStyle={{
                            padding: 12,
                            backgroundColor: theme.colors.primary,
                            elevation: 3,
                            borderRadius: 10,
                            alignItems: "center",
                            marginTop: 5,
                            marginBottom: 30,
                        }}
                        textStyle={{
                            color: theme.colors.white,
                            ...FONTS.h3,
                            fontSize: 18,
                        }}
                        text={"View List"}
                    />
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
