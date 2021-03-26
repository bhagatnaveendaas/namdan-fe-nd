import React, { useState } from 'react';
import {
  SafeAreaView, Text, View, Image
} from 'react-native';
import {
  ScrollView, TextInput, TouchableHighlight, TouchableOpacity
} from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import theme from '../constants/theme';
import textConstants from '../constants/text/Login';
import styles from '../styles/Login';
import RoundButton from '../components/RoundButton';

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    console.log('Logged In');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{}}>
        <View>
          <Image style={styles.image} source={require('../../assets/Guruji2.png')} />
        </View>
        <View>
          <Text style={[styles.textCenter, styles.textWhite, styles.appName]}>
            {textConstants.appName}
          </Text>
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Feather style={styles.icons} name="user" size={20} color={theme.colors.primary} />
              <TextInput style={styles.inputs} value={userName} onChange={handleUserNameChange} placeholder="UserName" />
            </View>
            <View style={styles.iconContainer}>
              <Feather style={styles.icons} name="key" size={20} color={theme.colors.primary} />
              <TextInput style={styles.inputs} value={password} onChange={handlePasswordChange} secureTextEntry placeholder="Password" />
            </View>
            <View style={styles.buttonContainer}>
              {/* <TouchableOpacity style={styles.loginButton} onPress={handleLogin} elevation={5} >
                                <Text style={[styles.textCenter, styles.textWhite, styles.loginButtonText]}>
                                    {textConstants.login}
                                </Text>
                            </TouchableOpacity> */}
              <RoundButton label={textConstants.login} handlePress={handleLogin} />
            </View>
            <TouchableOpacity>
              <Text style={[styles.textCenter, styles.textWhite]}>Forget Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signUpContainer}>
              <Text style={[styles.textCenter, styles.textWhite]}>
                {textConstants.signUpLine}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Login;
