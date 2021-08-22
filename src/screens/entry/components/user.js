import { View, Text, Image} from "react-native"
import React, { 
    useEffect, 
    useState,
    
} from 'react';
import TextViewComponent from "./text-view";
import { Button } from "react-native-elements"
import Modal from "react-native-modal"
import { ScrollView } from "react-native-gesture-handler";
import {generateAttendanceInfoRequestURL} from "../../../helper/router";
import { executeRequest } from "../../../helper/network/link";
import { HajriListItemRowComponent } from "./hajri-list-item-row";

const UserInfoComponent = (
    props
) => {
    const [
        userInfo,
        setUserInfo
    ] = useState()

    const[
        isVisible,
        setIsVisible
    ] = useState()

    const[ 
        isHajriListRequested,
        setIsHajriListRequested
    ] = useState()

    const [
        hajriType,
        setHajriType
    ] = useState()

    const [
        hajriList,
        setHajriList
    ] = useState([])

    fetchHajriAttendance = (
        discipleId
    ) => {
        
        const hajriRequestURL = generateAttendanceInfoRequestURL(hajriType, discipleId);
        console.log("Hajri request url:", hajriRequestURL)
        executeRequest(
            hajriRequestURL,
            undefined,
            {
                method: "GET",
            }
        ).then(
            (response) => {
                console.log("Hajri list: ", response)
                setHajriList(response.data?.data)
            }
        ).catch((error) => {
            console.log(error)
        })

    }

    useEffect(
        () =>{
            fetchHajriAttendance(props.user?.id)
        },
        [
            isHajriListRequested
        ]
    )

    useEffect(
         () => {
            if(
                userInfo
            ){
                setIsVisible(true)
            }
            else{
                setIsVisible(false)
            }
         },
         [
            userInfo
         ]
    )

    useEffect(
        () => {
            console.log("User info set", props?.user?.image)
            setUserInfo(
                props.user
            )

            setIsHajriListRequested(
                props.isHajriListRequested
            )

            setHajriType(
                props.hajriType
            )

        },[
            props.user, props.isHajriListRequested, props.hajriType
        ]
    )

    return (
        <Modal
            onBackButtonPress={
                () => {
                    setUserInfo(
                        undefined
                    )
                    setIsHajriListRequested(false)
                }
            }
            onBackdropPress={
                () => {
                    setUserInfo(
                        undefined
                    )
                    setIsHajriListRequested(false)
                }
            }
            isVisible={
                isVisible
            }
            animationType={
                'fade'
            }
        >
        <View
            style={
                {
                    height: 550,
                    borderRadius: 18,
                    backgroundColor: '#FFFFFF',
                    flexDirection: 'column',
                    elevation: 12,
                    margin: 10
                }
            }
        >
            <View
                style={
                    {
                        flex: 1,
                        flexDirection: 'column',
                        margin: 22,
                        alignContent: 'center',
                        alignItems: 'center'
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
                            borderRadius: 90,
                            width: 90,
                            height: 90,
                            shadowColor: '#000000',
                        }
                    }
                />
                <Text
                    style={
                        {
                            marginTop: 4,
                            fontSize: 15,
                            color: '#2D0C57'
                        }
                    }
                >
                {
                    userInfo ? userInfo.name : ''
                }
                </Text>
                <View
                    style={
                        {
                            marginTop: 28,
                            width: '100%',
                            flexDirection: 'column',
                        }
                    }
                >
                    <View
                        style={
                            {
                                width: '100%',
                                height: 55,
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }
                        }
                    >
                        <TextViewComponent
                            label={
                                'Form No.'
                            }
                            value={
                                userInfo && userInfo.form_no
                            }
                        />
                        <TextViewComponent
                            label={
                                'Pratham Naam'
                            }
                            styles={
                                {
                                    alignItems: 'flex-end'
                                }
                            }
                            value={
                                userInfo && userInfo.prathamname_date
                            }
                        />
                    </View>

                    <View
                        style={
                            {
                                width: '100%',
                                height: 55,
                                flexDirection: 'row',
                            }
                        }
                    >
                        <TextViewComponent
                            label={
                                'Taluka'
                            }
                            value={
                                userInfo && userInfo.tehsil_name
                            }
                        />
                        <TextViewComponent
                            label={
                                'District'
                            }
                            styles={
                                {
                                    marginLeft: 44
                                }
                            }
                            value={
                                userInfo && userInfo.district_name
                            }
                        />
                        <TextViewComponent
                            label={
                                'State'
                            }
                            styles={
                                {
                                    alignItems: 'flex-end'
                                }
                            }
                            value={
                                userInfo && userInfo.satnam_date
                            }
                        />
                    </View>


                    <View
                        style={
                            {
                                width: '100%',
                                height: 55,
                                flexDirection: 'row',
                            }
                        }
                    >
                        <TextViewComponent
                            label={
                                'Mobile.'
                            }
                            value={
                                userInfo && userInfo.mobile_no
                            }
                        />
                        <TextViewComponent
                            label={
                                'Guardian'
                            }
                            styles={
                                {
                                    marginLeft: 44
                                }
                            }
                            value={
                                userInfo && userInfo.guardian_name
                            }
                        />
                        <TextViewComponent
                            label={
                                'Relation'
                            }
                            styles={
                                {
                                    alignItems: 'flex-end'
                                }
                            }
                            value={
                                userInfo && userInfo.relation
                            }
                        />
                    </View>
                    <View
                        style={
                            {
                                width: '100%',
                                height: 55,
                                flexDirection: 'row',
                            }
                        }
                    >
                        <TextViewComponent
                            label={
                                'Satnaam Date.'
                            }
                            value={
                                (userInfo && userInfo.satnam_date) || '-'
                            }
                        />
                    </View>
                    <View
                        style={
                            {
                                width: '100%',
                                height: 55,
                                marginTop: 24,
                                flexDirection: 'row',
                            }
                        }
                    >
                        <Button
                            onPress={
                                ()=>{
                                    setUserInfo(
                                        undefined
                                    )
                                    props.setIinitiateSelectDate && props.setIinitiateSelectDate(
                                        true
                                    )
                                }
                            }
                            buttonStyle={
                                {
                                    backgroundColor: '#2F4F94',
                                    width: '100%',
                                    borderRadius: 8,
                                }
                            }
                            title={'Select Date'}
                        />
                    </View>
                    {
                        isHajriListRequested ? (
                            <View
                                style={
                                    {
                                        width: '100%',
                                        height: 55,
                                        marginTop: 24,
                                        flexDirection: 'row',
                                    }
                                }
                            >
                                <ScrollView
                                    horizontal = {
                                        true
                                    }
                                >
                                    {
                                        hajriList.map(
                                            ( hajri, index) => {
                                                return (
                                                    <HajriListItemRowComponent label={`Hajri ${index+1}`} hajriDate={hajri && hajri.attendance_date}></HajriListItemRowComponent>
                                                )
                                            }
                                        )
                                    }
                                </ScrollView>
                            </View>
                        ) : (
                            <View/>
                        )
                    }
                </View>
            </View>
        </View>
        </Modal>
    )
}

export default UserInfoComponent