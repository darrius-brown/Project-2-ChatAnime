const mongoose = require('../db/connection')
const CommentsSchema = new mongoose.Schema({
    episode: {type: Number},
    post: {type: String},
    likes:{type: Number}
},
{timestamps: true})

const Comments = mongoose.model('comment', CommentsSchema)

module.exports = Comments