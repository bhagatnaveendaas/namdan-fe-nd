import React from 'react'
import { View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import theme from '../constants/theme'
const { height, width } = Dimensions.get('window');
import { Dimensions } from 'react-native';

const FlatIconButtons = ({ label, icon, pressHandler }) => {
    return (
        <View onPress={pressHandler} style={[{ width: "49%", marginTop: "2%", paddingHorizontal: label.length > 20 ? "5%" : "8%", }, theme.card]}>
            <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: "4%" }}>
                <Text style={{ alignContent: "center", alignSelf: "center", alignItems: "center", fontSize: 16 }}>{label} </Text>
                <Image style={{ height: height * 0.07, width: height * 0.065 }} source={icon} />
            </TouchableOpacity>
        </View>
    )
}

export default FlatIconButtons
