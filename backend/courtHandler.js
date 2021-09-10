const Court = require('./models/court')

const orderHandler =(io, socket) =>{

    const incrementHooper =  (payload) =>{
        console.log(payload)
        Court.findOne({title: payload}).then(test =>{
            //testing purposes
            console.log(test)
        })
        .catch(error =>{
            console.log(error)
        })


    }
    const decrementHooper = (payload) => {
        Court.findOne({title: payload}).then(test =>{
            //testing purposes
            console.log(test)
        })
        .catch(error =>{
            console.log(error)
        })
    }

    socket.on('hooper:increment',incrementHooper)
    socket.on('hooper:increment',decrementHooper)
}

module.exports = orderHandler