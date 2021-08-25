import React,{useEffect,useState,useRef} from "react";
import { View, TextInput,Text } from "react-native";
import io from 'socket.io-client'
const Socket = () => {
    const [message,setMessage] = useState('')
    const socket = useRef()

    
    useEffect(  () =>{    
        socket.current = io('http://192.168.1.13:3001')
        socket.current.on('message', (payload) =>{
          console.log(payload)
        })
        
        return () => {
            disconnectSocket();
          }
    },[])

    const disconnectSocket = () =>{
        console.log('Disconnecting socket...');
        if(socket.current){ 
          socket.current.disconnect();
        }
      }
    
    const submitMessage = () =>{
      console.log(message)
    
      socket.current.emit('court:create', message)
      setMessage('')
  
    }

    
    return(
        <View>
        <TextInput 
        style= {{height:40, borderWidth:2, marginTop: 6}}
        value ={message} 
        onSubmitEditing = { () => submitMessage()}
        onChangeText={chatMessage =>{
         setMessage(chatMessage)}}/>
         </View>
 )
       }
    

export default Socket