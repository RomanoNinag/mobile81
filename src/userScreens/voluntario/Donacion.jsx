import { FlatList, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
//ui react native
import { ListItem, Avatar } from '@rneui/base';
import ModalM from './modalM';

function ListaColab() {
    const [expanded, setExpanded] = React.useState(false);
    //para recu datos
    const [datosAceptadas, setDatosAceptadas] = useState({ indice: [], data: [] });

    const getPostulaciones = async () => {
        console.log("estamos en colab");
        const token = await AsyncStorage.getItem('token');
        const id_user = JSON.parse(await AsyncStorage.getItem('id_user'));
        // console.log(token);
        // console.log(id_user);
        console.log('cccccccccccccccccccccccccccccc=============================================******************')
        axios.get('https://proyecto-281-production.up.railway.app/api/donation/getPostulacionColaborador', {
            headers: {
                "x-token": token,
                "id_user": id_user
            }
        })
            .then((response) => {
                console.log(response.data.body.postulaciones);
                setDatosAceptadas({ indice: ["id_user", "id_donacion",], data: [...response.data.body.postulaciones] });
                // setDatosPendientes({ indice: ["id_donacion", "cantidad"], data: response.data.body.postulacionesPendientes });
                // console.log(datosAceptadas);
                // console.log(datosPendiente);
            })
            .catch(error => {
                console.log(error);
            })

    }
    useEffect(() => {
        getPostulaciones();
    }, []);
    useEffect(() => {
        console.log(datosAceptadas);
    }, [datosAceptadas]);
    return (
        <>
            <ListItem.Accordion
                content={
                    <ListItem.Content>
                        <ListItem.Title>Postulaciones a Colaborador</ListItem.Title>
                        <ListItem.Subtitle>Pressiona para ver</ListItem.Subtitle>
                    </ListItem.Content>
                }
                isExpanded={expanded}
                onPress={() => {
                    setExpanded(!expanded);
                }}
                style={[styles.headerTopBar,]}
            >
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Title>Id Donacion</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Content>
                        <ListItem.Title>Cantidad</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Content>
                        <ListItem.Title>Estado</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                {datosAceptadas.data.map((fila, i) => {
                    return (
                        <ListItem key={i} >
                            <ListItem.Content>
                                <ListItem.Title>{fila.id_user}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Content>
                                <ListItem.Title>{fila.id_donacion}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Content style={[styles.ConBtn]}>

                                {
                                    fila.estado_p == 3 ? <TouchableOpacity
                                        style={[styles.estado, { backgroundColor: '#000', width: '100%' }]}
                                    >
                                        <Text style={styles.estadoText}>Terminado</Text>
                                    </TouchableOpacity>
                                        : null}
                                {fila.estado_p == 2 ? <TouchableOpacity
                                    style={[styles.estado, { backgroundColor: '#0275d8', width: '100%' }]}
                                >
                                    <Text style={styles.estadoText}>En Curso</Text>
                                </TouchableOpacity>
                                    : null

                                }
                                {fila.estado_p == 1 ? <TouchableOpacity
                                    style={[styles.estado, { backgroundColor: '#5cb85c', width: '100%' }]}
                                >
                                    <Text style={styles.estadoText}>Habilitado</Text>
                                </TouchableOpacity>
                                    : null

                                }
                                {
                                    fila.estado_p == 0 ? <TouchableOpacity
                                        style={[styles.estado, { backgroundColor: '#d9534f', width: '100%' }]}
                                    >
                                        <Text style={styles.estadoText}>Pendiente</Text>
                                    </TouchableOpacity>
                                        : null}
                                
                            </ListItem.Content>
                            

                        </ListItem>
                    )
                })}
            </ListItem.Accordion>
        </>
    );
}
function ListaRespon() {
    const [expanded, setExpanded] = React.useState(false);
    console.log("estamos en donacion");
    const [datosAceptadas, setDatosAceptadas] = useState({ indice: [], data: [] });
    const [datosPendiente, setDatosPendientes] = useState({ indice: [], data: [] });
    const [isModalVisible, setModalVisible] = useState(false);
    const [currentIdSolicitud, setCurrentIdSolicitud] = useState(null);
    const [currentEstadoDon, setCurrentEstadoDon] = useState(null);
    const openModal = (id, state) => {
        setCurrentIdSolicitud(id);
        setCurrentEstadoDon(state);
        setModalVisible(true);
        console.log("holaaaa")
    };
    const closeModal = () => {
        setModalVisible(false);
        setCurrentIdSolicitud(null);
        setCurrentEstadoDon(null);
    };
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
                // console.log(response.data.body);
                setDatosAceptadas({ indice: ["id_donacion", "cantidad",], data: [...response.data.body.postulacionesAceptadas, ...response.data.body.postulacionesPendientes] });
                // setDatosPendientes({ indice: ["id_donacion", "cantidad"], data: response.data.body.postulacionesPendientes });
                // console.log(datosAceptadas);
                // console.log(datosPendiente);
            })
            .catch(error => {
                console.log(error);
            })

    }
    useEffect(() => {
        getData();
    }, []);
    useEffect(() => {
        console.log(datosAceptadas)
    }, [datosAceptadas])
    return (
        <>
            <ListItem.Accordion
                content={
                    <ListItem.Content>
                        <ListItem.Title>Postulaciones a Responsable</ListItem.Title>
                        <ListItem.Subtitle>Pressiona para ver</ListItem.Subtitle>
                    </ListItem.Content>
                }
                isExpanded={expanded}
                onPress={() => {
                    setExpanded(!expanded);
                }}
                style={[styles.headerTopBar,]}
            >
                <View >
                    <ListItem>
                        <ListItem.Content>
                            <ListItem.Title>Id Donacion</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Content>
                            <ListItem.Title>Cantidad</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Content>
                            <ListItem.Title>Estado</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    <ScrollView>
                        {datosAceptadas.data.map((fila, i) => {
                            const col = fila.estado ? 'green' : 'red';
                            return (
                                <ListItem key={i}>
                                    <ListItem.Content>
                                        <ListItem.Title>{fila.id_donacion}</ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Content>
                                        <ListItem.Title>{fila.cantidad}</ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Content style={[styles.ConBtn]}>

                                        {
                                            fila.estado == 3 ? <TouchableOpacity
                                                style={[styles.estado, { backgroundColor: '#000', width: '100%' }]}
                                            >
                                                <Text style={styles.estadoText}>Terminado</Text>
                                            </TouchableOpacity>
                                                : null}
                                        {fila.estado == 2 ? <TouchableOpacity
                                            style={[styles.estado, { backgroundColor: '#0275d8', width: '100%' }]}
                                        >
                                            <Text style={styles.estadoText}>En Curso</Text>
                                        </TouchableOpacity>
                                            : null

                                        }
                                        {fila.estado == 1 ? <TouchableOpacity
                                            style={[styles.estado, { backgroundColor: '#5cb85c', width: '100%' }]}
                                        >
                                            <Text style={styles.estadoText}>Habilitado</Text>
                                        </TouchableOpacity>
                                            : null

                                        }
                                        {
                                            fila.estado == 0 ? <TouchableOpacity
                                                style={[styles.estado, { backgroundColor: '#d9534f', width: '100%' }]}
                                            >
                                                <Text style={styles.estadoText}>Pendiente</Text>
                                            </TouchableOpacity>
                                                : null}
                                        {
                                            fila.estado ? <TouchableOpacity
                                                onPress={() => openModal(fila.id_donacion, fila.estado)}
                                                style={[styles.estado, { backgroundColor: '#0275d8', width: '100%' }]}
                                            >
                                                <Text style={styles.estadoText}>Ver</Text>
                                            </TouchableOpacity> : null
                                        }
                                    </ListItem.Content>



                                </ListItem>
                            )
                        })}
                    </ScrollView>
                    {isModalVisible && (
                        <ModalM
                            isVisible={isModalVisible}
                            setVisible={setModalVisible}
                            id_solicitud={currentIdSolicitud}
                            onClose={closeModal}
                            ruta={'https://proyecto-281-production.up.railway.app/api/donation/verColaboradoresDonacion'}
                            rutaini={"https://proyecto-281-production.up.railway.app/api/donation/iniciarTrayectoDonacion"}
                            rutafin={"https://proyecto-281-production.up.railway.app/api/donation/terminarTrayectoDonacion"}
                            estado={currentEstadoDon}
                        />
                    )}
                </View>

            </ListItem.Accordion>

            {/* 
            <View style={styles.container}>
                <View style={styles.headerTopBar}>
                    <Text style={styles.headerTopBarText}>Postulaciones a Responsable</Text>
                </View>
                <View style={styles.header}>
                    <Text style={styles.heading}>IdDonacion</Text>
                    <Text style={styles.heading}>Cantidad</Text>
                    <Text style={styles.heading}>Estado</Text>
                </View>
                {
                    datosAceptadas.data.map((fila, i) => {
                        console.log(fila);
                        const col = fila.estado ? 'green' : 'red';
                        return (
                            <View style={styles.row}>
                                <Text style={styles.cell}>{fila.id_donacion}</Text>
                                <Text style={styles.cell}>{fila.cantidad}</Text>
                                <TouchableOpacity
                                    style={[styles.estado, { backgroundColor: col }]}
                                >
                                    <Text style={styles.estadoText}>{fila.estado ? 'Habilitado' : 'Pendiente'}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
                <ListaColab />
            </View> */}
        </>
    )
}

const Donacion = () => {
    console.log("estamos en donacion");
    return (
        <>
            <ScrollView>
            <ListaRespon />
            <ListaColab />
            </ScrollView>

        </>
    );
}

export default Donacion

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 30,
        paddingHorizontal: 30,
    },
    ConBtn: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
    },
    headerTopBar: {
        backgroundColor: '#6ab7e2',
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 5,
        elevation: 2,
    },
    headerTopBarText: {
        color: '#fff',
        fontSize: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    heading: {
        flex: 1,
        fontSize: 15,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 2,
        marginVertical: 2,
        elevation: 1,
        borderRadius: 3,
        borderColor: "#fff",
        padding: 10,
        backgroundColor: "#fff",
    },
    cell: {
        fontSize: 15,
        textAlign: 'left',
        flex: 1,
    },
    estado: {
        height: 35,
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    estadoText: {
        color: '#fff',
        fontSize: 16,
    }
})