import React, { useState, useEffect } from 'react';

import {
  Text, View, Button, Image
} from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import Dropdown from '../components/Dropdown';
import InputFieldWithLabel from '../components/InputFieldWithLabel';
import RoundButton from '../components/RoundButton';
import styles from '../styles/Singup';
import Constants from '../constants/text/Signup';

function SignUp() {
  const naamdanTakenAt = ['Online', 'Naamdan Center'];
  const relations = ['S/O', 'D/O'];
  const countries = ['India', 'Pakistan', 'Nepal'];
  const states = ['Maharashtra', 'Haryana'];
  const districts = ['Pune', 'Mumbai'];
  const tehsils = ['Haveli', 'Pune City'];

  const [userData, setUserData] = useState({
    address: '',
    country: '',
    district: '',
    dob: new Date(),
    email: '',
    guardianName: '',
    mobile: '',
    naamdanTaken: '',
    name: '',
    password: '',
    password2: '',
    photo: '',
    pincode: '',
    relation: '',
    state: '',
    tehsil: '',
    userName: '',
  });
  const [image, setImage] = useState(null);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const onNaamdanChange = (value) => {
    const temp = { ...userData };
    temp.naamdanTaken = value;
    setUserData(temp);
  };
  const onNameChange = (event) => {
    const temp = { ...userData };
    temp.name = event.nativeEvent.text;
    setUserData(temp);
  };
  const onRelationChange = (value, index) => {
    const temp = { ...userData };
    temp.relation = value;
    setUserData(temp);
  };

  const onGuardianNameChange = (event) => {
    const temp = { ...userData };
    temp.guardianName = event.nativeEvent.text;
    setUserData(temp);
  };

  const onDobChange = (event, selectedDate) => {
    const temp = { ...userData };
    temp.dob = selectedDate;
    setUserData(temp);
    setShow(false);
  };

  const onMobileChange = (event) => {
    const temp = { ...userData };
    temp.mobile = event.nativeEvent.text;
    setUserData(temp);
  };

  const onCountryChange = (value) => {
    const temp = { ...userData };
    temp.country = value;
    setUserData(temp);
  };
  const onStateChange = (value) => {
    const temp = { ...userData };
    temp.state = value;
    setUserData(temp);
  };
  const onDistrictChange = (value) => {
    const temp = { ...userData };
    temp.district = value;
    setUserData(temp);
  };

  const onTehsilChange = (value) => {
    const temp = { ...userData };
    temp.tehsil = value;
    setUserData(temp);
  };

  const onAddressChange = (event) => {
    const temp = { ...userData };
    temp.address = event.nativeEvent.text;
    setUserData(temp);
  };

  const onPincodeChange = (event) => {
    const temp = { ...userData };
    temp.pincode = event.nativeEvent.text;
    setUserData(temp);
  };

  const onEmailChange = (event) => {
    const temp = { ...userData };
    temp.email = event.nativeEvent.text;
    setUserData(temp);
  };

  const onPhotoChange = (event) => {
    const temp = { ...userData };
    temp.photo = event.nativeEvent.text;
    setUserData(temp);
  };

  const onUserNameChange = (event) => {
    const temp = { ...userData };
    temp.userName = event.nativeEvent.text;
    setUserData(temp);
  };

  const onPasswordChange = (event) => {
    const temp = { ...userData };
    temp.password = event.nativeEvent.text;
    setUserData(temp);
  };

  const onPassword2Change = (event) => {
    const temp = { ...userData };
    temp.password2 = event.nativeEvent.text;
    setUserData(temp);
  };

  const handleRegister = () => {
    Object.keys(userData).forEach((element) => {
      if (!userData[element]) {
        alert('Please fill all the required fields');
      }
    });
    console.log({ userData });
  };

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <TouchableOpacity onPress={pickImage}>
        <Image source={{ uri: Constants.imagePlaceholder }} style={styles.image} />
        <Text style={{ textAlign: 'center' }}>{Constants.uploadPhoto}</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {show && (
      <DateTimePicker
        testID="dateTimePicker"
        value={userData.dob}
        mode={mode}
        is24Hour
        display="default"
        onChange={onDobChange}
      />
      )}
      <InputFieldWithLabel label="Name" value={userData.name} changeFn={onNameChange} placeholder="Enter name" />
      <Dropdown label="Naamdan Taken" value={userData.naamdanTaken} changeFn={onNaamdanChange} options={naamdanTakenAt} />
      <Dropdown label="Relation" value={userData.relation} changeFn={onRelationChange} options={relations} />
      <InputFieldWithLabel label="Guardian Name" value={userData.guardianName} changeFn={onGuardianNameChange} placeholder="Enter guardian name" />
      <InputFieldWithLabel label="Dob" isDate setShow={setShow} onFocus={() => setShow(true)} value={userData.dob} changeFn={onDobChange} placeholder="Enter DOB" />
      <InputFieldWithLabel label="Mobile" value={userData.mobile} changeFn={onMobileChange} placeholder="Enter mobile" />
      <Dropdown label="Country" value={userData.country} changeFn={onCountryChange} options={countries} />
      <Dropdown label="State" value={userData.state} changeFn={onStateChange} options={states} />
      <Dropdown label="District" value={userData.district} changeFn={onDistrictChange} options={districts} />
      <Dropdown label="Tehsil" value={userData.tehsil} changeFn={onTehsilChange} options={tehsils} />
      <InputFieldWithLabel label="Address" value={userData.address} changeFn={onAddressChange} placeholder="Enter address" />
      <InputFieldWithLabel label="Pincode" value={userData.pincode} changeFn={onPincodeChange} placeholder="Enter pincode" />
      <InputFieldWithLabel label="Email" value={userData.email} changeFn={onEmailChange} placeholder="Enter email" />
      <InputFieldWithLabel label="Upload photo" value={userData.photo} changeFn={onPhotoChange} placeholder="Upload photo" />
      <InputFieldWithLabel label="User Name" value={userData.userName} changeFn={onUserNameChange} placeholder="Enter user name" />
      <InputFieldWithLabel label="Password" value={userData.password} changeFn={onPasswordChange} placeholder="Enter password" />
      <InputFieldWithLabel label="Confirm Password" value={userData.password2} changeFn={onPassword2Change} placeholder="Confirm password" />
      <View style={styles.buttonContainer}>
        <RoundButton label="Register" handlePress={handleRegister} />
      </View>
    </ScrollView>
  );
}

export default SignUp;
