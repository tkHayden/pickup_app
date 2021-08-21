const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const helper = require('./testhelper')
const Court = require('../models/court')

beforeAll (async() =>{
    await Court.deleteMany({})
  })

describe("Court creation testing", () => {
    test('Create a new court', async() =>{
        const newCourt = {
            "title": "Santa Barbara High School",
            "region" : {
                "identifier": "Santa Barbara High School",
                "latitude": 34.42961630772183,
                "longitude": -119.69758047820534,
                "radius": 200
            },
            "activeHoopers": 0
        }
        await api
            .post('/api/courts')
            .send(newCourt)
            .expect(201)
        const courts = await helper.getCourts()
        expect(courts.length).toBe(1)
        const courtNames = courts.map(court => court.title)
        expect(courtNames).toContain("Santa Barbara High School")
    })
})

describe('Get courts request testing', () =>{
    test('Get all courts', async() =>{
        const response = await api
            .get('/api/courts')
            .expect(200)
        expect(response.body.length).toBe(1)
    })
    test('Get specific court', async() =>{
        const courts = await helper.getCourts()
        const courtIDs = courts.map(court => court.id.toString())
        const response = await api
            .get(`/api/courts/${courtIDs[0]}`)
            .expect(200)
        expect(response.body.title).toBe("Santa Barbara High School")
    })
})
describe('PUT request testing', () => {
    test("incrmenting the activeHooper", async () =>{
        const courts = await helper.getCourts()
        const courtIDs = courts.map(court => court.id.toString())
        const updatedCourt = {
            "title": "Santa Barbara High School",
            "region" : {
                "identifier": "Santa Barbara High School",
                "latitude": 34.42961630772183,
                "longitude": -119.69758047820534,
                "radius": 200
            },
            "activeHoopers": 3,
            "increment": true,
            "last_updated": ""
        }
        await api
            .put(`/api/courts/${courtIDs[0]}`)
            .send(updatedCourt)
            .expect(200)
        const courtsAfter = await helper.getCourts()
        expect(courtsAfter[0].activeHoopers).toBe(4)
    })
    test("decrementing the activeHooper", async () =>{
        const courts = await helper.getCourts()
        const courtIDs = courts.map(court => court.id.toString())
        const updatedCourt = {
            "title": "Santa Barbara High School",
            "region" : {
                "identifier": "Santa Barbara High School",
                "latitude": 34.42961630772183,
                "longitude": -119.69758047820534,
                "radius": 200
            },
            "activeHoopers": 3,
            "increment": false,
            "last_updated": ""
        }
        await api
            .put(`/api/courts/${courtIDs[0]}`)
            .send(updatedCourt)
            .expect(200)
        const courtsAfter = await helper.getCourts()
        expect(courtsAfter[0].activeHoopers).toBe(2)
    })
})

  afterAll(() => {
    mongoose.connection.close()
  }) 