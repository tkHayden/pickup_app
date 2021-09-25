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
const[ regionsStatus,setRegionsStatus]= useState(null)


useEffect(() => {
  (async () => {
    const newCourts = await courtService.fetchCourts()
    setCourts(newCourts)
    setRegions(newCourts.map(court => (court.region)))
    const initialRegionStatus = newCourts.map(re => ({identifier:re.region.identifier,inside:false}))
    setRegionsStatus(initialRegionStatus)

  })()
}, [])

  return (
    <View style={{ flex: 1 }}>

        <SocketProvider>
        {(regions && regionsStatus) ? <Geofencing regions={regions} regStatus={regionsStatus} courts= {courts} setCourts={setCourts}/> : null}
          <LocationProvider>
            <LocationTracker/>
        <Map courts={courts} setCourts={setCourts}/> 
        </LocationProvider>
        </SocketProvider>
    </View>
  );
};

export default App;