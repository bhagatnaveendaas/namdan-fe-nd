import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, StatusBar, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
// import MasterCreation from "../components/MasterCreation";
// import OtherControls from "../components/OtherControls";
import ScoreBoard from "../components/ScoreBoard";
import VerticalIconButton from "../components/VerticalIconButton";
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
    } = useAuth();

    const permissions = user?.permissions;
    const role = user?.role;

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
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15,
                }}
            >
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Image
                        style={{ height: 18, width: 22 }}
                        source={require("../../assets/icons/white_side_menu.png")}
                    />
                </TouchableOpacity>
                <Text
                    allowFontScaling={false}
                    style={{ color: "white", ...FONTS.h2 }}
                >
                    {role}
                </Text>
                <TouchableOpacity onPress={() => {}}>
                    <Image
                        style={{ height: 18, width: 22, tintColor: "white" }}
                        source={require("../../assets/icons/search.png")}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView style={{ paddingHorizontal: "3.5%", paddingTop: "5%" }}>
                <ScoreBoard
                    prathams={kpiCounts.prathams}
                    satnams={kpiCounts.satnams}
                    sarnams={kpiCounts.sarnams}
                    prathamVsSatnam={kpiCounts.pending_satnams}
                    punarUpdesh={0}
                />
                {(role === "Namdan Sewadar" || role === "Ashram Admin") && (
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
                                    icon={require("../../assets/icons/pn.png")}
                                    pressHandler={() =>
                                        navigation.push("Pratham Naam")
                                    }
                                />
                            )}
                            {permissions.includes("attendance") && (
                                <VerticalIconButton
                                    label="Attendance"
                                    icon={require("../../assets/icons/at.png")}
                                    // pressHandler={() => {
                                    //     navigation.navigate("Entry", {
                                    //         title: "Attendance",
                                    //         entryType: ATTENDANCE,
                                    //     });
                                    // }}
                                />
                            )}
                            {permissions.includes("satnam") && (
                                <VerticalIconButton
                                    label="Satnaam"
                                    icon={require("../../assets/icons/sn.png")}
                                    // pressHandler={() => {
                                    //     navigation.navigate("Entry", {
                                    //         title: "Enter Satnaam",
                                    //         entryType: SATNAM,
                                    //         searchBy: "mobile_no",
                                    //         text: "",
                                    //     });
                                    // }}
                                />
                            )}
                            {permissions.includes("sarnam") && (
                                <VerticalIconButton
                                    label="Sarnaam"
                                    icon={require("../../assets/icons/srn.png")}
                                    // pressHandler={() => {
                                    //     navigation.navigate("Entry", {
                                    //         title: "Enter SaarNaam",
                                    //         entryType: SAARNAAM,
                                    //     });
                                    // }}
                                />
                            )}
                            {permissions.includes("sarshabd") && (
                                <VerticalIconButton
                                    label={`Sarshabd`}
                                    icon={require("../../assets/icons/sr2.png")}
                                    // pressHandler={() => {
                                    //     navigation.navigate("Entry", {
                                    //         title: "SarShabd",
                                    //         entryType: SAARSHABAD,
                                    //     });
                                    // }}
                                />
                            )}
                            {permissions.includes("shudhikaran") && (
                                <VerticalIconButton
                                    label="Shudhikaran"
                                    icon={require("../../assets/icons/sk.png")}
                                    // pressHandler={() => {
                                    //     navigation.navigate("Entry", {
                                    //         title: "Enter Shudhikaran",
                                    //         entryType: SHUDDIKARAN,
                                    //     });
                                    // }}
                                />
                            )}
                            {permissions.includes("punar_updesh") && (
                                <VerticalIconButton
                                    label={`Punar Updesh`}
                                    icon={require("../../assets/icons/pu.png")}
                                    // pressHandler={() => {
                                    //     navigation.navigate("Entry", {
                                    //         title: "Enter Punar Updesh",
                                    //         entryType: PUNARUPDESH,
                                    //     });
                                    // }}
                                />
                            )}
                        </View>
                    </View>
                )}

                {role === "Namdan Sewadar" && (
                    <View
                        style={{
                            justifyContent: "center",
                            paddingTop: "2%",
                            flex: 1,
                            paddingHorizontal: "1.3%",
                            paddingBottom: "10%",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                justifyContent: "center",
                                width: "100%",
                                borderRadius: 10,
                                backgroundColor: theme.colors.primary,
                                elevation: 5,
                                flexDirection: "row",
                                paddingVertical: 7,
                                alignItems: "center",
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                onPress={() => {}}
                            >
                                <Image
                                    source={require("../../assets/icons/message.png")}
                                    style={{
                                        height: 40,
                                        width: 40,
                                        tintColor: theme.colors.white,
                                    }}
                                />
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        color: theme.colors.white,
                                        paddingLeft: 10,
                                        ...FONTS.body3,
                                    }}
                                >
                                    Messages
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
