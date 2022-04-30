if (process.env.NODE_ENV !== "production") {
  require('dotenv').config()
}
const flash = require('connect-flash')
const localStrategy = require('passport-local')
const express = require('express')
const app = express()
const session = require('express-session')
const methodOverride = require('method-override')
const layout = require('express-ejs-layouts')
const passport = require('passport')
const controllers = require('./controllers/controller')
const userControllers = require('./controllers/users')
const Users = require('./models/users-model')
const sessionConfig = {
  secret: "this is the secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(session(sessionConfig))
app.use(flash())
app.use((req, res, next) => {
  res.locals.currentUser = res.user
  res.locals.success = req.flash("success")
  res.locals.error = req.flash('error')
  next()
})
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());
app.use(methodOverride('_method'));
app.use(layout)
app.use(express.json())
app.use('/', controllers)
app.use('/user', userControllers)

const port = process.env.PORT || 3003
app.listen(port, () => {
  console.log(`Express MVC app is running on ${port}`)
})