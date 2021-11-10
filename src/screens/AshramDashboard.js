import React, { useEffect, useState } from "react";
import {
    AsyncStorage,
    Text,
    View,
    Image,
    SafeAreaView,
    StatusBar,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import theme from "../constants/theme";
import RoundIconButton from "../components/RoundIconButton";
import FlatIconButtons from "../components/FlatIconButtons";
import DashboardHeading from "../components/DashboardHeading";
// import MasterCreation from "../components/MasterCreation";
// import OtherControls from "../components/OtherControls";
import ScoreBoard from "../components/ScoreBoard";
import VerticalIconButton from "../components/VerticalIconButton";
import appConfig from "../config";

import {
    ATTENDANCE,
    PUNARUPDESH,
    SAARSHABAD,
    SAARNAAM,
    SATNAM,
    SHUDDIKARAN,
} from "../constants";

const Home = ({ navigation }) => {
    const [kpiCounts, setKpiCounts] = useState({});
    const [showAlert, setShowAlert] = useState({
        show: false,
        title: "",
        message: "",
        confirm: "Ok",
    });

    const [role, setRole] = useState("");

    const getInitialProps = async () => {
        // const countries = await AsyncStorage.getItem("districts");
        const userRole = await AsyncStorage.getItem("role");
        console.log(userRole);
        setRole(userRole);
        // setRole("Ashram Admin");
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
                    console.log(response.data.data);
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
        getInitialProps();
        getKPICounts();
    }, []);
    return (
        <SafeAreaView
            style={{
                flex: 1,
                // paddingBottom:"5%",
                // backgroundColor: theme.colors.secondary,
                backgroundColor: "white",
            }}
        >
            <StatusBar backgroundColor={theme.colors.primary} />
            <View
                style={{
                    paddingVertical: "5%",
                    backgroundColor: theme.colors.primary,
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    elevation: 10,
                    shadowColor: "rgba(0,0,0, .4)", // IOS
                    shadowOffset: { height: 1, width: 1 }, // IOS
                    shadowOpacity: 1, // IOS
                    shadowRadius: 1, // IOS
                }}
            >
                <Text
                    style={{
                        fontFamily: theme.fonts.lora.bold,
                        fontSize: 28,
                        color: "white",
                        textAlign: "center",
                        textTransform: "uppercase",
                    }}
                >
                    Naamdan App
                </Text>
                <Text
                    style={{
                        fontFamily: theme.fonts.lora.bold,
                        fontSize: 15,
                        color: "white",
                        paddingTop: 3,
                        textAlign: "center",
                        textTransform: "uppercase",
                    }}
                >
                    {role || ""}
                </Text>
                <View
                    style={{
                        position: "absolute",
                        paddingTop: 25,
                        paddingLeft: "20%",
                    }}
                >
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Image
                            style={{ height: 20, width: 20 }}
                            source={require("../../assets/icons/white_side_menu.png")}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={{ paddingHorizontal: "3.5%", paddingTop: "5%" }}>
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
                    prathamVsSatnam={kpiCounts.pending_satnams}
                    punarUpdesh={0}
                />
                {(role === "Namdan Sewadar" || role === "Ashram Admin") && (
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
                                label={`Pratham Naam`}
                                icon={require("../../assets/icons/pn.png")}
                                pressHandler={() =>
                                    navigation.push("Pratham Naam")
                                }
                            />
                            <VerticalIconButton
                                label="Attendance"
                                icon={require("../../assets/icons/at.png")}
                                pressHandler={() => {
                                    navigation.navigate("Entry", {
                                        title: "Attendance",
                                        entryType: ATTENDANCE,
                                    });
                                }}
                            />
                            <VerticalIconButton
                                label="Satnaam"
                                icon={require("../../assets/icons/sn.png")}
                                pressHandler={() => {
                                    navigation.navigate("Entry", {
                                        title: "Enter Satnaam",
                                        entryType: SATNAM,
                                        searchBy: "mobile_no",
                                        text: "",
                                    });
                                }}
                            />
                            <VerticalIconButton
                                label="Sarnaam"
                                icon={require("../../assets/icons/srn.png")}
                                pressHandler={() => {
                                    navigation.navigate("Entry", {
                                        title: "Enter SaarNaam",
                                        entryType: SAARNAAM,
                                    });
                                }}
                            />
                            <VerticalIconButton
                                label={`Sarshabd`}
                                icon={require("../../assets/icons/sr2.png")}
                                pressHandler={() => {
                                    navigation.navigate("Entry", {
                                        title: "SarShabd",
                                        entryType: SAARSHABAD,
                                    });
                                }}
                            />
                            <VerticalIconButton
                                label="Shudhikaran"
                                icon={require("../../assets/icons/sk.png")}
                                pressHandler={() => {
                                    navigation.navigate("Entry", {
                                        title: "Enter Shudhikaran",
                                        entryType: SHUDDIKARAN,
                                    });
                                }}
                            />
                            <VerticalIconButton
                                label={`Punar Updesh`}
                                icon={require("../../assets/icons/pu.png")}
                                pressHandler={() => {
                                    navigation.navigate("Entry", {
                                        title: "Enter Punar Updesh",
                                        entryType: PUNARUPDESH,
                                    });
                                }}
                            />
                        </View>
                    </View>
                )}
                {(role !== "Namdan Sewadar" || role !== "District Admin") && (
                    <>
                        <DashboardHeading label="Features" />
                        <View style={{ paddingHorizontal: "1.3%" }}>
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
                                    handleClick={() => {
                                        navigation.push("Add Sewadaar");
                                    }}
                                    label={`Add Sevadar`}
                                    iconName={require("../../assets/icons/keyBg.png")}
                                />
                                {role === "Ashram Admin" && (
                                    <RoundIconButton
                                        handleClick={() => {
                                            navigation.push("Approvals");
                                        }}
                                        label={`View${"\n"}Approvals`}
                                        iconName={require("../../assets/icons/tickBg.png")}
                                    />
                                )}
                                {role !== "District Admin" && (
                                    <RoundIconButton
                                        handleClick={() => {
                                            navigation.push(
                                                "Add Naamdan Center"
                                            );
                                        }}
                                        label={`+ Naamdan${"\n"}Center`}
                                        iconName={require("../../assets/icons/naamdanCenterBg.png")}
                                    />
                                )}
                                <RoundIconButton
                                    handleClick={() => {
                                        navigation.push("Messages");
                                    }}
                                    label="Messages"
                                    iconName={require("../../assets/icons/messageBg.png")}
                                />
                            </View>
                        </View>

                        <DashboardHeading label="Reports" />
                    </>
                )}
                {/* {role === "Namdan Sewadar" && ( */}

                {role !== "Namdan Sewadar" && (
                    <View
                        style={{
                            paddingHorizontal: "1.3%",
                            paddingBottom: "10%",
                        }}
                    >
                        <View>
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
                                        navigation.push("Naamdan Report")
                                    }
                                />
                                <FlatIconButtons
                                    label={`Naamdan${"\n"}Centre`}
                                    icon={require("../../assets/icons/naamdanCenter.png")}
                                    pressHandler={() =>
                                        navigation.push("Naamdan Centre")
                                    }
                                />
                                <FlatIconButtons
                                    label={`Pending${"\n"}Satnaam`}
                                    icon={require("../../assets/icons/psn.png")}
                                    pressHandler={() =>
                                        navigation.push("Pending Satnaam")
                                    }
                                />
                                <FlatIconButtons
                                    label={`Eligibility for${"\n"}Punar Updesh`}
                                    icon={require("../../assets/icons/pu.png")}
                                    pressHandler={() =>
                                        navigation.push(
                                            "Punar Updesh Eligibles"
                                        )
                                    }
                                />
                            </View>
                        </View>
                        {/* <View>
                        <DashboardHeading label="Other controls" />
                        <OtherControls />
                    </View>
                    <View style={{ paddingBottom: "3%" }}>
                        <DashboardHeading label="Master Creation" />
                        <MasterCreation />
                    </View> */}
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
                                backgroundColor: "#E9FCFF",
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
                                onPress={() => {
                                    navigation.push("Messages");
                                }}
                            >
                                <Image
                                    source={require("../../assets/icons/message.png")}
                                    style={{ height: 40, width: 40 }}
                                />
                                <Text
                                    style={{
                                        fontFamily:
                                            theme.fonts.poppins.semiBold,
                                        color: theme.colors.primary,
                                        fontSize: 14,
                                        paddingLeft: 10,
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
