const express = require('express');
const path = require('path')
const PORT = 3000
const app = express();
const cookieParser = require('cookie-parser')
//Config
const config = require('./config/config')

//Routes
const userRoute = require('./router/user');
const authRoute = require('./router/auth');
const frontend = require('./router/frontend')

//Db mongo
require('./db')

//Passport
const passport = require('passport');
const {initPassport} = require('./auth')
initPassport(app)

function createApp() {
    app.set('view engine', 'ejs')
    app.set('views', path.resolve(__dirname, 'templates'))
    app.use(cookieParser())
    app.use(express.json())
    app.use(express.static(path.resolve(__dirname, 'static')))
    // app.use(passport.initialize());
    // app.use(passport.session());
    app.use('/', frontend)
    app.use('/api/auth', authRoute)
    app.use('/api/user', userRoute)
    
    return app
}
if (!module.parent) {
    createApp().listen(config.port, () => {
        console.log(`Server start at ${PORT}`)
    })
}
module.exports = createApp