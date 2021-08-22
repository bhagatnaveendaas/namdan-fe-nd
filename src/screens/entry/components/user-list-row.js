import React, { useEffect, useState } from "react"
import { 
    View, 
    Text,
    Image
} from "react-native"

const UserListRowItem = (
    props
) => {
    const [
        userInfo, 
        setUserInfo
    ] = useState({})
    useEffect(
        () => {
            setUserInfo(
                props.user
            )
        },
        [
            props.user
        ]
    )
    return (
        <View
            onStartShouldSetResponder={
                () => props.onClickHandler && props.onClickHandler( userInfo )
            }
            style={
                {
                    width: '100%',
                    height: 64,
                    elevation: 20,
                    flexDirection: 'row',
                    backgroundColor: '#FFFFFF',
                    marginTop: 13,
                    borderRadius: 8
                }
            }
        >
            <View
                style={
                    {
                        margin: 8,
                        flex: 1,
                        flexDirection: 'row',
                    }
                }
            >
                <Image
                    
                    source={
                        {
                            uri: userInfo ? userInfo.avatar : ''
                        }
                    }
                    style={
                        {
                            borderRadius: 8,
                            width: 50,
                            height: 50,
                            shadowColor: '#000000',
                        }
                    }
                />
                <View
                    style={
                        {
                            marginLeft: 10,
                            flexDirection: 'column',
                            alignContent: 'flex-start',
                            justifyContent: 'space-between',
                            flex: 1,
                        }
                    }
                >
                    <Text
                        style={
                            {
                                fontSize: 13,
                                flex: 1,
                                color: '#3C3C3C'
                            }
                        }
                    >{
                        userInfo && userInfo.name
                    }</Text>
                    <Text
                        style={
                            {
                                flex: 1,
                                color: '#3C3C3C'
                            }
                        }
                    >{
                        userInfo && userInfo.address
                    }</Text>
                    <Text
                        style={
                            {
                                flex: 1,
                                color: '#3C3C3C'
                            }
                        }
                    >{
                        userInfo && userInfo.mobile_no
                    }</Text>
                </View>
            </View>
        </View>
    )
}

export default UserListRowItem