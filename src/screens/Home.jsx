import {
    View,
    Text,
    Alert,
    TouchableOpacity, StyleSheet, Image, BackHandler, ScrollView
} from 'react-native'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Avatar } from 'react-native-paper';
import Mobile from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Email from 'react-native-vector-icons/MaterialCommunityIcons';
import Gender from 'react-native-vector-icons/Fontisto';
import Profession from 'react-native-vector-icons/AntDesign';
//async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';
//fontawesome
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

//navigation
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//screens
import Donacion from '../userScreens/voluntario/Donacion';
import Entrega from '../userScreens/voluntario/Entrega';
import { Login } from './Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//fuera del home
//const Tab = createBottomTabNavigator();
//dento home

const Home = () => {
    const [userData, setUserData] = useState('');

    const navigation = useNavigation();
    function signOut() {
        AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
        AsyncStorage.setItem('token', '');
        navigation.navigate('Login');
        console.log('seting false');
    }


    async function getData() {
        const token = await AsyncStorage.getItem('token');
        const id_user = JSON.parse(await AsyncStorage.getItem('id_user'));
        console.log(token);
        console.log(id_user);
        console.log('================================================================******************')
        axios.get('https://proyecto-281-production.up.railway.app/api/auth/mostrarDatos',
            {
                headers: {
                    "x-token": token,
                    "id_user": id_user
                }
            }
        )
            .then(response => {
                console.log(response.data);
                setUserData(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }
    const handleBackPress = () => {
        Alert.alert(
            'Exit App',
            'Are you sure',
            [{
                text: 'Cancel',
                onPress: () => null,
                styel: 'cancel',
            },
            {
                text: 'Exit',
                onPress: () => BackHandler.exitApp(),
            },
            ]);
        return true;
    };

    useEffect(() => {
        getData();
        BackHandler.addEventListener('hardwareBackPress', handleBackPress)
    }, []);

    return (
        <ScrollView>
            <View style={{ paddingBottom: 100 }}>
                <View style={{ position: 'relative' }}>
                    <TouchableOpacity
                        style={styles.backIcon}
                    // onPress={() => {
                    //     navigation.dispatch(DrawerActions.openDrawer());
                    // }}
                    >
                        <Mobile name="menu" size={30} color="white" />
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.editIcon}
                        onPress={() => signOut()}
                    >
                        <FontAwesome5 name='sign-out-alt' size={30} color="white" />
                    </TouchableOpacity>

                    <Image
                        width={100}
                        height={60}
                        resizeMode="contain"
                        style={{
                            marginTop: -150,
                        }}
                        source={require('../../assets/wave.png')}
                    />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Avatar.Image
                        size={180}
                        style={styles.avatar}
                        source={{
                            uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeD////Byt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJ6TfQ3EtY9N4D+jdQ2k6F8K4OltayDFKyP4cghmI6PzVvDnHrDuEqR9UwFPY1IEufw+C72yh8LeIUFOaxSY6K0dFt2qTXDDVJCUi0IBT2vHHmTUSWAnPjgZtBJ4p2BjJ4RIYCSHlCpEAi+CAXMowiSwIIJoguKSE7k5rD8aPWDg3gnKg8EPLrGXEUL5tGC2ijr2OkIIjAlfEJdVBLMNcmprQEnAW09YUzT5C9aNADgbfMGaPQlOgrwj1cAlDZIGGVYD2ktIpAasiRNQgzxpkOektoCMjUkDT+zFaEFqwNqohtSgiL0YHcHlVAMaoCooM6SJo/qK7RGk+yBpkGVBl2w2NAi7aEwamNEAWE5MGiQNkgZJg6RB0sCEBoj+C3YN0j5IGkyks3LKnSegdaSkQdIgaUCtwcf7RJHy02OjVG3/+knvSlxJd+uK7Emb6eqOrQVBoJvgCtu16xYasF23QXsPWDVI+yArN9CALTyW6LhAqAE8NuaEcQH2fOMbtkNS+e7IC8MaYIuJM3TnRGwxcYbvPQ+0eDBD95TFIRv3rwyx17Qa/EGRbmqSAz1xvSP2ktaDvW3MOV9xoJ0i43tftEPgc4n4U1Ls9ajAbgTOkSCh02AW1GxJ4w2gCKwSIAspF0pLmIB5BNaXvhnwnMSXMn6DqrBzBoUrqKoiXdp8B6qqWMVeSADyzijhNyDeBiinyOwSUc95uAemYZ66sl0wLYGcFPmK6gsgCTRzZJxAlJe5TQFyQiA3hQxRVuSOChPBXrEW2trBf/RDts1sg+C8iXZA1oKwc9IY++dDCDojUKcKd5T67JF6ou4C9SHBhjO4os2hiWupv1Hm0JY00LpFKx5xQmsLpjRQdisy19R/om3MsaSB9rxsSgOdBKY00E5SZOxBeoa2kGJJA+01gyEN1JmjJQ20jxnYq+p3qPNGQxqo66qtHQ3UfUlJA0MalKJ+8NnyPfh/hFzOnbpFr6vP7JeNGaALw0BJMfzemT4+IhqSYq8hFESDInNj3ky4BPSXroieLPZDAuI7nuROsUS84iAvqKmT5gWxVxEIQgJuY8BsA+6NgPmyMXVkQHXuM+cMuBEIjO98Z4K78r5pOFtVpWiRn7Qd+aop5QU9AqJuMyYVRKoNJkT58OD/cuy1vYUX4LTBvLgrzVAcXwYpthPgSjcc2ybkgjoRvKQvjqrCVl7gEU11RJMQGTeYFvicbjyaCnsrMFG3R1JBsnZjR/hEhf4gJiHi0NOg1nCOL8OejvAJ3RBTBScy7O4GHlCfXCwV4hrBkvMlQmYpZXQjWLJ7sJTyEEawZNfMsowUC/+m38kxiNtgbDCMZgfHIMUuaVEA3cYnBnx5aAu8e9xMASkYFJjoNpo/K+7oVnBPg68xuKw8zoHoPXp0pCzHg0bDV0CTa3EsjmBJjUunsB9u35Ua08wkGecmuIEIEVIReoIFwTf38JHhEQgcxuqOlx4qCBFBCnY7uKH/uhV0SHRU9CNFUO1EB0A9TMKIIczoggP+QxpRUQ0cM+MMrmiezG7x0bmoKDYCZhLqgVjf8WvhfLhkfaPnFt/di8zq6XNbfIczMqsHDW3xTdrYPFvrP7kiUsVMV4ODAAAAAElFTkSuQmCC'
                            // userData == "" || userData == null ?
                            //     'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeD////Byt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJ6TfQ3EtY9N4D+jdQ2k6F8K4OltayDFKyP4cghmI6PzVvDnHrDuEqR9UwFPY1IEufw+C72yh8LeIUFOaxSY6K0dFt2qTXDDVJCUi0IBT2vHHmTUSWAnPjgZtBJ4p2BjJ4RIYCSHlCpEAi+CAXMowiSwIIJoguKSE7k5rD8aPWDg3gnKg8EPLrGXEUL5tGC2ijr2OkIIjAlfEJdVBLMNcmprQEnAW09YUzT5C9aNADgbfMGaPQlOgrwj1cAlDZIGGVYD2ktIpAasiRNQgzxpkOektoCMjUkDT+zFaEFqwNqohtSgiL0YHcHlVAMaoCooM6SJo/qK7RGk+yBpkGVBl2w2NAi7aEwamNEAWE5MGiQNkgZJg6RB0sCEBoj+C3YN0j5IGkyks3LKnSegdaSkQdIgaUCtwcf7RJHy02OjVG3/+knvSlxJd+uK7Emb6eqOrQVBoJvgCtu16xYasF23QXsPWDVI+yArN9CALTyW6LhAqAE8NuaEcQH2fOMbtkNS+e7IC8MaYIuJM3TnRGwxcYbvPQ+0eDBD95TFIRv3rwyx17Qa/EGRbmqSAz1xvSP2ktaDvW3MOV9xoJ0i43tftEPgc4n4U1Ls9ajAbgTOkSCh02AW1GxJ4w2gCKwSIAspF0pLmIB5BNaXvhnwnMSXMn6DqrBzBoUrqKoiXdp8B6qqWMVeSADyzijhNyDeBiinyOwSUc95uAemYZ66sl0wLYGcFPmK6gsgCTRzZJxAlJe5TQFyQiA3hQxRVuSOChPBXrEW2trBf/RDts1sg+C8iXZA1oKwc9IY++dDCDojUKcKd5T67JF6ou4C9SHBhjO4os2hiWupv1Hm0JY00LpFKx5xQmsLpjRQdisy19R/om3MsaSB9rxsSgOdBKY00E5SZOxBeoa2kGJJA+01gyEN1JmjJQ20jxnYq+p3qPNGQxqo66qtHQ3UfUlJA0MalKJ+8NnyPfh/hFzOnbpFr6vP7JeNGaALw0BJMfzemT4+IhqSYq8hFESDInNj3ky4BPSXroieLPZDAuI7nuROsUS84iAvqKmT5gWxVxEIQgJuY8BsA+6NgPmyMXVkQHXuM+cMuBEIjO98Z4K78r5pOFtVpWiRn7Qd+aop5QU9AqJuMyYVRKoNJkT58OD/cuy1vYUX4LTBvLgrzVAcXwYpthPgSjcc2ybkgjoRvKQvjqrCVl7gEU11RJMQGTeYFvicbjyaCnsrMFG3R1JBsnZjR/hEhf4gJiHi0NOg1nCOL8OejvAJ3RBTBScy7O4GHlCfXCwV4hrBkvMlQmYpZXQjWLJ7sJTyEEawZNfMsowUC/+m38kxiNtgbDCMZgfHIMUuaVEA3cYnBnx5aAu8e9xMASkYFJjoNpo/K+7oVnBPg68xuKw8zoHoPXp0pCzHg0bDV0CTa3EsjmBJjUunsB9u35Ua08wkGecmuIEIEVIReoIFwTf38JHhEQgcxuqOlx4qCBFBCnY7uKH/uhV0SHRU9CNFUO1EB0A9TMKIIczoggP+QxpRUQ0cM+MMrmiezG7x0bmoKDYCZhLqgVjf8WvhfLhkfaPnFt/di8zq6XNbfIczMqsHDW3xTdrYPFvrP7kiUsVMV4ODAAAAAElFTkSuQmCC'
                            //     : userData.image
                        }}
                    />
                </View>
                <View style={{ marginTop: -50 }}>
                    <Text style={styles.nameText}>{userData.nombre + " " + userData.ap_paterno + " " + userData.ap_materno}</Text>
                </View>


                <View style={{ marginTop: 20, marginHorizontal: 25 }}>
                    <View style={styles.infoMain}>
                        <View style={styles.infoCont}>
                            <View style={[styles.infoIconCont, { backgroundColor: '#ff9500' }]}>
                                <Email name="email" size={24} style={{ color: 'white' }} />
                            </View>
                            <View style={styles.infoText}>
                                <Text style={styles.infoSmall_Text}>Email</Text>
                                <Text style={styles.infoLarge_Text} numberOfLines={1}>
                                    {userData.correo}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.infoMain}>
                        <View style={styles.infoCont}>
                            <View style={[styles.infoIconCont, { backgroundColor: '#0d7313' }]}>
                                <Gender
                                    name="date"
                                    size={28}
                                    color="blue"
                                    style={{ color: 'white' }}
                                />
                            </View>
                            <View style={styles.infoText}>
                                <Text style={styles.infoSmall_Text}>Fecha Nacimiento</Text>
                                <Text style={styles.infoLarge_Text}>
                                    {userData.fecha_nac == '' ||
                                        userData.fecha_nac == undefined ||
                                        userData.fecha_nac == null
                                        ? ''
                                        : userData.fecha_nac}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.infoMain}>
                        <View style={styles.infoCont}>
                            <View style={[styles.infoIconCont, { backgroundColor: '#774BBC' }]}>
                                <Profession name="profile" size={24} style={{ color: 'white' }} />
                            </View>
                            <View style={styles.infoText}>
                                <Text style={styles.infoSmall_Text}>Rol</Text>
                                <Text style={styles.infoLarge_Text}>

                                    {userData.tipo == '' ||
                                        userData.tipo == undefined ||
                                        userData.tipo == null
                                        ? ''
                                        : userData.tipo}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.infoMain}>
                        <View style={styles.infoCont}>
                            <View style={[styles.infoIconCont, { backgroundColor: '#f2276e' }]}>
                                <Mobile name="mobile" size={24} style={{ color: 'white' }} />
                            </View>
                            <View style={styles.infoText}>
                                <Text style={styles.infoSmall_Text}>Celular</Text>
                                <Text style={styles.infoLarge_Text}>
                                    {userData.nro_cel}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.infoMain}>
                    <View style={styles.botones}>
                        <TouchableOpacity style={styles.inBut}>
                            <Text style={styles.btnText}>Recoger</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.inBut}>
                            <Text style={styles.btnText}>Enbtregar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>

    )
}

// const Home = () => {

//     const fcol = '#154c79';
//     const ufcol = '#5E5E64'
//     return (
//         <Perfil />
//         <NavigationContainer>
//             <Tab.Navigator>
//                 <Tab.Screen name='Perfil' component={Perfil} />
//                 <Tab.Screen name="Donacion" component={Donacion} />
//                 <Tab.Screen name='Entrega' component={Entrega} />
//             </Tab.Navigator>
//         </NavigationContainer>
//         <Tab.Navigator
//             screenOptions={{
//                 tabBarShowLabel: false,
//                 headerShown: false,
//                 tabBarStyle: {
//                     position: 'absolute',
//                     marginBottom: 10,
//                     marginHorizontal: 20,
//                     elevation: 2,
//                     borderRadius: 15,
//                     height: 70,
//                 },
//             }}
//         >
//             <Tab.Screen
//                 name='Perfil' component={Perfil}
//                 options={{
//                     tabBarIcon: ({ focused }) => (
//                         <View style={styles.contIconNav}>
//                             <FontAwesome5 name='user-alt' size={30}
//                                 style={{ color: focused ? fcol : ufcol }}
//                             />
//                             <Text style={{ color: focused ? fcol : ufcol }}>Perfil</Text>
//                         </View>
//                     ),
//                 }}
//             />
//             <Tab.Screen
//                 name="Donacion"
//                 component={Donacion}
//                 options={{
//                     tabBarIcon: ({ focused }) => (
//                         <View style={styles.contIconNav}>
//                             <FontAwesome6 name='list-check' size={30}
//                                 style={{ color: focused ? fcol : ufcol }}
//                             />
//                             <Text
//                                 style={{ color: focused ? fcol : ufcol }}
//                             >Donacion</Text>
//                         </View>
//                     ),
//                 }}
//             />
//             <Tab.Screen name='Entrega' component={Entrega}
//                 options={{
//                     tabBarIcon: ({ focused }) => (
//                         <View style={styles.contIconNav}>
//                             <FontAwesome6 name='list-check' size={30}
//                                 style={{ color: focused ? fcol : ufcol }}
//                             />
//                             <Text
//                                 style={{ color: focused ? fcol : ufcol }}
//                             >Entrega</Text>
//                         </View>
//                     ),
//                 }}
//             />
//         </Tab.Navigator >
//     );
// }

const styles = StyleSheet.create({
    editIcon: {
        zIndex: 1,
        color: 'white',
        position: 'absolute',
        right: 2,
        margin: 15,
    },
    backIcon: {
        zIndex: 1,
        color: 'white',
        position: 'absolute',
        left: 2,
        margin: 15,
    },
    avatar: {
        borderRadius: 100,
        marginTop: -250,
        // marginLeft: 105,
        backgroundColor: 'white',
        height: 200,
        width: 200,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        elevation: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // 420475
    nameText: {
        color: 'black',
        fontSize: 28,

        fontStyle: 'normal',
        fontFamily: 'Open Sans',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    bookCountMain: {
        borderColor: '#b0b0b0',
        borderWidth: 1,
        marginTop: 18,
        marginHorizontal: 20,

        borderRadius: 20,
        flexDirection: 'row',
        width: '88%',
    },
    bookCount: {
        width: '50%',
        borderColor: '#b0b0b0',
        borderRightWidth: 1,
        flexDirection: 'column',
        paddingHorizontal: 10,
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookCountNum: {
        color: '#5D01AA',
        fontSize: 34,
        fontWeight: '800',
    },
    bookCountText: { color: '#b3b3b3', fontSize: 14, fontWeight: '500' },
    infoMain: {
        marginTop: 10,
    },
    infoCont: {
        width: '100%',
        flexDirection: 'row',
    },
    infoIconCont: {
        justifyContent: 'center',
        height: 40,
        width: 40,
        borderRadius: 20,

        alignItems: 'center',
        elevation: -5,
        borderColor: 'black',
        backgroundColor: 'black',
    },

    infoText: {
        width: '80%',
        flexDirection: 'column',
        marginLeft: 25,
        borderBottomWidth: 1,
        paddingBottom: 10,
        borderColor: '#e6e6e6',
    },
    infoSmall_Text: {
        fontSize: 13,
        color: '#b3b3b3',
        fontWeight: '500',
    },
    infoLarge_Text: {
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
    },
    booksUploadedMain: {
        paddingHorizontal: 10,
        paddingBottom: 30,
        marginTop: 20,
    },
    flatlistDiv: {
        borderRadius: 15,
        paddingHorizontal: 10,
    },
    booksUploadedText: {
        fontSize: 26,
        color: 'black',
        fontWeight: '700',
        paddingLeft: 20,
        paddingBottom: 8,
    },
    booksUploadedCard: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 9,
        marginBottom: 9,

        backgroundColor: '#f2f2f2',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 15,
        elevation: 3,
    },
    booksUploadedImgDiv: {
        width: '28%',
    },
    booksUploadedImg: {
        width: '100%',
        height: 120,
        borderRadius: 15,
    },
    cardMidDiv: {
        paddingHorizontal: 10,
        width: '55%',
        position: 'relative',
    },
    approvedText: {
        fontSize: 12,
        color: '#0d7313',
        fontWeight: '600',
        marginLeft: 5,
    },
    cardBookNameText: {
        fontSize: 24,
        color: 'black',
        fontWeight: '700',
        marginTop: 2,
    },
    cardBookAuthor: {
        fontSize: 14,
        color: 'black',
        fontWeight: '600',
        marginTop: 1,
    },
    cardRating: {
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 10,
        flexDirection: 'row',
    },
    cardRatingCount: {
        fontSize: 14,
        marginTop: -2,
        paddingLeft: 4,
        color: '#303030',
    },
    cardEditDiv: {
        width: '17%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardEditBtn: {
        height: 44,
        width: 44,
        backgroundColor: '#774BBC',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        padding: 10,
        justifyContent: 'center',

        flexDirection: 'row',
    },
    loadMoreBtn: {
        padding: 10,
        backgroundColor: '#f5a002',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        paddingHorizontal: 20,
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        fontWeight: '600',
    },
    inBut: {
        width: '40%',
        backgroundColor: '#420475',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 50,
    },
    botones: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around'
    },
    //tab bar
    contIconNav: {
        alignItems: 'center',
        justifyContent: 'center',

    },
})
export default Home