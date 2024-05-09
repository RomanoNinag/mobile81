import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem } from '@rneui/base';
import { ScrollView } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Linking, Button } from 'react-native';

const ModalM = ({ isVisible, setVisible, id_solicitud, onClose, ruta }) => {
  const [datosAceptadas, setDatosAceptadas] = useState([{}]);
  const [coor, setcoor] = useState({})
  const openGoogleMaps = () => {
    const latitude = coor.lat;
    const longitude = coor.lon;
    const label = coor.dir;
  
    const url = Platform.select({
      ios: `maps:0,0?q=${label}@${latitude},${longitude}`,
      android: `geo:0,0?q=${latitude},${longitude}(${label})`
    });
  
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };
  useEffect(() => {
    const getDatos = async () => {
      const token = await AsyncStorage.getItem('token');
      axios.get(ruta, {
        headers: {
          "x-token": token,
          "id_donacion": id_solicitud,
          "id_solicitud":id_solicitud,
        }
      })
      .then(res => {
        setDatosAceptadas(res.data.body.colaboradores);
        setcoor(res.data.body.direccion)
      })
      .catch(err => {
        console.error('Error al obtener datos:', err);
        Alert.alert("Error", "No se pudo cargar los datos.");
      });
    };
    if (isVisible) {
      getDatos();
    }
  }, [isVisible, id_solicitud, ruta]);
  useEffect(() => {
    console.log(datosAceptadas);
  }, [datosAceptadas])
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        setVisible(!isVisible);
        if (onClose) onClose();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
        <View style={styles.container}>
                <View style={styles.headerTopBar}>
                    <Text style={styles.headerTopBarText}>Integrantes de equipo</Text>
                </View>
                <ScrollView horizontal={true}>
                    <View>
                        <ListItem style={styles.header}>
                            <ListItem.Content>
                                <ListItem.Title>Id user</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Content>
                                <ListItem.Title>Ci</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Content>
                                <ListItem.Title>Nombre</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Content>
                                <ListItem.Title>Apellido Paterno</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Content>
                                <ListItem.Title>Apellido Materno</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        {
                            datosAceptadas.map((fila, i) => {
                                return (
                                    <ListItem style={styles.row}>
                                        <ListItem.Content style={styles.cell}><Text>{fila.id_user}</Text></ListItem.Content>
                                        <ListItem.Content style={styles.cell}><Text>{fila.ci}</Text></ListItem.Content>
                                        <ListItem.Content style={styles.cell}><Text>{fila.nombre}</Text></ListItem.Content>
                                        <ListItem.Content style={styles.cell}><Text>{fila.ap_paterno}</Text></ListItem.Content>
                                        <ListItem.Content style={styles.cell}><Text>{fila.ap_materno}</Text></ListItem.Content>
                                    </ListItem>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View> 
            <TouchableOpacity
                style={{backgroundColor:'#0275d8', padding: 10, borderRadius: 10,color:'#ffffff',paddingHorizontal: 10,marginBottom: 10}}
                onPress={openGoogleMaps}
            >
                <Text style={{color:'#fff'}}>Ver ubicacion</Text>
            </TouchableOpacity>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setVisible(!isVisible)}>
            <Text style={styles.textStyle}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '90%',
    height: '90%',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: '100%',
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
    fontWeight: 'bold',
    textAlign: 'left',
    padding: 10,
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
});

export default ModalM;
