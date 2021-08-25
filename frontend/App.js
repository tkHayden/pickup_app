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
  
>>>>>>> 7c3f64c (Moved geo-fencing and background location to seperate file)
        
        
  
    </View>
  );
};

export default App;