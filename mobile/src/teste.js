import React, {useState, useEffect} from 'react';

import {StyleSheet, PermissionsAndroid} from 'react-native'
import MapView from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'

function Main() {
  const [currentRegion, setCurrentRegion] = useState({})

  /*useEffect(() => {
    async function loadInitionPosition(){
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permissão de Localização',
          message: 'A aplicação precisa da permissão de localização.',
        },
      )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        pos => {
          setCurrentRegion({
            ...currentRegion,
            latitude: pos.coords.latitude,
            longitude:pos.coords.longitude,
          });
        }   
      )
  }
    
}
  loadInitionPosition()
})*/
useEffect(() => {
  Geolocation.getCurrentPosition(
    ({ coords }) => {
      setCurrentRegion(coords)
    },
    //error => {
    //   console.log(error);
    // },
    // { enableHighAccuracy: true, maximumAge: 10000, timeout: 3000 },
  );
}, [])

  if(!currentRegion){
    return null
  }
  return <MapView 
  initialRegion={{
    latitude: currentRegion.latitude,
    longitude: currentRegion.longitude,
    latitudeDelta: 0.0068,
    longitudeDelta: 0.0068,
  }}
  style = {style.map}
/>
}

const style = StyleSheet.create({
  map : {
    flex: 1
  },
})

export default Main
