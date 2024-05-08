import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import AsyncStorage from '@react-native-async-storage/async-storage';


const Donacion = () => {
    console.log("estamos en donacion");
    const [datosAceptadas, setDatosAceptadas] = useState({ indice: [], data: [] });
    const [datosPendiente, setDatosPendientes] = useState({ indice: [], data: [] });

    async function getData() {
        const token = await AsyncStorage.getItem('token');
        const id_user = JSON.parse(await AsyncStorage.getItem('id_user'));
        console.log(token);
        console.log(id_user);
        console.log('****************=============================================******************')
        axios.get('https://proyecto-281-production.up.railway.app/api/donation/getEstadoPostulacionResponsable', {
            headers: {
                "x-token": token,
                "id_user": id_user
            }
        })
            .then((response) => {
                //console.log(response.data.body);
                setDatosAceptadas({ indice: ["id_donacion", "cantidad",], data: [...response.data.body.postulacionesAceptadas, ...response.data.body.postulacionesPendientes] });
                setDatosPendientes({ indice: ["id_donacion", "cantidad"], data: response.data.body.postulacionesPendientes });
                console.log(datosAceptadas);
                console.log(datosPendiente);
            })
            .catch(error => {
                console.log(error);
            })

    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <View>
            {console.log(datosAceptadas)}
            {
                datosAceptadas.data.map((fila, i) => {
                    return (
                        <View>
                            {datosAceptadas.indice.map((index, p) => {
                                return (
                                    <Text>{fila[index]}</Text>

                                )
                            })}
                        </View>
                    )
                    {
                        fila['estado'] ? <Button variant="contained" onClick={(e) => {
                            console.log(fila['id_donacion']);
                        }}
                            style={{ background: "green", borderRadius: "8px", textTransform: "none" }}>
                            Habilitado
                        </Button> :
                            <Button variant="contained" onClick={(e) => {
                                console.log(fila['id_donacion']);
                            }}
                                style={{ background: "blue", borderRadius: "8px", textTransform: "none" }}>
                                Pendiente
                            </Button>
                    }

                })
            }

            {/* <FlatList
                keyExtractor={(item) => item.data}
                data={datosAceptadas}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.data.id_user}</Text>

                    </View>
                )}
            /> */}

        </View>
    )
}

export default Donacion

const styles = StyleSheet.create({})