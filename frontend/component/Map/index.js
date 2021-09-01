
import React, { useState, useEffect, useRef } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
 import MapView, {Marker} from "react-native-maps";
import io from 'socket.io-client'
import courtService from '../../services/courts'
import {SocketContext} from '../../socket'

export default function Map() {
  const [location, setLocation] = useState(null);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [courts,setCourts] = useState(null)

  const socket = React.useContext(SocketContext)

  const region = [{
    identifier: 'SBHS',
    latitude: 34.42961630772183,
    longitude: -119.69758047820534,
    radius: 200,
    notifyOnEnter: true,
    notifyOnExit: true,
    state: Location.GeofencingRegionState.Outside
    
  },{
    identifier: 'marymou',
    latitude: 34.72961630772183,
    longitude: -119.59758047820534,
    radius: 200,
    notifyOnEnter: true,
    notifyOnExit: true,
    state: Location.GeofencingRegionState.Outside
    
  }]

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
      socket.emit('court:create',region.identifier)

    } 
    if (eventType === Location.GeofencingEventType.Exit) {
      console.log("You've left region:", region.identifier);
      socket.emit('court:create','left')
    }
  });
  useEffect(() =>{
    (async () => {
      const newCourts = await courtService.fetchCourts()
       setCourts(newCourts)
     
    })()
  },[])
  useEffect(() => {
    (async () => {

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
        Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)
      }
      const valued = await Location.hasStartedGeofencingAsync(GEO_LOC)
      if (valued) {
        Location.stopGeofencingAsync(GEO_LOC)
      }
    
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.BestForNavigation,
      timeInterval: 10000,
      foregroundService: {
        notificationTitle: "App Name",
        notificationBody: "Location is used when App is in background",
      },
      activityType: Location.ActivityType.AutomotiveNavigation,
      showsBackgroundLocationIndicator: true,
    });
    await Location.startGeofencingAsync(GEO_LOC,region)

    })();
  }, []);

  const disconnectSocket = () =>{
    console.log('Disconnecting socket...');
    if(socket) socket.disconnect();
  }

  const renderMapMarkers = () =>{
    if (courts){
      return(
        courts.map((marker,index) =>(
          <Marker
          key = {index}
          coordinate ={{
            latitude: marker.region.latitude,
            longitude: marker.region.longitude
          }}
          >
           
        </Marker>
      )
        )
      )
    }
    return(
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
            { renderMapMarkers()}
            <Marker
            pinColor= 'green'
            coordinate={{
              latitude:latitude,
              longitude:longitude
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
