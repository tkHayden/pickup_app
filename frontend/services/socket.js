import io from 'socket.io-client'
import React from 'react'

export const socket =  io('http://192.168.1.13:3001')

export const SocketContext = React.createContext();