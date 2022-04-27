const mongoose = require('../db/connection')
const UsersSchema = new mongoose.Schema({
    name: {type: String},
    username: {type: String},
    password:{type: String }
},
{timestamps: true})

const Users = mongoose.model('user', UsersSchema)

module.exports = Users