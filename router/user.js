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
    
    res.status(200).send('Hello')
})
// router.get('/all', async (req, res) => {
//     const users = await getAllUsers()
//     res.status(200).json(users)
// })

module.exports = router