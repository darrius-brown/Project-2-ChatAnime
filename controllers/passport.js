const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function init(passport, getByEmail, getById) {
    const authenticateUser = (username, password, done) => {
        const user = getByEmail(username)
        if (user == null) {
            return done(null, false, {message: 'username not found'})
        }

        if(bcrypt.compare(password, user.password)) {
            return done(null, user)
        } else{
            return done(null, false, {message: "Password Incorrect"})
        }

    }
    passport.use(new localStrategy({usernameField: 'username'},
    authenticateUser))
    passport.serializeUser((username, done) => { 
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => { 
        return done(null, getById(id))
    })
}

module.exports =  init