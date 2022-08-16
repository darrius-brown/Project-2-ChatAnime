const express = require('express')
const router = express.Router()
const Episode = require('../models/episodes-model')
const Comment = require('../models/comments-model')


router.get('/newepisode', (req, res) => {
  res.render('view/newepisode')
})

router.post("/newepisode", (req, res) => {
  console.log('New episode created!')
  Episode.create(req.body)
    .then(res.redirect("/"))
});


router.get("/", (req, res) => {
  console.log('Get episodes route reached!')
  Episode.find({})
    .then(episode => {
      const sorted = episode.sort((a, b) => a.episodeNumber - b.episodeNumber)

      res.render("view/main", { episodes: sorted })
    })
});

router.get("/:episode", (req, res) => {
  console.log('Get episode route reached!')
  Episode.find({ episodeNumber: req.params.episode })
    .then(episode => {
      Comment.find({ episode: req.params.episode }).sort({ updatedAt: -1 })
        .then((comments) => {
          res.render("view/episode", { episode, comments })
        })
    })
});

router.get('/:episode/comments', (req, res) => {
  console.log('Get comments route reached!')
  Comment.find({ episode: req.params.episode }).sort({ updatedAt: -1 })
    .then(comments => {
      res.render("view/comments", { comments })
    })
});


router.get('/:episode/new', (req, res) => {
  Episode.find({ episodeNumber: req.params.episode })
    .then(ep => {
      Comment.find({ episode: req.params.episode })
        .then((comment) => {
          res.render("view/new", { episode: ep, comments: comment })
        })
    })
});

router.post("/episode/:id", (req, res) => {
  Comment.create(
    {
      post: req.body.post,
      episode: req.params.id
    }
  )
    .then(() => {
      res.redirect(`/${req.params.id}`)
    })
})

router.get('/:episode/:id/edit', (req, res) => {
  Episode.find({ episodeNumber: req.params.episode })
    .then(ep => {
      Comment.find({ _id: req.params.id })
        .then((comment) => {
          res.render("view/edit", { episode: ep, comments: comment })
        })
    })
});

router.put('/:episode/:id', (req, res) => {
  console.log('Edit Comment route reached!')
  Comment.findOneAndUpdate({
    _id: req.params.id
  },
    req.body,
    { new: true })
    .then(() => {
      res.redirect(`/${req.params.episode}`)
    })
});


router.delete('/:episode/:id', (req, res) => {
  console.log('Delete Comment route reached!')
  Comment.findOneAndDelete({
    _id: req.params.id
  },
    () => {
      res.redirect(`/${req.params.episode}`)
    })
})





const EpisodesController = router
module.exports = EpisodesController;


