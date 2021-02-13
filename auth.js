const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const User = require('./model/user')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { getUserById } = require('./controllers/user')
const config = require('./config/config');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret
}
function initPassport() {
    passport.use(new JwtStrategy(options, async function(jwtPayload, done) {       
       try {
         const user = await getUserById(jwtPayload._id)
            if (!user) {return done(null, false, {error: 'User not found'}) }
            return done(null, user)   
       } catch(err) {
           console.log('Auth or DB error', err)
            return done(err) }
       
    }))
    passport.use(new LocalStrategy(
        {usernameField: 'login', passwordField: 'password'}, 
        function(login, password, done){
            console.log('Passport:' , login, password)
            const user = User.find({login})
            return done(null, user)
        }))
        
}
module.exports = {initPassport}    