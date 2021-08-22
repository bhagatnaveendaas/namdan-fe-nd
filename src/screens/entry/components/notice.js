import React, { 
    useEffect, 
    useState
} from 'react';
import { Modal, Image } from 'react-native';
import { Button } from "react-native-elements"
import { 
    View, 
    Text
} from 'react-native';


const PopupNotice = (
    props
) => {

    const [
        noticeMessage, 
        setNoticeMessage
    ] = useState("");
    
    const [
        isHavingUserConsentInput, 
        setIsHavingUserConsentInput
    ] = useState(false)

    const [
        isFailedState,
        setIsFailedState
    ] = useState(false)

    const [
        customStyle,
        setCustomStyles
    ] = useState()

    const[
        isVisible,
        setIsVisible
    ] = useState(
        false
    )


    useEffect(
        () => {
            setNoticeMessage(
                props.message
            )
            setIsHavingUserConsentInput(
                props.requireUserConsent
            )
            setIsFailedState(
                props.isFailedState
            )
            setCustomStyles(
                props.styles
            )

            setIsVisible(
                props.isVisible
            )
        },
        [
            props.message, 
            props.requireUserConsent, 
            props.isFailedState, 
            props.styles,
            props.isVisible
        ]
    )
    return (
        <Modal
            transparent={
                true
            }
            visible={
                isVisible
            }
            style={
                {
                    justifyContent: 'center',
                    flex: 1,
                    alignContent: 'center',
                    alignItems: 'center'
                }
            }
            animationType={
                'fade'
            }
        >
        <View
            
            style={
                {
                    flex: 1,
                    minHeight: 200,
                    maxHeight: 200,
                    marginLeft: 18,
                    marginRight: 18,
                    marginTop: 200,
                    borderRadius: 8,
                    backgroundColor: '#FFFFFF',
                    elevation: 8
                }
            }
        >
            <View
                style={
                    {
                        flex: 1,
                        margin: 18,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                    }
                }
            >
                <View
                    style={
                        {
                            flexDirection: 'column',
                            flex: 1,
                            justifyContent: 'space-between',
                            alignContent : 'center',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }
                    }
                >
                    <Image
                        style={
                            {
                                height: 42,
                                width: 42
                            }
                        }
                        source={
                            props.sourceImage
                        }
                    />
                    <Text style={
                        {
                            marginTop: 12
                        }
                    }> {noticeMessage} </Text>
                    <View
                        style={
                            {
                                width: '100%',
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                marginTop: 24,
                                alignContent: 'center',
                                alignItems: 'center',

                            }
                        }
                    >
                        {
                            isHavingUserConsentInput ? (
                                <View
                                    style={
                                        {
                                            flex: 1,
                                            flexDirection: 'row',
                                            justifyContent: 'space-evenly'
                                        }
                                    }
                                >
                                    <Button 
                                        buttonStyle={
                                            {
                                                backgroundColor: '#C4C4C4',
                                                width: 140,
                                                borderRadius: 18,
                                            }
                                        }
                                        onPress={
                                            () => {
                                                console.log("Calling cancel")
                                                props.cancelEntry && props.cancelEntry()
                                            }
                                        }
                                        title={'Cancel'}
                                    />
                                    <Button 
                                        buttonStyle={
                                            {
                                                backgroundColor: '#305198',
                                                width: 140,
                                                borderRadius: 18,
                                            }
                                        }
                                        onPress={
                                            () => {
                                                props.confirmEntry && props.confirmEntry()
                                            }
                                        }
                                        title={'Proceed'}
                                    /> 
                                </View>
                            ) : (
                                <View 
                                    style={
                                        {
                                            marginTop: 12,
                                            alignItems: 'center'
                                        }
                                    }
                                >
                                    <Button 
                                        onPress={
                                            () => {
                                                props.clickHandler && props.clickHandler()
                                            }
                                        }
                                        buttonStyle={
                                            {
                                                backgroundColor: '#305198',
                                                width: 223,
                                                borderRadius: 18,
                                            }
                                        }
                                        title={'Close'}
                                    />
                                </View>
                            )
                        }
                    </View>
                </View>
            </View>
        </View>
    </Modal>
    );
}

export default PopupNotice;