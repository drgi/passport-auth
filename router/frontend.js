const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index')
})
router.get('/register', (req, res) => {
    res.render('index')
})
router.get('/profile', (req, res) => {
    res.render('index')
})
module.exports = router