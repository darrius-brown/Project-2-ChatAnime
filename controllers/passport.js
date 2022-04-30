const localStrategy = require('passport-local').Strategy

function initialize(passport, getUserByUsername, getUserById) {
    const authenticateUser = async (username, password, done) => {
        const user = getUserByUsername(username)
        if (user == null) {
            return done(null, false, { message: 'username not found...' })
        }
        try {
            if (await bcrypt.compare(password, user.password)) {

                return done(null, user)
            } else {
                return done(null, false, { message: "Password Incorrect" })
            }
        } catch (e) {
            return done(e)
        }
    }
    passport.use(new localStrategy({ usernameField: 'username' },
        authenticateUser))
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}

module.exports = initialize