const mongoose = require('../db/connection')
const CommentsSchema = new mongoose.Schema({
    episode: {type: String},
    post: {type: String},
    likes:{type: Number, default: 0}
},
{timestamps: true})

const Comments = mongoose.model('comment', CommentsSchema)

module.exports = Comments