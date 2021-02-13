const mongoose = require('mongoose')
const schema = {
    login: String,
    password: String,
    tokens: {
        type: Array,
        default: []
    }
}

const userSchema = new mongoose.Schema(schema)

const User = mongoose.model('User', userSchema)
module.exports = User