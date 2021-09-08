import React,{useEffect,useState} from "react";
import { View, TextInput,Text } from "react-native";
import Map from "./component/Map";
import {socket,SocketContext } from './socket'
import io from 'socket.io-client'

const App = () => {

  return (
    <View style={{ flex: 1 }}>
<<<<<<< HEAD
      
        <SocketContext.Provider value={socket} >
          <Map/>
        </SocketContext.Provider>
        
=======
      {
          <Map />
         //<Sockett/>
  
>>>>>>> 7c3f64c1bd703b3f8eb61cedee5569765c477d7a
        
        
  
    </View>
  );
};

export default App;