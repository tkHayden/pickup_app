const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const courtSchema = new mongoose.Schema({
    title: String,
    region: {
        identifier: String,
        latitude: Number,
        longitude: Number,
        radius: Number,
    },
    activeHoopers: Number,
    last_updated: Date
    
})

courtSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
courtSchema.plugin(uniqueValidator)
  
module.exports  = mongoose.model('Court', courtSchema)