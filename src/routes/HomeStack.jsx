import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'


import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Home from '../screens/Home'
import Donante from '../userScreens/Donante/Donante'
import { AppStackVoluntario } from './AppStackVoluntario'
import { AppStackDonante } from './AppStackDonante'
import { AppStackReceptor } from './AppStackReceptor'

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
            return (<AppStackVoluntario />)
            break;
        case 'donante_natural':
            return (<AppStackDonante />)
            break;
        case 'encargado_receptor':
            return (<AppStackReceptor />)
            break;
        case 'receptor_natural':
            return (<AppStackReceptor />)
            break;
        case 'encargado_org_ben':
            return (<AppStackReceptor />)
            break;
        default:
            break;
    }
}

export default HomeStack