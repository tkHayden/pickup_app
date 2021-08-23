import React,{useEffect,useState} from "react";
import { View, TextInput,Text } from "react-native";
import io from 'socket.io-client'
const Socket = () => {
    const [message,setMessage] = useState('')
    const [socket,setSocket] = useState(io())
    useEffect(  () =>{    
        const newSocket =  io('http://192.168.1.13:3001')
        setSocket(newSocket)
        
        return () => {
            disconnectSocket();
          }
    },[])

    const disconnectSocket = () =>{
        console.log('Disconnecting socket...');
        if(socket) socket.disconnect();
      }
    
    const submitMessage = () =>{
      console.log(message)
    
      socket.emit('court:create', message)
      setMessage('')
      listenn()
    }
    const listenn = () =>{   
        socket.on('message',(payload)=>{
            console.log('worked')
        })    
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