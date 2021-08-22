import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { View, AsyncStorage } from 'react-native';
import { SearchBar } from 'react-native-elements';
import DateSelectorComponent from './components/naam-date-selector';
import PopupNotice from './components/notice';
import UserInfoComponent from './components/user';
import UserListComponent from './components/user-list';
const successImageIcon = require('../../../assets/check-circletick.png')
const questionUserIcon = require("../../../assets/help-circle-outlinequestion-mark.png")
const failedIcon = require("../../../assets/x-circlewrong.png")

import axios from "axios"
import { ScrollView } from 'react-native-gesture-handler';
import { SATNAM, USER_SEARCH_ACTION } from '../../constants';
import { generateAttendaceCreateRequestURL, generateUserInfoRequestURL } from '../../helper/router';
import { executeRequest } from '../../helper/network/link';
import Dropdown from '../../components/DropdownV2';


const POST_REQUEST_METHOD = "POST";
const USER_SEARCH_REQUEST_URL = generateUserInfoRequestURL(
    USER_SEARCH_ACTION
)
console.log(USER_SEARCH_REQUEST_URL)
const APPLICATION_KEY = "dsv213a213sfv21123fs31d3fd132c3dv31dsf33"

const Entry = (
    {
        route, 
        navigation
    }
) => {    

    const [
        countries,
        setCountries
    ]= useState()

    const [
        states,
        setStates
    ] = useState()

    const [
        stateSelectedIndex,
        setStateSelectedIndex
    ] = useState(20)

    const[
        stateSelected,
        setStateSelected
    ] = useState(27)

    const [
        countrySelected,
        setCountrySelected
    ] = useState(2)

    const [
        countrySelectedIndex,
        setCountrySelectedIndex
    ] = useState(76)

    const [
        districts,
        setDistricts
    ] = useState()

    const [
        districtSelected,
        setDistrictSelected
    ] = useState()

    const [
        districtSelectedIndex,
        setDistrictSelectedIndex
    ] = useState()


    const [
        tehsils,
        setTehsils
    ] = useState()

    const[
        tehsilSelected,
        setTehsilsSelected
    ] = useState()

    const [
        tehsilSelectedIndex,
        setTehsilSelectedIndex
    ] = useState()



    const fetchCountries = async () => {
        const response = await AsyncStorage.getItem("countries");
        console.log(response)
        const countryNames = JSON.parse(response).map( (country) => { return {"name": country.name, "id": country.id} })
        setCountries(
            countryNames
        )
    };

    const fetchStates = async () => {
        try{
            let states = JSON.parse(await AsyncStorage.getItem("states"));
            let stateNames;
            console.log("States: ", states)
            stateNames = states.filter( (state) => state.country_id == countrySelected).map( (state) =>  {return {name: state.name, id: state.id}} )
            console.log("State names: ", stateNames)
            setStates(stateNames)
        }catch(error){
            console.log(error)
        }
        
    }

    const fetchDistricts = async () => {
        const response = await AsyncStorage.getItem("districts");
        let distrinctNames;
        distrinctNames = JSON.parse(response).filter(
            (district) => 
                (countrySelected ? district.country_id === countrySelected : true) && 
                (stateSelected? district.state_id === stateSelected : true)
        )
        .map( (distrinct) => {return {name: distrinct.district_name, id: distrinct.district_id}}) 
        setDistricts(
            distrinctNames
        )
    };

    const fetchTehsils = async () => {
        let tehsils = JSON.parse(await AsyncStorage.getItem("tehsils"));
        let tehsilNames;
        tehsilNames =  tehsils.filter(
            (tehsil) => 
                (countrySelected ? tehsil.country_id === countrySelected : true) && 
                (stateSelected ? tehsil.state_id === stateSelected : true) && 
                (districtSelected ? tehsil.district_id === districtSelected : true)
            )
            .map( (tehsil) => {return {name: tehsil.tehsil_name, id: tehsil.tehsil_id}})
        setTehsils(
            tehsilNames
        )

    }
    
    useEffect(
        () => {
            fetchTehsils()
        },
        [
            districtSelected
        ]
    )
    useEffect(
        () => {
            fetchDistricts()
        },
        [
            stateSelected
        ]
    )

    useEffect(
        () => {
            fetchStates()
        },
        [
            countrySelected
        ]
    )
    function formatDate(
        date
    ) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
 
    /**
     * 
     * @param {*} searchString 
     * Search disciple
     */
    const searchDisciples = async (

        ) => {
            const searchData = {
                "from_date":"2017-01-01",
                "to_date":"2021-07-23",
                "country_id": countrySelected,
                "name": "A"
            }
            const config = {
                method: POST_REQUEST_METHOD,
                headers: {
                    key: APPLICATION_KEY,
                    "Accept": "application/json",
                    "X-CSRF-TOKEN": await AsyncStorage.getItem("token"),
                    "key": "dsv213a213sfv21123fs31d3fd132c3dv31dsf33",
                },
            };
            executeRequest(
                USER_SEARCH_REQUEST_URL, searchData, config
            ).then(
                (
                    response
                ) => {
                    setUsersSearched(response.data.data)
                }
            ).catch(
                (error) => {
                    console.log("Error: ", error)
                    setUsersSearched([])
                }
            );
        };
    
    /**
     * Create satnam entry
     */
    const SATNAM_CREATE_ENTRY_REQUEST_URL = generateAttendaceCreateRequestURL(SATNAM)
    const createSatnamEntry = async (
        discipleId,
        selectedDate,
        remark = 'ok'
    ) => {
        const satnamEntryData = {
            "disciple_id": discipleId,
            "satnam_date": formatDate(selectedDate),
            "remark": "ok"
        }
        const config = {
            method: POST_REQUEST_METHOD,
            headers: {
                key: APPLICATION_KEY,
                "Accept": "application/json",
                "X-CSRF-TOKEN": await AsyncStorage.getItem("token"),
                "key": "dsv213a213sfv21123fs31d3fd132c3dv31dsf33",
            },
        };
        executeRequest(
            SATNAM_CREATE_ENTRY_REQUEST_URL, 
            satnamEntryData, 
            config
        ).then(
            (
                response
            ) => {
                console.log("Satnam Entry create responsse: ", response)
            }
        ).catch(
            (error) => {
                console.log("Error in creatin satnam entry: ", error)
                throw new Error("Could not create entry")
            }
        )
    }

    const [
        initiateSuccessNotice,
        setInitiateSuccessNotice
    ] = useState(
        false
    )

    const [
        initiateFailureNotice,
        setInitiateFailureNotice
    ] = useState(false);

    const [search, setSearch] = useState("");
    const [personSelected, setPersonSelected] = useState(false)
    const [
        usersSearched, setUsersSearched
    ] = useState([])
    const [
        selectedDateForEntry, 
        setSelectedDateForEntry
    ] = useState()
    const handleSearchChange=(e)=>{
        
    }
    const { entryType, title } = route.params;
    const [
        initiateSelectDate,
        setIinitiateSelectDate
    ] = useState(
        false
    )
    useEffect(
         () => {
            console.log(entryType)
            navigation.setOptions({
                title: `${title} Entry`,
            })
            fetchCountries()
            fetchStates()
            fetchDistricts()
            fetchTehsils()
         },
         [

         ]
    )

    useEffect(
        () => {
            console.log("Person selected", personSelected);
            console.log("Date for entry", selectedDateForEntry)
        },
        [
            personSelected
        ]
    )

    return (
        <View
            style={
                {
                    flex: 1,
                    width: '100%',
                    height: '100%'
                }
            }
        >
            <View
                styl={
                    {
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        flexDirection: 'column'
                    }
                }
            >
                <View
                    style={
                        {
                            flexDirection: 'row',
                            width: '100%',
                            alignContent: 'center',
                            marginBottom: 12,
                            justifyContent: 'space-between'
                        }
                    }
                >
                    <Dropdown 
                        options={countries ? countries : []} 
                        label={'Country'} 
                        value={countrySelectedIndex}
                        changeFn={
                        (
                            value
                        ) => {
                            setCountrySelectedIndex(value)
                            console.log("Country Selected: ", countries[value].id)
                            setCountrySelected(countries[value].id)
                        }
                    }/>
                    <Dropdown 
                        options={states ? states : []} 
                        label={'State'} 
                        value={stateSelectedIndex || 0}
                        changeFn={
                        (
                            value
                        ) => {
                            console.log("State selected: ",states[value].id)
                            setStateSelectedIndex(
                                value
                            )
                            setStateSelected(states[value].id)
                        }
                        }
                    />
                </View>
                <View
                    style={
                        {
                            flexDirection: 'row',
                            width: '100%',
                            alignContent: 'center',
                            marginBottom: 12,
                            justifyContent: 'space-between'
                        }
                    }
                >
                    
                        <Dropdown 
                        options={districts ? districts : []} 
                        label={'District'} 
                        value={districtSelectedIndex}
                        changeFn={
                        (
                            value
                        ) => {
                            console.log("District selected: ", districts[value].id)
                            setDistrictSelectedIndex(
                                value
                            )
                            setDistrictSelected(districts[value].id)
                        }
                    }/>
                    <Dropdown 
                        options={tehsils ? tehsils : []} 
                        label={'Tehsil'} 
                        value={tehsilSelectedIndex}
                        changeFn={
                        (
                            value
                        ) => {
                            setTehsilSelectedIndex(value)
                            console.log("Tehsil selected: ", tehsils[value].id)
                            setTehsilsSelected(tehsils[value].id)
                        }
                    }/>
                </View>
                <View>
                    <SearchBar
                        placeholder="Type Here..."
                        onChangeText={ 
                            (
                                value
                            ) => {
                                console.log("Searching: ", value)
                                setSearch(value)
                                searchDisciples()
                            }
                        }
                        showCancel={
                            true
                        }
                        value={search}
                    />
                </View>
                {
                    <PopupNotice 
                        requireUserConsent={false} 
                        message={'Success Adding Entry'}
                        isVisible={
                            initiateSuccessNotice
                        }
                        clickHandler={
                            () => {
                                setInitiateSuccessNotice(
                                    false
                                )
                            }
                        }
                        sourceImage={
                            successImageIcon
                        }
                    />
                }
                {
                    <PopupNotice 
                        requireUserConsent={false} 
                        message={'Failure Adding Entry'}
                        isVisible={
                            initiateFailureNotice
                        }
                        clickHandler={
                            () => {
                                setInitiateFailureNotice(
                                    false
                                )
                            }
                        }
                        sourceImage={
                            failedIcon
                        }
                    />
                }
                {
                    <PopupNotice 
                        requireUserConsent={true} 
                        message={'Are you sure you want to continue adding entry ?'}
                        cancelEntry={
                            () => {
                                setSelectedDateForEntry(
                                    undefined
                                )
                                setPersonSelected(
                                    false
                                )
                            }
                        }
                        confirmEntry={
                            () => {
                                createSatnamEntry(
                                    personSelected.id,
                                    selectedDateForEntry
                                ).catch(
                                    (error) => {
                                        setSelectedDateForEntry(
                                            undefined
                                        )
                                        setPersonSelected(
                                            false
                                        )
                                        setInitiateFailureNotice(true)
                                    }
                                ).then(
                                    () => {

                                        setSelectedDateForEntry(
                                            undefined
                                        )
                                        setPersonSelected(
                                            false
                                        )
                                        setInitiateSuccessNotice(
                                            true
                                        )
                                    }
                                )
                            }
                        }
                        isVisible={
                            personSelected && (selectedDateForEntry !== undefined)
                        } 
                        sourceImage={
                            questionUserIcon
                        }
                    />
                }
                {
                    personSelected ? (
                        <UserInfoComponent
                            setIinitiateSelectDate={
                                setIinitiateSelectDate
                            }
                            isHajriListRequested={
                                true
                            }
                            hajriType={
                                SATNAM
                            }
                            user = {
                                personSelected
                            }
                        />
                    ) : (
                        <View></View>
                    )
                }
                <ScrollView
                    style={
                        {
                            height: '100%',
                            width: '100%',
                            flexDirection: 'column',
                        }
                    }
                >
                    {
                        initiateSelectDate ? (
                            <DateSelectorComponent
                                onDateSelected = {
                                    (
                                        date
                                    ) => {
                                        setIinitiateSelectDate(
                                            false
                                        )
                                        setSelectedDateForEntry(
                                            date
                                        )
                                    }
                                }
                            />
                        ) : (
                            <View></View>
                        )
                    }

                    <UserListComponent 
                        setPersonSelected={
                            setPersonSelected
                        }
                        users={
                        usersSearched
                    }>

                    </UserListComponent>
                </ScrollView>
            </View>
        </View>
    );
}

export default Entry;
