import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'


import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Home from '../screens/Home'
import Donante from '../userScreens/Donante/Donante'
import AppStack from './AppStack'

const HomeStack = () => {
    const [tipo, setTipo] = useState();
    async function getTipo() {
        const tipoUser = await AsyncStorage.getItem('tipo');
        console.log(tipoUser);
        setTipo(tipoUser)
    }

    useEffect(() => {
        getTipo();
    }, [])
    switch (tipo) {
        case 'voluntario':
            return (<AppStack />)
            break;
        case 'donante_natural':
            return (<Donante />)
            break;

        default:
            break;
    }
}

export default HomeStack