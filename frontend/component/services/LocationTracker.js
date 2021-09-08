import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import React,{useState,useEffect} from 'react';
import { SocketContext } from '../../socket'

const LocationTracker = ({setLatitude,setLongitude,courts}) =>{

  const [regions, setRegions] = useState([])

  const socket = React.useContext(SocketContext)

    const LOCATION_TASK_NAME = 'background-location-task';
    const GEO_LOC = 'GEO_LOC'

    TaskManager.defineTask(GEO_LOC, ({ data: { eventType, region }, error }) => {
      if (error) {
        // check `error.message` for more details.
        return;
      }
      if (eventType === Location.GeofencingEventType.Enter) {
        console.log("You've entered region:", region.identifier);
        socket.emit('hooper:increment',region.identifier)
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
        const newRegions = courts.map(court => court.region)
        setRegions(newRegions.map(region => ({...region,state: Location.LocationGeofencingRegionState.Outside})))
        if(regions.length >0){
          console.log('got here')
        await Location.startGeofencingAsync(GEO_LOC, regions)
        }
      })();
      return async () => {
        await Location.stopGeofencingAsync(GEO_LOC)
      }
    }, []);



  return(
    null
  )
}
export default LocationTracker