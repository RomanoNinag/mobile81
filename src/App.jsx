import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

//screens
import { Login } from './screens/Login';
import Home from './screens/Home';

import { Router } from './routes/Router';
//navigation

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Route from './routes/Route';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // async function getData() {
  //   const data = JSON.parse(await AsyncStorage.getItem('isLoggedIn'))
  //   setIsLoggedIn(data);
  // }

  // useEffect(() => {
  //   getData();
  // })
  const Stack = createNativeStackNavigator();
  return (
    // <NavigationContainer>
    //   <Stack.Navigator
    //     screenOptions={{
    //       headerShown: false,
    //     }}
    //   >
    //     <Stack.Screen name="Login" component={Login} />
    //     <Stack.Screen name="Home" component={Home} />
    //   </Stack.Navigator>
    //   {/* <Home /> */}

    // </NavigationContainer>
    
    <Route />
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
