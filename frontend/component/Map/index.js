
import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
 import MapView, {Marker} from "react-native-maps";
import { LocationGeofencingEventType, LocationGeofencingRegionState } from 'expo-location';
import Geo from '../services/location'

export default function Map() {
  const [location, setLocation] = useState(null);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);

  const region = [{
    identifier: 'SBHS',
    latitude: 34.42961630772183,
    longitude: -119.69758047820534,
    radius: 200,
    notifyOnEnter: true,
    notifyOnExit: false,
    state: Location.GeofencingRegionState.Outside
    
  }]

  // const LOCATION_TASK_NAME = 'background-location-task';
  // const GEO_LOC = 'GEO_LOC'

  // TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  //   if (error) {
  //     console.log(error);
  //     return;
  //   }
  //   if (data) {
  //     const { locations } = data;
  //     console.log(locations[0].coords)
  //     setLatitude(locations[0].coords.latitude)
  //     setLongitude(locations[0].coords.longitude)
  //   }
  // });
  const SBHS = [{
    lat: 34.42961630772183,
    long: -119.69758047820534
  },{
  lat:latitude,
  long: longitude
  }]

  // TaskManager.defineTask(GEO_LOC, ({ data: { eventType, region }, error }) => {
  //   if (error) {
  //     // check `error.message` for more details.
  //     return;
  //   }
  //   if (eventType === Location.GeofencingEventType.Enter) {
  //     console.log("You've entered region:", region);
  //   } else if (eventType === Location.GeofencingEventType.Exit) {
  //     console.log("You've left region:", region);
  //   }
  // });
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

    // if (!bgGranted) {
    //   return Alert.alert(
    //     "Location Access Required",
    //     "App requires location even when the App is backgrounded."
    //   );
    // }

    // const value = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME)
    //   if (value) {
    //     Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)
    //   }
    
    // await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    //   accuracy: Location.Accuracy.BestForNavigation,
    //   timeInterval: 10000,
    //   foregroundService: {
    //     notificationTitle: "App Name",
    //     notificationBody: "Location is used when App is in background",
    //   },
    //   activityType: Location.ActivityType.AutomotiveNavigation,
    //   showsBackgroundLocationIndicator: true,
    // });
    // await Location.startGeofencingAsync(GEO_LOC,region)

    })();
  }, []);

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
            {SBHS.map((marker,index) =>(
              <Marker
              key = {index}
              coordinate ={{
                latitude: marker.lat,
                longitude: marker.long
              }}
              >
               
            </Marker>
            ))}
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
