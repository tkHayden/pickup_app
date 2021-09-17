import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import React, { useState, useEffect } from 'react';
import { SocketContext } from '../../services/socket'

const Geofencing = ({ courts,setCourts }) => {
  const [regions, setRegions] = useState([])

  const socket = React.useContext(SocketContext)

  const GEO_LOC = 'GEO_LOC'

  const updateCourt = (title,change) =>{
    const updatedCourts = courts.map(court => court.title === title ? {...court,activeHoopers: court.activeHoopers + change} : court)
    setCourts(updatedCourts)
  }

  TaskManager.defineTask(GEO_LOC, ({ data: { eventType, region }, error }) => {
    if (error) {
      // error handling
      return;
    }
    if (eventType === Location.GeofencingEventType.Enter) {
      console.log("You've entered region:", region.identifier);
      socket.emit('hooper:increment', region.identifier)
      updateCourt(region.identifier,1)
    } else if (eventType === Location.GeofencingEventType.Exit) {
      console.log("You've left region:", region.identifier);
      socket.emit('hooper:decrement', region.identifier)
      updateCourt(region.identifier,-1)
    }
  })

  useEffect(() =>{
    const newRegions = courts.map(courts => courts.region)
    setRegions(newRegions.map(region => ({ ...region, state: Location.LocationGeofencingRegionState.Unknown })))
  },[])
  useEffect(() => {
    (async () => {
      await Location.startGeofencingAsync(GEO_LOC, regions)
    })();
    return async () => {
      await Location.stopGeofencingAsync(GEO_LOC)
      console.log('unmount geofencing')
    }
  },[])

  return (
    null
  )

}

export default Geofencing
