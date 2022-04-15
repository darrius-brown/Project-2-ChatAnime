const Episode = require('../models/episodes-model')
const Comments = require('../models/comments-model')
const episodeData = require('./episodes.json')
const commentsData = require('./comments.json')

Episode.deleteMany({})
    .then(() => {
        return Episode.insertMany(episodeData)
    })
    .then(console.log)
    .catch(console.error)
    .finally(() => {
        process.exit()
    })

Comments.deleteMany({})
    .then(() => {
        return Comments.insertMany(commentsData)
    })
    .then(console.log)
    .catch(console.error)
    .finally(() => {
        process.exit()
    })