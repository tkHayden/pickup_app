import io from 'socket.io-client'
import React ,{useContext, useEffect, useState} from 'react'

const SocketContext = React.createContext()

export const useSocket = () => {
  return useContext(SocketContext)
}

const SocketProvider = ({children}) => {
  const [socket,setSocket] = useState()

  useEffect(() => {
    const newSocket = io('http://192.168.1.13:3001')

    setSocket(newSocket)
    return () => newSocket.close
  },[])

  return(
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider