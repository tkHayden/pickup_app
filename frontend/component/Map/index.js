
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from "react-native-maps";
import CourtModal from '../CourtModal';
import * as Location from 'expo-location'
import { useLocation } from '../LocationProvider';

export default function Map({courts,setCourts}) {
  const [modalCourt,setModalCourt]= useState(null)
  const [showModal,setShowModal] = useState(false)
  const [initialLocation,setInitialLocation] = useState({longitude:0,latitude:0})

  const location = useLocation()

  useEffect(() => {
    (async () =>{
      const currentLocation = await Location.getCurrentPositionAsync({})
      setInitialLocation({longitude: currentLocation.coords.longitude,
      latitude: currentLocation.coords.latitude})
    })()
  },[])

  const renderCourtMarkers = () => {
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
            onPress={() => {
              setModalCourt(marker)
              setShowModal(true)
            }}
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
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        onRegionChangeComplete={(region) =>{
          setInitialLocation(region)
        }}
        >
          
        {renderCourtMarkers()}
        <Marker
          pinColor='green'
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude
          }}>

        </Marker>
      </MapView>
      {showModal ? <CourtModal visible={showModal} court={modalCourt} setModalShowable={setShowModal}/> : null}
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
