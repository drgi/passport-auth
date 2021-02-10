const mongoose = require('mongoose')
const schema = {
    login: String,
    passport: String,
    tokens: Array
}

const userSchema = new mongoose.Schema(schema)

const User = mongoose.model('User', userSchema)
module.exports = User