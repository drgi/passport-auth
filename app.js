const express = require('express');
const PORT = 3000
const app = express();
//Config
const config = require('./config/config')

//Routes
const userRoute = require('./router/user');
const authRoute = require('./router/auth');

//Db mongo
require('./db')

//Passport
const passport = require('passport');
const {initPassport} = require('./auth')
initPassport(app)

function createApp() {
    app.use(express.json())
    // app.use(passport.initialize());
    // app.use(passport.session());
    app.use('/auth', authRoute)
    app.use('/', express.static('public'))
    app.use('/user', userRoute)
    
    return app
}
if (!module.parent) {
    createApp().listen(config.port, () => {
        console.log(`Server start at ${PORT}`)
    })
}
module.exports = createApp