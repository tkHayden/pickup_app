
import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import MapView, { Marker } from "react-native-maps";
import courtService from '../../services/courts'
import Location from '../services/LocationTracker'

export default function Map() {
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [courts, setCourts] = useState(null)



  useEffect(() => {
    (async () => {
      const newCourts = await courtService.fetchCourts()
      setCourts(newCourts)

    })()
  }, [])


  const renderMapMarkers = () => {
    if (courts) {
      return (
  
        courts.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.region.latitude,
              longitude: marker.region.longitude
            }}
            //testing onPress for markers. Probably will implement a modal
            onPress={() => console.log(marker.title)}
          >
          </Marker>
        )
        )
      )
    }
    return (
      null
    )
  }

  const err = () =>{
    console.log('error')
  }

  return (
    <View style={{ flex: 1 }}>
      {courts ? <Location courts={courts} setLatitude={setLatitude} setLongitude={setLongitude}/> : null }
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}>
        {renderMapMarkers()}
        <Marker
          pinColor='green'
          coordinate={{
            latitude: latitude,
            longitude: longitude
          }}>

        </Marker>
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});
