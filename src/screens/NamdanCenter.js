import React, { useState, useEffect } from 'react';

import {
  Text, View, Button, Image, Modal, Alert, StyleSheet
} from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
// import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import Dropdown from '../components/Dropdown';
import InputFieldWithLabel from '../components/InputFieldWithLabel';
import RoundButton from '../components/RoundButton';
import styles from '../styles/Singup';
// const { default: modalTick } = import('../../assets/icons/tickBg.png');
// const modalTickUri = Image.resolveAssetSource(modalTick).uri;

function NamdanCenter() {
  const countries = ['India', 'Pakistan', 'Nepal'];
  const states = ['Maharashtra', 'Haryana'];
  const districts = ['Pune', 'Mumbai'];
  const tehsils = ['Haveli', 'Pune City'];
  const yesno = ['Yes', 'No'];

  const [centerData, setCenterData] = useState({
    address: '',
    country: '',
    district: '',
    dob: new Date(),
    pincode: '',
    state: '',
    tehsil: '',
    mapLink: '',
    isAshram: '',
    ashramPhoneNumber: ''
  });

  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const onCountryChange = (value) => {
    const temp = { ...centerData };
    temp.country = value;
    setCenterData(temp);
  };
  const onStateChange = (value) => {
    const temp = { ...centerData };
    temp.state = value;
    setCenterData(temp);
  };
  const onDistrictChange = (value) => {
    const temp = { ...centerData };
    temp.district = value;
    setCenterData(temp);
  };

  const onTehsilChange = (value) => {
    const temp = { ...centerData };
    temp.tehsil = value;
    setCenterData(temp);
  };

  const onAddressChange = (event) => {
    const temp = { ...centerData };
    temp.address = event.nativeEvent.text;
    setCenterData(temp);
  };

  const onPincodeChange = (event) => {
    const temp = { ...centerData };
    temp.pincode = event.nativeEvent.text;
    setCenterData(temp);
  };

  const onMapLinkChange = (event) => {
    const temp = { ...centerData };
    temp.mapLink = event.nativeEvent.text;
    setCenterData(temp);
  };

  const onIsAshramChange = (value) => {
    const temp = { ...centerData };
    temp.isAshram = value;
    setCenterData(temp);
  };
  const onAshramPhoneNumberChange = (event) => {
    const temp = { ...centerData };
    temp.ashramPhoneNumber = event.nativeEvent.text;
    setCenterData(temp);
  };

  const handleRegister = () => {
    Object.keys(centerData).forEach((element) => {
      if (!centerData[element]) {
        console.log('Please fill all the required fields');
      }
    });
    console.log({ centerData });
    setSuccessModalVisible(true);
    // setErrorModalVisible(true);
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <Dropdown label="Country" value={centerData.country} changeFn={onCountryChange} options={countries} />
      <Dropdown label="State" value={centerData.state} changeFn={onStateChange} options={states} />
      <Dropdown label="District" value={centerData.district} changeFn={onDistrictChange} options={districts} />
      <Dropdown label="Tehsil" value={centerData.tehsil} changeFn={onTehsilChange} options={tehsils} />
      <InputFieldWithLabel label="Address" value={centerData.address} changeFn={onAddressChange} placeholder="Enter address" />
      <InputFieldWithLabel label="Pincode" value={centerData.pincode} changeFn={onPincodeChange} placeholder="Enter pincode" />
      <InputFieldWithLabel label="Map Link" value={centerData.mapLink} changeFn={onMapLinkChange} placeholder="Enter map link" />
      <Dropdown label="Is this an Ashram?" value={centerData.isAshram} changeFn={onIsAshramChange} options={yesno} />
      <InputFieldWithLabel label="Ashram provided phone number" value={centerData.ashramPhoneNumber} changeFn={onAshramPhoneNumberChange} placeholder="Enter phone number " />
      <View style={styles.buttonContainer}>
        <RoundButton label="Register" handlePress={() => handleRegister()} />
      </View>
      <View style={inStyles.centeredView}>
        <Modal
          animationType="slide"
          transparent
          visible={successModalVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed');
            setSuccessModalVisible(!successModalVisible);
          }}
          style={inStyles.modalContainer}
        >
          <View style={inStyles.centeredView}>
            <View style={inStyles.modalView}>
              <Image source={require('../../assets/icons/success-icon.png')} style={styles.image} />
              {/* <Image style={styles.image} source={{ uri: '../../assets/icons/tickBg.png' }} />
               */}
              <Text style={inStyles.modalText}>Namdan center registered successfully!</Text>
              <View style={inStyles.buttonContainer}>
                <RoundButton label="Close" handlePress={() => setSuccessModalVisible(false)} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View style={inStyles.centeredView}>
        <Modal
          animationType="slide"
          transparent
          visible={errorModalVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed');
            setErrorModalVisible(!errorModalVisible);
          }}
          // style={inStyles.modalContainer}/
        >
          <View style={inStyles.centeredView}>
            <View style={inStyles.modalView}>
              <Image source={require('../../assets/icons/error-icon.png')} style={styles.image} />
              {/* <Image style={styles.image} source={{ uri: '../../assets/icons/tickBg.png' }} />
               */}
              <Text style={inStyles.modalText}>Namdan center registered successfully!</Text>
              <View style={inStyles.buttonContainer}>
                <RoundButton label="Close" handlePress={() => setErrorModalVisible(false)} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const inStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  modalContainer: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 0,
    margin: 2,
    // display: 'none'
  },
  buttonContainer: {
    width: '50%',
    margin: 'auto'
  },
  // visible: {
  //   display: 'flex'
  // }
});

export default NamdanCenter;
