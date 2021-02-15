const express = require('express')
const router = express.Router()
const passport = require('passport')
const { getAllUsers } = require('../controllers/user')

router.use((req, res, next) => {
    console.log(`Request to user ${Date.now()}`)
    next()
})

router.get('/:user', 
passport.authenticate('jwt', {failureFlash:false, session: false}), (req, res) => {
    const refreshToken = req.cookies['refreshToken']
    const { login, _id } = req.user
    if (!login || !_id) {
        return res.status(404).json({error: 'User not found'})
    }
    res.status(200).json({login, _id})
})
// router.get('/all', async (req, res) => {
//     const users = await getAllUsers()
//     res.status(200).json(users)
// })

module.exports = router