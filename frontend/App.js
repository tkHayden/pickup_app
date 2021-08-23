import React,{useEffect,useState} from "react";
import { View, TextInput,Text } from "react-native";
import Map from "./component/Map";
import io from 'socket.io-client'
import Sockett from './component/socket'
const App = () => {
 
  return (
    <View style={{ flex: 1 }}>
      {
         // <Map />
         <Sockett/>
  
        
        }
        
  
    </View>
  );
};

export default App;