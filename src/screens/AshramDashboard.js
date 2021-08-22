import React, { useEffect } from "react";
import { AsyncStorage, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import theme from "../constants/theme";

import RoundIconButton from "../components/RoundIconButton";
import FlatIconButtons from "../components/FlatIconButtons";
import DashboardHeading from "../components/DashboardHeading";
import MasterCreation from "../components/MasterCreation";
import OtherControls from "../components/OtherControls";
import ScoreBoard from "../components/ScoreBoard";
import VerticalIconButton from "../components/VerticalIconButton";

const Home = ({ navigation }) => {
    const temp = async () => {
        const countries = await AsyncStorage.getItem("districts");
        console.log({ countries });
    };
    useEffect(() => {
        temp();
    }, []);
    return (
        <ScrollView style={{ paddingHorizontal: "3.5%" }}>
            <View style={{ paddingVertical: "3%" }}>
                <View style={[theme.card, { padding: "3%" }]}>
                    <Text
                        style={{
                            textTransform: "uppercase",
                            fontSize: 18,
                            fontWeight: "bold",
                        }}
                    >
                        Notificaitons
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
            </View>
            <ScoreBoard />
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
                        pressHandler={
                            () => {
                                console.log("Pratham naam adding clicked")
                                navigation.navigate('Entry', {
                                    "entryType": "PrathamNaam",
                                    "title": "Pratham Naam",
                                    
                                });
                            }
                        }
                    />
                    <VerticalIconButton
                        label="Satnaam"
                        icon={require("../../assets/icons/sn.png")}
                        pressHandler={
                            () => {
                                console.log("Pratham naam adding clicked")
                                navigation.navigate('Entry', {
                                    "entryType": "SatNaam",
                                    "title": "Sat Naam",
                                    
                                });
                            }
                        }
                    />
                    <VerticalIconButton
                        label="Sarnaam"
                        icon={require("../../assets/icons/srn.png")}
                        pressHandler={
                            () => {
                                console.log("Saar naam adding clicked")
                                navigation.navigate('Entry', {
                                    "entryType": "SaarNaam",
                                    "title": "Saar Naam",
                                    
                                });
                            }
                        }
                    />
                    <VerticalIconButton
                        label={`Punar${"\n"}Updesh`}
                        icon={require("../../assets/icons/pu.png")}
                        pressHandler={
                            () => {
                                console.log("Pratham naam adding clicked")
                                navigation.navigate('Entry', {
                                    "entryType": "PunarUpdesh",
                                    "title": "Punar Updesh",
                                    
                                });
                            }
                        }
                    />
                    <VerticalIconButton
                        label="Shudhikaran"
                        icon={require("../../assets/icons/sk.png")}
                        pressHandler={
                            () => {
                                console.log("Shudhikaran clicked")
                                navigation.navigate('Entry', {
                                    "entryType": "ShudhiKaran",
                                    "title": "Shudhi Karan",
                                    
                                });
                            }
                        }
                    />
                    <VerticalIconButton
                        label="Attendance"
                        icon={require("../../assets/icons/at.png")}
                        pressHandler={
                            () => {
                                console.log("Pratham naam adding clicked")
                                navigation.navigate('Entry', {
                                    "entryType": "Attendance",
                                    "title": "Haajri Entry",
                                    
                                });
                            }
                        }
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
                        handleClick={() => {}}
                        label={`View${"\n"}Approvals`}
                        iconName={require("../../assets/icons/tickBg.png")}
                    />
                    <RoundIconButton
                        handleClick={() => {}}
                        label={`+ Naamdan${"\n"}Center`}
                        iconName={require("../../assets/icons/naamdanCenterBg.png")}
                    />
                    <RoundIconButton
                        handleClick={() => {}}
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
                            pressHandler={() => {}}
                        />
                        <FlatIconButtons
                            label={`Naamdan${"\n"}Centre`}
                            icon={require("../../assets/icons/naamdanCenter.png")}
                            pressHandler={() => {}}
                        />
                        <FlatIconButtons
                            label={`Pending${"\n"}Satnaam`}
                            icon={require("../../assets/icons/psn.png")}
                            pressHandler={() => {}}
                        />
                        <FlatIconButtons
                            label={`Eligibility for${"\n"}Punar Updesh`}
                            icon={require("../../assets/icons/pu.png")}
                            pressHandler={() => {}}
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
    );
};

export default Home;
