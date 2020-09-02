const {model, Schema, ObjectId} = require('mongoose')


const validateEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return regex.test(email)
}

const UserSchema = new Schema({
    name: {type: String, required: [true, 'Name is required'], min: 2, max: 10},
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, {message: 'Please fill a valid email address'}],
        validate: [validateEmail, {message: 'Please fill a valid email address'}],
        index: true,
        trim: true
    },
    password: {type: String, required: [true, 'Password is required, min 4 length'], min: 4, max: 15},
    date: {type: Date, default: Date.now}
})

module.exports = model('User', UserSchema)