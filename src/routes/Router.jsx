import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
//async
import AsyncStorage from '@react-native-async-storage/async-storage'
//routes
import AppStack from './AppStack'
import AuthStack from './AuthStack'


const Router = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState();
  // async function getData() {
  //   const data = await AsyncStorage.getItem('isLoggedIn')
  //   setIsLoggedIn(data);
  // }

  // useEffect(() => {
  //   getData();
  // })
  return (
    // <NavigationContainer>
    //   {/* {isLoggedIn ? <AppStack /> : <AuthStack />} */}
    //   <AuthStack />
    // </NavigationContainer>
    <View>
      <Text>Hla router</Text>
    </View>
  )
}

export default Router

const styles = StyleSheet.create({})