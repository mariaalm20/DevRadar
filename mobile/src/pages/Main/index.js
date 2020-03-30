import React, { useState, useEffect } from 'react';

import { View, StyleSheet } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import Geolocation from '@react-native-community/geolocation';

import api from '../../services/api';



export default function App() {
  const [coordinates, setCoordinates] = useState(null)
  //const [points, setPoints] = useState([])

  // Para pegar a posicao atual do dispositivo
  useEffect(() => {
    async function loadInitialPosition(){
    Geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords
        console.log('latitude:', latitude, 'longitude:', longitude)
        setCoordinates({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        })
      },
       error => {
         console.log(error);
       },
     { enableHighAccuracy: true,
       maximumAge: 10000,
        timeout: 3000
      },
    )
    }
    loadInitialPosition()
  }, [])

  if (!coordinates){
    return null
  }


  return (
  <MapView
  initialRegion={coordinates}
  style={styles.map}>
  
  </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
})