const {model, Schema, ObjectId} = require('mongoose')


const ContactSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'user'
    },
    name: {type: String, required: true},
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {type: String},
    type: {
      type: String,
      default: 'personal'
    },
    date: {type: Date, default: Date.now},
})

module.exports = model('Contact', ContactSchema)