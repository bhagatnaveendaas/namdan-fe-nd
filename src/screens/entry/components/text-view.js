import { View, Text } from "react-native"
import React, { 
    useEffect, 
    useState,
} from 'react';

const TextViewComponent = (
    props
) => {
    return (
        <View
            style={
                {
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    ...props.styles
                    
                }
            }
        >
            <Text
                style={
                    {
                        color: '#9586A8',
                        fontSize: 13
                    }
                }
            >{props.label}</Text>
            <Text
                style={
                    {
                        marginTop: 8,
                        color: '#696969',
                        fontSize: 14
                    }
                }
            >{props.value}</Text>
        </View>
    )
}

export default TextViewComponent