import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import React, { useState, useEffect } from 'react';
import { SocketContext } from '../../services/socket'

const Geofencing = ({ courts,setCourts,regions,exitReg }) => {
  const [regionExits, setRegionExits] = useState(exitReg)

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
    const index = regionExits.findIndex(element => element.identifier === region.identifier)
    
    //These conditions check for the evenType and whether the region has  performed its initial exit/enter
    //This is needed since expo-location library  has the behavoir of triggering the exit event for each
    //region upon startup and if the user is inside a region, it will trigger the enter event twice.
    //This work around ignores the initial exit event and duplicat enter event
    if (eventType === Location.GeofencingEventType.Enter  && regionExits[index].exit === true) {
      console.log("You've entered region:", region.identifier);
      socket.emit('hooper:increment', region.identifier)
      updateCourt(region.identifier,1)
    } else if (eventType === Location.GeofencingEventType.Exit && regionExits[index].exit === true) {
      console.log("You've left region:", region.identifier);
      socket.emit('hooper:decrement', region.identifier)
      updateCourt(region.identifier,-1)
    }
    if(regionExits[index].exit === false){
      const newExits = regionExits.map(reg => reg.identifier === region.identifier ?{...reg,exit:true} : reg)
      console.log(index)
      setRegionExits(newExits)
    }
  })


  useEffect(() => {
    (async () => {
      console.log('mounted')
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
