const express = require('express')
const router = express.Router()
const Episode = require('../models/episodes-model')
const Comment = require('../models/comments-model');

router.get("/", (req, res, next) => {
  console.log('Get episodes route reached!')
    Episode.find({})
      .then(episode => {
        res.render("view/main", {episodes: episode})})
      .catch(next);
  });

router.get("/:episode", (req, res, next) => {
  console.log('Get episode route reached!')
Episode.find({episodeNumber:req.params.episode})
    .then(ep => {
      Comment.find({episode:req.params.episode})
    .then((comment) => {
      res.render("view/episode", {episode: ep, comments: comment})})
    })
    .catch(next);
});

router.post("/", (req, res) => {
    Episode.create(req.body)
    .then(res.redirect("/"))
  });

  router.get('/:episode/:new', (req, res, next) => {
    Episode.find({episodeNumber:req.params.episode})
    .then(ep => {
      Comment.find({episode:req.params.episode})
    .then((comment) => {
      res.render("view/new", {episode: ep, comments: comment})})
    })
    .catch(next);
});

router.post("/:episode", (req, res) => {
  console.log('Add comment route reached!')
  Comment.create(
    req.body
)
.then((post) => {
  console.log(post)
    res.redirect(`/`)
})
.catch(console.error)
})


  const EpisodesController = router
  module.exports = EpisodesController;
