const courtRouter = require('express').Router()
const { findById } = require('../models/court')
const Court = require('../models/court')

courtRouter.get('/', async(request,response) => {
    const courts = await Court.find({})
    response.json(courts)
})

courtRouter.get('/:id', async(request,response) =>{
    const court = await Court.findById(request.params.id)

    if (court){
        response.json(court)
    }else{
        response.status(404).end()
    }
})

courtRouter.put('/:id', async(request,response) => {
    const currentCourt = request.body
    let updatedHoopers = 0
    //check to add or remove user from activeHoopers
    if(currentCourt.increment === true){
        updatedHoopers = 1
    } else{
        updatedHoopers = -1
    }
    const courtFromDB= await Court.findById(request.params.id)
    currentCourt.last_updated = new Date()
    console.log(currentCourt.last_updated)
    //check to see if currentCourt is up to date with the one in the database
    if(courtFromDB.last_updated.getTime() > currentCourt.last_updated.getTime()){
        updatedHoopers += courtFromDB.activeHoopers
    }else{
        updatedHoopers += currentCourt.activeHoopers
        console.log('here')
    }

    currentCourt.activeHoopers = updatedHoopers
    currentCourt.last_updated = new Date()
    const updatedCourt = await Court.findByIdAndUpdate(request.params.id, currentCourt, { new: true })
    response.json(updatedCourt)


})

courtRouter.post('/', async(request,response) => {
    const body = request.body

    const newCourt = Court ({
        title: body.title,
        region: {
            identifier: body.region.identifier,
            latitude: body.region.latitude,
            longitude: body. region.longitude,
            radius: body.region.radius
        },
        activeHoopers: body.region.activeHoopers,
        last_updated: new Date()
    })
    const savedCourt = await newCourt.save()
    response.status(201).json(savedCourt)
})

module.exports = courtRouter