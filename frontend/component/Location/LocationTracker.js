import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import React, { useEffect } from 'react';
import {useLocationUpdate} from '../LocationProvider'


const LocationTracker = ({ setLatitude, setLongitude }) => {

  const BACKGROUND_LOCATION = 'background-location-task';

  const updateLocation = useLocationUpdate()

  TaskManager.defineTask(BACKGROUND_LOCATION, ({ data, error }) => {
    if (error) {
      console.log(error);
      return;
    }
    if (data) {
      const { locations } = data;
      console.log(locations[0].coords.latitude,locations[0].coords.longitude)
      updateLocation({latitude: locations[0].coords.latitude, longitude:locations[0].coords.longitude })
    }
  });

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


      const started = await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION, {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 10000,
        foregroundService: {
          notificationTitle: "App Name",
          notificationBody: "Location is used when App is in background",
        },
        activityType: Location.ActivityType.Other,
        showsBackgroundLocationIndicator: true,
      })

    })()
    return async () => {
      console.log('unmount location update')
      await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION)
    }
  }, [])

  return (
    null
  )
}
export default LocationTracker