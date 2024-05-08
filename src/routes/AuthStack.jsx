import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login } from '../screens/Login'
import Home from '../screens/Home'
import AppStack from './AppStack'



const AuthStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="AppStack" component={AppStack} />
            {/* <Stack.Screen name="Home" component={Home} /> */}
        </Stack.Navigator>

    )
}

export default AuthStack