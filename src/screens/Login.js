import React from 'react'
import { SafeAreaView, Text, View, Image } from 'react-native'
import { ScrollView, TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import theme from '../constants/theme';
import textConstants from '../constants/text/Login'
import styles from '../styles/Login'


function Login() {
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
                            <TextInput style={styles.inputs} placeholder="UserName" />
                        </View>
                        <View style={styles.iconContainer}>
                            <Feather style={styles.icons} name="key" size={20} color={theme.colors.primary} />
                            <TextInput style={styles.inputs} placeholder="UserName" />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableHighlight style={styles.loginButton}>
                                <Text style={[styles.textCenter, styles.textWhite, styles.loginButtonText]}>
                                    {textConstants.login}
                                </Text>
                            </TouchableHighlight>
                        </View>
                        <TouchableHighlight>
                            <Text style={[styles.textCenter, styles.textWhite]}>Forget Password?</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.signUpContainer}>
                            <Text style={[styles.textCenter, styles.textWhite]}>
                                {textConstants.signUpLine}
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


export default Login
