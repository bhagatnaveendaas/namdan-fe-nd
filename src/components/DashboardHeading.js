import React from 'react'
import { View, Text } from 'react-native'

const DashboardHeading = ({ label }) => {
    return (
        <View style={{ paddingBottom: "2%", paddingTop: "3%" }}>
            <Text style={{ fontWeight: "bold" }}>{label}</Text>
        </View>
    )
}

export default DashboardHeading
