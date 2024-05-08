import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStack from '../routes/AppStack';

export const Login = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    handleSubmit = () => {
        console.log(user, password)
        const userData = {
            user: user,
            password
        }
        axios.post('https://proyecto-281-production.up.railway.app/api/auth/', userData)
            .then(res => {
                console.log(res.data);
                if (res.data.ok) {
                    Alert.alert('Login in suc')
                    AsyncStorage.setItem('token', res.data.token);
                    AsyncStorage.setItem('id_user', JSON.stringify(res.data.id_user));
                    AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
                    navigation.navigate('AppStack');
                    // <AppStack />
                }
            });
    }

    return (
        <View>
            <View style={styles.logoContainer}>
                <Image source={require('../../assets/icon.png')}
                    style={[styles.logo]}
                />
            </View>
            <View style={styles.loginContainer}>
                <Text style={styles.text_header}>Login</Text>
                <View style={styles.action}>
                    <FontAwesome name="user" style={styles.smallIcon}></FontAwesome>
                    <TextInput
                        placeholder='Usuario'
                        style={styles.textInput}
                        onChange={e => setUser(e.nativeEvent.text)}
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesome name="lock" style={styles.smallIcon}></FontAwesome>
                    <TextInput
                        placeholder='Contrasena'
                        style={styles.textInput}
                        onChange={e => setPassword(e.nativeEvent.text)}
                    />
                </View>

            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.inBut}
                    onPress={() => handleSubmit()}
                >
                    <View>
                        <Text style={styles.textSign}>Log In</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

//export default Login

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    smallIcon: {
        marginRight: 10,
        fontSize: 24,
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: 260,
        width: 260,
        marginTop: 30,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
    },
    action: {
        flexDirection: 'row',
        paddingTop: 14,
        paddingBottom: 3,
        marginTop: 15,

        paddingHorizontal: 15,

        borderWidth: 1,
        borderColor: '#420475',
        borderRadius: 50,
    },
    textInput: {
        flex: 1,
        marginTop: -12,

        color: '#05375a',
    },
    loginContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    header: {
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    },
    text_header: {
        color: '#420475',
        fontWeight: 'bold',
        fontSize: 30,
    },
    button: {
        alignItems: 'center',
        marginTop: -20,
        textAlign: 'center',
        margin: 20,
    },
    inBut: {
        width: '70%',
        backgroundColor: '#420475',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 50,
    },
    inBut2: {
        backgroundColor: '#420475',
        height: 65,
        width: 65,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomButton: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    smallIcon2: {
        fontSize: 40,
        // marginRight: 10,
    },
    bottomText: {
        color: 'black',
        fontSize: 12,
        fontWeight: '600',
        marginTop: 5,
    },
})