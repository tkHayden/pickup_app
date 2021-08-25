
import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import MapView, { Marker } from "react-native-maps";
import courtService from '../../services/courts'
import { SocketContext } from '../../socket'

export default function Map() {
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [courts, setCourts] = useState(null)
  const [regions, setRegions] = useState([])

  const socket = React.useContext(SocketContext)

  
  const LOCATION_TASK_NAME = 'background-location-task';
  const GEO_LOC = 'GEO_LOC'

 

  TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
      console.log(error);
      return;
    }
    if (data) {
      const { locations } = data;
      console.log(locations[0].coords)
      setLatitude(locations[0].coords.latitude)
      setLongitude(locations[0].coords.longitude)
    }
  });


  TaskManager.defineTask(GEO_LOC, ({ data: { eventType, region }, error }) => {
    if (error) {
      // check `error.message` for more details.
      return;
    }
    if (eventType === Location.GeofencingEventType.Enter) {
      console.log("You've entered region:", region.identifier);
      socket.emit('hooper:increment', region.identifier)

    }
    if (eventType === Location.GeofencingEventType.Exit) {
      
        console.log("You've left region:", region.state);
        socket.emit('hooper:decrement', region.identifier)
    
    }
  })
  useEffect(() => {
    (async () => {
      const newCourts = await courtService.fetchCourts()
      setCourts(newCourts)
      const newRegions = newCourts.map(court => (court.region))
      setRegions(newRegions)

    })()
  }, [])
  useEffect(() => {
    (async () => {
      await Geo({setLatitude,setLongitude})
    //   const { granted: fgGranted } =
    //   await Location.requestForegroundPermissionsAsync();
    // if (!fgGranted) {
    //   return Alert.alert("Required", "Please grant GPS Location");
    // }
    // const { granted: bgGranted } =
    //   await Location.requestBackgroundPermissionsAsync();

      const { granted: fgGranted } =
        await Location.requestForegroundPermissionsAsync();
      if (!fgGranted) {
        return Alert.alert("Required", "Please grant GPS Location");
      }
      const { granted: bgGranted } =
        await Location.requestBackgroundPermissionsAsync();

      if (!bgGranted) {
        return Alert.alert(
          "Location Access Required",
          "App requires location even when the App is backgrounded."
        );
      }

      const value = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME)
      if (value) {
        await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)
      }

      const started = await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 10000,
        foregroundService: {
          notificationTitle: "App Name",
          notificationBody: "Location is used when App is in background",
        },
        activityType: Location.ActivityType.Other,
        showsBackgroundLocationIndicator: true,
      });



    })();
    return async () => {
      console.log('unmount location update')
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)

    }
  }, []);

  useEffect(() => {
    (async () => {
      if(regions.length > 0){
      await Location.startGeofencingAsync(GEO_LOC, regions)
      }

    })();
    return async () => {
      await Location.stopGeofencingAsync(GEO_LOC)
    }
  }, []);


  const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if (socket) socket.disconnect();
  }

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

  return (
    <View style={{ flex: 1 }}>
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
