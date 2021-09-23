import React,{useState,useEffect} from "react";
import { View } from "react-native";
import Map from "./component/Map";
import SocketProvider from './component/SocketProvider'
import courtService from './services/courts'
import Geofencing from "./component/Location/Geofencing";
import LocationProvider from "./component/LocationProvider";
import LocationTracker from './component/Location/LocationTracker'


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

        <SocketProvider>
        {(regions && test) ? <Geofencing regions={regions} exitReg={test} courts= {courts} setCourts={setCourts}/> : null}
          <LocationProvider>
            <LocationTracker/>
        <Map courts={courts} setCourts={setCourts}/> 
        </LocationProvider>
        </SocketProvider>
    </View>
  );
};

export default App;