const express = require('express')
const app = express()
const methodOverride = require('method-override')
const cors = require('cors')
const EpisodesControllers = require('./controllers/controller')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'))
app.set("view engine", "ejs")
app.use('', EpisodesControllers)

const port = process.env.PORT || 3003
app.listen(port, () => {
    console.log(`Express MVC app is running on ${port}`)
})