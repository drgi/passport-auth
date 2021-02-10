const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
    console.log(`Request to auth ${Date.now()}`)
    next()
})

router.get('/', (req, res) => {
    res.status(200).send('Hello')
})

module.exports = router