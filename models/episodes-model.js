const mongoose = require('../db/connection')
const EpisodeSchema = new mongoose.Schema({
    episodeNumber: {type: Number},
    name: {type: String},
    releaseDate: {type: Date},
    img: {type: String},
    summary: {type: String},
    introSong: {type: String},
    outroSong: {type: String},
    comments: [String]
})

const Episode = mongoose.model('episode', EpisodeSchema)

module.exports = Episode