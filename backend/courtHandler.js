const court = require('./models/court')
const Court = require('./models/court')

const orderHandler = (io, socket) => {

    const incrementHooper = async (payload) => {
        console.log(payload, "end")
        try {
            const court = await Court.findOne({ title: payload })
            console.log(court)
            court.activeHoopers = court.activeHoopers + 1
            await Court.updateOne({ title: payload }, court, { new: true })

        }
        catch (error) {
            console.log(error)
        }



    }
    const decrementHooper = async(payload) => {
        try {
            const court = await Court.findOne({ title: payload })
            console.log(court)
            if (court.activeHoopers > 0) {
                court.activeHoopers = court.activeHoopers - 1
            }
            await Court.updateOne({ title: payload }, court, { new: true })

        }
        catch (error) {
            console.log(error)
        }
    }

    socket.on('hooper:increment', incrementHooper)
    socket.on('hooper:decrement', decrementHooper)
}

module.exports = orderHandler