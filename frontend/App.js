import React from "react";
import { View } from "react-native";
import Map from "./component/Map";
import {socket,SocketContext } from './services/socket'

const App = () => {

  return (
    <View style={{ flex: 1 }}>
      
        <SocketContext.Provider value={socket} >
          <Map/>
        </SocketContext.Provider>
    </View>
  );
};

export default App;