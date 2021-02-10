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

function createApp() {
    app.use('/user', userRoute)
    app.use('/auth', authRoute)
    return app
}
if (!module.parent) {
    createApp().listen(config.port, () => {
        console.log(`Server start at ${PORT}`)
    })
}
module.exports = createApp