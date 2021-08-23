const orderHandler =(io, socket) =>{

    const createCourt = (payload) =>{
        console.log(payload)
        const mess = "success"
        io.emit('message',mess)

    }
    socket.on('court:create',createCourt)
}

module.exports = orderHandler