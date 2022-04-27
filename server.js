if(process.env.NODE_ENV !== "production") {
require('dotenv').config()}
const express = require('express')
const app = express()
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const layout = require('express-ejs-layouts')
const passport = require('passport')
 
const controllers = require('./controllers/controller')


app.use(session({
secret: process.env.SECRET,
resave: false,
saveUninitialized: false}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.set("view engine", "ejs")
app.use(layout)
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('', controllers)

const port = process.env.PORT || 3003
app.listen(port, () => {
    console.log(`Express MVC app is running on ${port}`)
})