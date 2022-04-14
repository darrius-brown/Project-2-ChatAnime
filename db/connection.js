const mongoose = require('mongoose')
const mongoURI = 
    process.env.NODE_ENV === 'production'
    ? process.env.DB_URL
    : 'mongodb+srv://darriusabrown:tostadasalad15@cluster0.fjb0k.mongodb.net/chatanime?retryWrites=true&w=majority'

    mongoose.connect(mongoURI)
    .then(instance => console.log(`Connected to: ${instance.connections[0].name}`))
    .catch(error => {
        console.log('failed connection:', error)
    })

    module.exports = mongoose