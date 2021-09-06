const Court = require('./models/court')

const orderHandler =(io, socket) =>{

    const incrementHooper =  (payload) =>{
        console.log(payload)
        Court.findOne({title: payload}).then(test =>{
            console.log(test)
            io.emit('message',test)
        })
        .catch(error =>{
            console.log(error)
        })


    }
    socket.on('hooper:increment',incrementHooper)
}

module.exports = orderHandler