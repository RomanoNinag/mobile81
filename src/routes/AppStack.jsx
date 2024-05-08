import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

//screens
import Home from '../screens/Home'
import Donacion from '../userScreens/voluntario/Donacion'
import Entrega from '../userScreens/voluntario/Entrega'
//icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'

import Perfil from '../screens/Home'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login } from '../screens/Login'
const AppStack = () => {
  const fcol = '#154c79';
  const ufcol = '#5E5E64'

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  return (
    <>

      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            marginBottom: 10,
            marginHorizontal: 20,
            elevation: 2,
            borderRadius: 15,
            height: 70,
          },
        }}
      >
        <Tab.Screen
          name='Home' component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.contIconNav}>
                <FontAwesome5 name='user-alt' size={30}
                  style={{ color: focused ? fcol : ufcol }}
                />
                <Text style={{ color: focused ? fcol : ufcol }}>Perfil</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Donacion"
          component={Donacion}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.contIconNav}>
                <FontAwesome6 name='list-check' size={30}
                  style={{ color: focused ? fcol : ufcol }}
                />
                <Text
                  style={{ color: focused ? fcol : ufcol }}
                >Donacion</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen name='Entrega' component={Entrega}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.contIconNav}>
                <FontAwesome6 name='list-check' size={30}
                  style={{ color: focused ? fcol : ufcol }}
                />
                <Text
                  style={{ color: focused ? fcol : ufcol }}
                >Entrega</Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator >
    </>
  )
}
const styles = StyleSheet.create({
  contIconNav: {
    alignItems: 'center',
    justifyContent: 'center',

  },
})
export default AppStack