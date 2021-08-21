const { get } = require('../controllers/courts')
const Court = require('../models/court')

const getCourts = async() =>{
    const courts = await Court.find({})
    return courts.map(court => court.toJSON())
}

module.exports = {
    getCourts
}