const express = require('express')
const router = express.Router()
const Episode = require('../models/episodes-model')
const Comment = require('../models/comments-model');
//READ
router.get("/", (req, res, next) => {
  console.log('Get episodes route reached!')
  Episode.find({})
    .then(episode => {
      res.render("view/main", { episodes: episode })
    })
    .catch(next);
});

router.get("/:episode", (req, res, next) => {
  console.log('Get episode route reached!')
  Episode.find({ episodeNumber: req.params.episode })
    .then(episode => {
      Comment.find({ episode: req.params.episode }).sort({ updatedAt: -1 })
        .then((comments) => {
          res.render("view/episode", {episode, comments })
        })
    })
    .catch(next);
});


//CREATE COMMENT
router.get('/:episode/:new', (req, res, next) => {
  Episode.find({ episodeNumber: req.params.episode })
    .then(ep => {
      Comment.find({ episode: req.params.episode })
        .then((comment) => {
          res.render("view/new", { episode: ep, comments: comment })
        })
    })
    .catch(next);
});

router.post("/episode/:id", (req, res) => {
  console.log('Add comment route reached!')
  console.log(req.body.post)
  console.log(req.params.id)
  Comment.create(
    {
      post: req.body.post,
      episode: req.params.id
    }
  )
    .then((post) => {
      console.log(req.body.episode)
      res.redirect(`/${req.params.id}`)
    })
    .catch(console.error)
})
//EDIT COMMENT
router.get('/:episode/:id/:edit', (req, res, next) => {
  Episode.find({ episodeNumber: req.params.episode })
    .then(ep => {
      Comment.find({ _id: req.params.id })
        .then((comment) => {
          res.render("view/edit", { episode: ep, comments: comment })
        })
    })
    .catch(next);
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
    .catch(console.error);
});

//DELETE COMMENT
router.delete('/:episode/:id', (req, res) => {
  console.log('Delete Comment route reached!')
  console.log(req.params.id)
  Comment.findOneAndDelete({
    _id: req.params.id
  },
    () => {
      res.redirect(`/${req.params.episode}`)
    })
})

//CREATE EPISODE (rare)
router.post("/", (req, res) => {
  Episode.create(req.body)
    .then(res.redirect("/"))
});

const EpisodesController = router
module.exports = EpisodesController;
