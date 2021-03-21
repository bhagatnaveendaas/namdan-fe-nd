import React from 'react'
import { View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import theme from '../constants/theme'
const { height, width } = Dimensions.get('window');
import { Dimensions } from 'react-native';

export default function OtherControls() {
    return (
        <View style={[theme.card, { backgroundColor: "#E0F8FC", flexDirection: "row", paddingVertical: "4%" }]}>
            <View style={{ width: "50%", flexDirection: "row", paddingHorizontal: "5%", paddingLeft: "7%", alignSelf: "center", alignContent: "center", alignItems: "center", justifyContent: "space-between", borderRightColor: theme.colors.grey, borderRightWidth: 1 }} >
                <View>
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>Manage</Text>
                    <Text style={{ fontSize: 16 }}>Rules</Text>
                </View>
                <Image source={require("../../assets/icons/mr.png")} style={{ height: height * 0.07, width: height * 0.07 }} />
            </View>
            <View style={{ width: "50%", flexDirection: "row", paddingHorizontal: "5%", paddingLeft: "7%", alignSelf: "center", alignContent: "center", alignItems: "center", justifyContent: "space-between", }} >
                <View>
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>Manage</Text>
                    <Text style={{ fontSize: 16 }}>Sevadar</Text>
                </View>
                <Image source={require("../../assets/icons/ms.png")} style={{ height: height * 0.07, width: height * 0.07 }} />
            </View>
        </View>
    )
}
