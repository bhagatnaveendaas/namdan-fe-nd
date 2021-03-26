import React from 'react'
import { View, Text } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import RoundButton from '../components/RoundButton'
import theme from '../constants/theme'

const verifyOtp = () => {
    return (
        <View style={{ backgroundColor: theme.colors.white, flex: 1, paddingHorizontal: "5%", paddingTop:"35%" }}>
            <Text style={{ textAlign: "center", fontSize: 22 }}>Verify account</Text>
            <View style={{ paddingVertical: "10%" }}>
                <Text style={{ textAlign: "center", fontSize: 16, color: theme.colors.grey }}>Please enter OTP sent to you</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                <View style={{ backgroundColor: theme.colors.grey, borderRadius: 10, width: "19%", padding: "5%", alignContent: 'center', alignItems: "center", alignSelf: "center" }}>
                    <TextInput placeholder="X" style={{ textAlign: "center" }} />
                </View>
                <View style={{ backgroundColor: theme.colors.grey, borderRadius: 10, width: "19%", padding: "5%", alignContent: 'center', alignItems: "center", alignSelf: "center" }}>
                    <TextInput placeholder="X" style={{ textAlign: "center" }} />
                </View>
                <View style={{ backgroundColor: theme.colors.grey, borderRadius: 10, width: "19%", padding: "5%", alignContent: 'center', alignItems: "center", alignSelf: "center" }}>
                    <TextInput placeholder="X" style={{ textAlign: "center" }} />
                </View>
                <View style={{ backgroundColor: theme.colors.grey, borderRadius: 10, width: "19%", padding: "5%", alignContent: 'center', alignItems: "center", alignSelf: "center" }}>
                    <TextInput placeholder="X" style={{ textAlign: "center" }} />
                </View>
                <View style={{ backgroundColor: theme.colors.grey, borderRadius: 10, width: "19%", padding: "5%", alignContent: 'center', alignItems: "center", alignSelf: "center" }}>
                    <TextInput placeholder="X" style={{ textAlign: "center" }} />
                </View>
            </View>
            <View style={{ paddingTop: "20%" }}>

                <RoundButton label="Verify OTP" handlePress={() => console.log("pressed")} />
            </View>
        </View>
    )
}

export default verifyOtp
