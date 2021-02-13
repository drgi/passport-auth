const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function comparePass(password, hash) {
    return bcrypt.compareSync(password, hash)
}
async function createTokens(userId) {
    const user = await User.findById(userId)
    const token = jwt.sign({_id: userId}, config.secret, {expiresIn: config.tokenExpires})
    const refreshToken = jwt.sign({_id: userId}, config.secret)
    user.tokens.push(refreshToken)
    await user.save()
    return {token, refreshToken}
}

async function findRefToken(refreshToken) {
    const user = await User.findOne({tokens: refreshToken})
    if (!user) {
        return null
    }
    return user
}

async function removeRefreshToken(refreshToken, user) {
    user.tokens = user.tokens.filter(token => token !== refreshToken)
    await user.save()
    return user
}
module.exports = {
    comparePass,
    createTokens,
    findRefToken,
    removeRefreshToken
}