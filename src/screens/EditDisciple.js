import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native'
import { getUniqueDispleUrl } from '../constants/routes'
import { getData } from '../httpClient/apiRequest'
import theme from '../constants/theme'


const EditDisciple = ({ navigation, route }) => {
    const userId = route.params?.id
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(false)

    const getDiscipleDetail = async id => {
        setLoading(true)
        try {
            const { data } = await getData(getUniqueDispleUrl(id))
            setLoading(false)
            console.log(data?.data)
        } catch (error) {
            setLoading(false)
            if (error && error.response) {
                console.error(error.response.data.error)
            } else console.error(`Error while get disciple detail`, error)
        }
    }
    useEffect(() => {
        getDiscipleDetail(userId)
    }, [])

    if (loading) {
        return <ActivityIndicator
            color={theme.colors.primaryLight}
            size="large"
            style={{ marginTop: 30 }}
            animating={loading}
        />
    }
    return (
        <View>
            <Text>{userId}</Text>
        </View>
    )
}

export default EditDisciple;
