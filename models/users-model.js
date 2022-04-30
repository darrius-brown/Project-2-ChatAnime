const mongoose = require('../db/connection')
const passportLocalMongoose = require('passport-local-mongoose')
const UsersSchema = new mongoose.Schema({
    name: {type: String},
    username: {type: String},
    password:{type: String }
},
{timestamps: true})
UsersSchema.plugin(passportLocalMongoose)
const Users = mongoose.model('user', UsersSchema)

module.exports = Users