import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import React,{useState} from 'react';

const location = (setLatitude,setLongitude) =>{

    const LOCATION_TASK_NAME = 'background-location-task';
    const GEO_LOC = 'GEO_LOC'

    const region = [{
        identifier: 'SBHS',
        latitude: 34.42961630772183,
        longitude: -119.69758047820534,
        radius: 200,
        notifyOnEnter: true,
        notifyOnExit: false,
        state: Location.GeofencingRegionState.Outside
        
      }]

const track = async() =>{
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

}


  TaskManager.defineTask(GEO_LOC, ({ data: { eventType, region }, error }) => {
    if (error) {
      // check `error.message` for more details.
      return;
    }
    if (eventType === Location.GeofencingEventType.Enter) {
      console.log("You've entered region:", region);
    } else if (eventType === Location.GeofencingEventType.Exit) {
      console.log("You've left region:", region);
    }
  });

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
}
export default location