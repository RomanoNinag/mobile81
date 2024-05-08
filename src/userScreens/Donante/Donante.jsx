import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Donante = () => {
    const navigation = useNavigation();
    function signOut() {
        AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
        AsyncStorage.setItem('token', '');
        navigation.navigate('Login');
        console.log('seting false');
    }

    return (
        <View>
            <TouchableOpacity
                style={styles.editIcon}
                onPress={() => signOut()}
            >
                <FontAwesome5 name='sign-out-alt' size={30} color="blue" />
            </TouchableOpacity>
            <Text>Donante</Text>
        </View>
    )
}

export default Donante

const styles = StyleSheet.create({
    editIcon: {

        color: 'blue',
        position: 'absolute',
        right: 2,
        margin: 15,
    },
})