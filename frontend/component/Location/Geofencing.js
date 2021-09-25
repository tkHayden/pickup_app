import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import React, { useState, useEffect } from 'react';
import { useSocket } from '../SocketProvider'
import LocationTracker from './LocationTracker';

const Geofencing = ({ courts,setCourts,regions,regStatus }) => {
  const [regionStatus, setRegionStatus] = useState(regStatus)

  const socket = useSocket()

  const GEO_LOC = 'GEO_LOC'

  const updateCourt = (title,change) =>{
    const updatedCourts = courts.map(court => court.title === title ? {...court,activeHoopers: court.activeHoopers + change} : court)
    setCourts(updatedCourts)
  }

  const updateRegion = (identifier) =>{
    const updatedRegionStatus = regionStatus.map(reg => reg.identifier === identifier ?{...reg,inside:!reg.inside} : reg)
    setRegionStatus(updatedRegionStatus)
  }

  TaskManager.defineTask(GEO_LOC, ({ data: { eventType, region }, error }) => {

    if (error) {
      // error handling
      return;
    }
    const index = regionStatus.findIndex(element => element.identifier === region.identifier)
    
    //These conditions check for the eventType and whether the region is currently inside the region
    //This prevents the duplication of exit and enter events that have popped up in development
    if (eventType === Location.GeofencingEventType.Enter  && regionStatus[index].inside === false) {
      console.log("You've entered region:", region.identifier);
      socket.emit('hooper:increment', region.identifier)
      updateRegion(region.identifier)
      updateCourt(region.identifier,1)
    } else if (eventType === Location.GeofencingEventType.Exit && regionStatus[index].inside === true) {
      console.log("You've left region:", region.identifier);
      socket.emit('hooper:decrement', region.identifier)
      updateRegion(region.identifier)
      updateCourt(region.identifier,-1)
    }
  })


  useEffect(() => {

    (async () => {
      await Location.startGeofencingAsync(GEO_LOC,regions)
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
