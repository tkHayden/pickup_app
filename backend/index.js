const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const server = http.createServer(app)
const {Server}= require('socket.io')
const io = new Server(server);

const orderHandler = require('./courtHandler')


const onConnection = (socket) =>{
    console.log('user connected!')
    orderHandler(io,socket)
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
}
io.on('connection',onConnection)
server.listen(config.PORT, () =>{
    logger.info(`Server is running on port ${config.PORT}`)
})