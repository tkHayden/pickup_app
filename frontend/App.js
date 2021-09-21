import React,{useState,useEffect} from "react";
import { View } from "react-native";
import Map from "./component/Map";
import {socket,SocketContext } from './services/socket'
import courtService from './services/courts'
import Geofencing from "./component/Location/Geofencing";


const App = () => {
  const [courts, setCourts] = useState(null)
const [regions,setRegions]= useState(null)
const[ test,setTest]= useState(null)


useEffect(() => {
  (async () => {
    const newCourts = await courtService.fetchCourts()
    setCourts(newCourts)
    setRegions(newCourts.map(court => (court.region)))
    const initialRegionExits = newCourts.map(re => ({identifier:re.region.identifier,exit:false}))
    setTest(initialRegionExits)

  })()
}, [])

  return (
    <View style={{ flex: 1 }}>
      
        <SocketContext.Provider value={socket} >
        {(regions && test) ? <Geofencing regions={regions} exitReg={test} courts= {courts} setCourts={setCourts}/> : null}
        <Map courts={courts} setCourts={setCourts}/> 
        </SocketContext.Provider>
    </View>
  );
};

export default App;