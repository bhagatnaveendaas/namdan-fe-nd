import React, { useEffect, useState } from "react";
import { AsyncStorage, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import theme from "../constants/theme";
import RoundIconButton from "../components/RoundIconButton";
import FlatIconButtons from "../components/FlatIconButtons";
import DashboardHeading from "../components/DashboardHeading";
import MasterCreation from "../components/MasterCreation";
import OtherControls from "../components/OtherControls";
import ScoreBoard from "../components/ScoreBoard";
import VerticalIconButton from "../components/VerticalIconButton";
import appConfig from "../config";
import { SafeAreaView } from "react-native";
import { ATTENDANCE, PUNARUPDESH, SAARNAAM, SATNAM, SHUDDIKARAN } from "../constants";

const Home = ({ navigation }) => {
    const [kpiCounts, setKpiCounts] = useState({});
    const [showAlert, setShowAlert] = useState({
        show: false,
        title: "",
        message: "",
        confirm: "Ok",
    });
    const temp = async () => {
        const countries = await AsyncStorage.getItem("districts");
        // console.log({ countries });
    };
    const getKPICounts = async () => {
        console.log("Getting kpi counts...");
        const token = await AsyncStorage.getItem("token");
        console.log(token);
        const config = {
            method: "POST",
            url: `${appConfig.api_url}/reports/kpi_counts`,
            headers: {
                Accept: "application/json",
                "X-CSRF-TOKEN": await AsyncStorage.getItem("token"),
                key: "dsv213a213sfv21123fs31d3fd132c3dv31dsf33",
            },
        };
        console.log({ config });
        axios(config)
            .then(async (response) => {
                if (response.data.success) {
                    setKpiCounts(response.data.data);
                } else {
                    const temp = {
                        ...showAlert,
                        show: true,
                        title: "Opps",
                        message: "Error loading KPIs",
                    };
                    setShowAlert(temp);
                }
            })
            .catch((error) => {
                if (error && error.response) {
                    console.log(`KPI: ${error.response.data}`);
                } else {
                    console.log(`KPI: ${error}`);
                }
            });
    };
    useEffect(() => {
        temp();
        getKPICounts();
    }, []);
    return (
        <SafeAreaView style={{paddingTop:"10%"}}>
            <ScrollView style={{ paddingHorizontal: "3.5%" }}>
                {/* <View style={{ paddingVertical: "3%" }}>
                <View style={[theme.card, { padding: "3%" }]}>
                    <Text
                        style={{
                            textTransform: "uppercase",
                            fontSize: 18,
                            fontWeight: "bold",
                        }}
                    >
                        Notifications
                    </Text>
                    <View style={{ paddingVertical: "3%" }}>
                        <Text
                            style={{ fontSize: 16, color: theme.colors.grey }}
                        >
                            New approval request from Mahendra dalvi for country
                            admin
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => {}}>
                        <Text
                            style={{
                                textAlign: "right",
                                color: theme.colors.primary,
                                fontSize: 16,
                            }}
                        >
                            View
                        </Text>
                    </TouchableOpacity>
                </View>
            </View> */}
                <ScoreBoard
                    prathams={kpiCounts.prathams}
                    satnams={kpiCounts.satnams}
                    sarnams={kpiCounts.sarnams}
                    prathamVsSatnam={kpiCounts.pratham_vs_satnam}
                    punarUpdesh={0}
                />
                <View>
                    <DashboardHeading label="Entries" />
                    <View
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "space-evenly",
                        }}
                    >
                        <VerticalIconButton
                            label={`Pratham${"\n"}Naam`}
                            icon={require("../../assets/icons/pn.png")}
                            pressHandler={() => navigation.push("SignUp")}
                        />
                        <VerticalIconButton
                            label="Satnaam"
                            icon={require("../../assets/icons/sn.png")}
                            pressHandler={() => {
                                navigation.navigate("Entry", {
                                    title: 'Enter Satnaam',
                                    entryType: SATNAM
                                })
                            }}
                        />
                        <VerticalIconButton
                            label="Sarnaam"
                            icon={require("../../assets/icons/srn.png")}
                            pressHandler={() => {
                                navigation.navigate("Entry", {
                                    title: 'Enter SaarNaam',
                                    entryType: SAARNAAM
                                })
                            }}
                        />
                        <VerticalIconButton
                            label={`Punar${"\n"}Updesh`}
                            icon={require("../../assets/icons/pu.png")}
                            pressHandler={() => {
                                navigation.navigate("Entry", {
                                    title: 'Enter Punar Updesh',
                                    entryType: PUNARUPDESH
                                })
                            }}
                        />
                        <VerticalIconButton
                            label="Shudhikaran"
                            icon={require("../../assets/icons/sk.png")}
                            pressHandler={() => {
                                navigation.navigate("Entry", {
                                    title: 'Enter Shudhikaran',
                                    entryType: SHUDDIKARAN
                                })
                            }}
                        />
                        <VerticalIconButton
                            label="Attendance"
                            icon={require("../../assets/icons/at.png")}
                            pressHandler={() => {
                                navigation.navigate("Entry", {
                                    title: 'Attendance',
                                    entryType: ATTENDANCE
                                })
                            }}
                        />
                    </View>
                </View>
                <View>
                    <DashboardHeading label="Features" />
                    <View
                        style={[
                            theme.card,
                            {
                                flexDirection: "row",
                                justifyContent: "space-evenly",
                            },
                        ]}
                    >
                        <RoundIconButton
                            handleClick={() => {}}
                            label={`Generate${"\n"}Pin`}
                            iconName={require("../../assets/icons/keyBg.png")}
                        />
                        <RoundIconButton
                            handleClick={() => {
                                navigation.push("Approvals");
                            }}
                            label={`View${"\n"}Approvals`}
                            iconName={require("../../assets/icons/tickBg.png")}
                        />
                        <RoundIconButton
                            handleClick={() => {
                                navigation.push("AddNaamdanCenter");
                            }}
                            label={`+ Naamdan${"\n"}Center`}
                            iconName={require("../../assets/icons/naamdanCenterBg.png")}
                        />
                        <RoundIconButton
                            handleClick={() => {
                                navigation.push("Messages");
                            }}
                            label="Messages"
                            iconName={require("../../assets/icons/messageBg.png")}
                        />
                    </View>
                    <View>
                        <DashboardHeading label="Reports" />
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                            }}
                        >
                            <FlatIconButtons
                                label={`Naamdan${"\n"}Reports`}
                                icon={require("../../assets/icons/pn.png")}
                                pressHandler={() =>
                                    navigation.push("NaamdanReport")
                                }
                            />
                            <FlatIconButtons
                                label={`Naamdan${"\n"}Centre`}
                                icon={require("../../assets/icons/naamdanCenter.png")}
                                pressHandler={() =>
                                    navigation.push("NaamdanCentre")
                                }
                            />
                            <FlatIconButtons
                                label={`Pending${"\n"}Satnaam`}
                                icon={require("../../assets/icons/psn.png")}
                                pressHandler={() =>
                                    navigation.push("PendingSatnaam")
                                }
                            />
                            <FlatIconButtons
                                label={`Eligibility for${"\n"}Punar Updesh`}
                                icon={require("../../assets/icons/pu.png")}
                                pressHandler={() =>
                                    navigation.push("EligibilityForPunarUpdesh")
                                }
                            />
                        </View>
                    </View>
                    <View>
                        <DashboardHeading label="Other controls" />
                        <OtherControls />
                    </View>
                    <View style={{ paddingBottom: "3%" }}>
                        <DashboardHeading label="Master Creation" />
                        <MasterCreation />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
