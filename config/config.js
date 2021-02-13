const config = require('rc')

module.exports = config('AUTH', {
    port: process.env.PORT || 3000,
    dbUrl : 'mongodb+srv://admin:3946646@cluster0.xdfdb.mongodb.net/users?retryWrites=true&w=majority',
    secret: 'Zalupa',
    tokenExpires: '1h'

})