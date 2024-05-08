import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
//navigation packs
import { NavigationContainer } from '@react-navigation/native'
//navigation
import AuthStack from './AuthStack'
import HomeStack from './HomeStack'

const Route = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    async function getData() {
        const data = JSON.parse(await AsyncStorage.getItem('isLoggedIn'))
        console.log(data);
        setIsLoggedIn(data);
    }

    useEffect(() => {
        getData();
    }, [])
    return (
        <NavigationContainer>
            {isLoggedIn ? <HomeStack /> : <AuthStack />}
            {/* <AuthStack /> */}
        </NavigationContainer>
    )
}

export default Route