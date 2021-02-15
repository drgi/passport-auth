const express = require('express')
const router = express.Router()
const { register, getUserBy } = require('../controllers/user')
const { createTokens, comparePass, findRefToken, removeRefreshToken } = require('../controllers/auth')
const config = require('../config/config')
const passport = require('passport')

router.use((req, res, next) => {
    console.log(`Request to auth ${Date.now()}`)
    next()
})

router.get('/', (req, res) => {
    return res.status(200).send('Hello')
})
// Register route
router.post('/register', async (req, res) => {
    const {login, password} = req.body
    if (!login || !password) {
        return res.status(204).json({message: 'No User/Password'})
    }
    const result = await register(login, password)
    if (!result.status) {
        return res.status(400).json({error: result.error})
    }
    if (result.status) {
        const {token, refreshToken} = await createTokens(result.user._id)
        return res.status(201).json({user: result.user, token, refreshToken})

    }
    

})
 router.post('/login', async (req, res) => {
     console.log(req.body)
    const {login, password} = req.body
    if (!login || !password) {
        return res.status(400).json({error: 'Invalid fields'})
    }
    const user = await getUserBy(login)
    if (!user) {
        return res.status(404).json({error: 'User not found'})
    }
    if (!comparePass(password, user.password)){
        return res.status(401).json({error: 'Invalid password'})
    }
    const {token, refreshToken} = await createTokens(user._id)
    const resp = {_id: user._id, login: user.login, token, refreshToken}
    //Set cookie with refresh Token
    res.cookie('refreshToken', refreshToken, {
        maxAge: 99999999,
        httpOnly: true,
        secure: false
    })
    return res.status(200).json(resp)
 })
router.post('/refreshtoken', async (req, res) => {
    const refreshToken = req.cookies['refreshToken']
    console.log(refreshToken)
   
    if (!refreshToken) {
        return res.status(400).json({error: 'Invalid fields'})
    }
    const user = await findRefToken(refreshToken)    
    if (!user) {
        return res.status(404).json({error: 'Invalid refreshToken'})
    }
    await removeRefreshToken(refreshToken, user)
    const result = await createTokens(user._id)
    res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        maxAge: 99999999
    })
    return res.status(200).json({token: result.token, expired: config.tokenExpires})
})
router.post('/logout', passport.authenticate('jwt', {failureFlash:false, session: false}), async (req, res) => {
    const refreshToken = req.cookies['refreshToken']
    const user = req.user
    if (!refreshToken) {return res.status(400).json({error: 'Invalid fields'})}
    await removeRefreshToken(refreshToken, user)
    res.cookie('refreshToken', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    return res.status(200).json({message: 'Logout'})
})
router.post('/logoutall', passport.authenticate('jwt', {failureFlash:false, session: false}), async (req, res) => {
    const user = req.user
    user.tokens = []
    await user.save()
    return res.status(200).json({message: 'Logout all'})
})
module.exports = router