const User = require('../model/user')
const bcrypt = require('bcryptjs')

async function getAllUsers() {
   const users = await User.find({})
   return users 
} 
async function register(login, password) {
    const user = await User.find({login})
    if (user.length !== 0) {
        return {status: false, error: 'User is already registred'}
    }
    const newUser = new User({login, password: bcrypt.hashSync(password)})
    await newUser.save()
    return {status: true, message: 'User is registred', user: {_id: newUser._id, login: newUser.login}}
}
async function getUserBy(login) {
    return await User.findOne({login})
}
async function getUserById(userId) {
    return await User.findById(userId)
}
module.exports = {
    getAllUsers,
    register,
    getUserBy,
    getUserById
}