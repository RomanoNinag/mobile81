import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login } from '../screens/Login'
import Home from '../screens/Home'
import HomeStack from './HomeStack'
import Donante from '../userScreens/Donante/Donante'
import { Receptor } from '../userScreens/Receptor/Receptor'


const AuthStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="HomeStack" component={HomeStack} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Donante" component={Donante} />
            <Stack.Screen name="Receptor" component={Receptor} />
            {/* <Stack.Screen name="Home" component={Home} /> */}
        </Stack.Navigator>

    )
}

export default AuthStack