import React, { 
    useEffect, 
    useState
} from "react"
import { 
    View
} from "react-native"

export const HajriListItemRowComponent = (

) => {

    const [
        hajriDate, setHajriDate
    ] = useState(

    )

    useEffect(
        () => {
            setHajriDate(
                props.hajriDate
            )
        },
        [
            props.hajriDate
        ]
    )

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
            >{hajriDate}</Text>
        </View>
    )
}