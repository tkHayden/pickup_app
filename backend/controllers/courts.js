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