const express = require('express')
const router = express.Router()
const Episode = require('../models/episodes-model')
const Comment = require('../models/comments-model');
const req = require('express/lib/request');
//Main Page, Show all episodes
router.get("/", (req, res, next) => {
    Episode.find({})
      .then(episode => {
        res.send({episode})})
      .catch(next);
  });

//Main Page, Create new episode
router.post("/", (req, res) => {
    Episode.create(req.body)
    .then(res.redirect("/"))
  });

//Episode Page, Show all comments
router.get("/:episode", (req, res, next) => {
  Comment.find({episode:req.params.episode})
      .then(episode => {
      res.send(episode)})
      .catch(next);
  });
//Episode Page, Create new comment
router.post("/:episode", (req, res) => {
  console.log('Add comment route reached!')
  Comment.create({
    episode: req.params.episode,
    post: req.body.post,
    likes: 0
})
.then(res.redirect("/"))
})

//Episode Page, Show episode
router.get("/:episode", (req, res, next) => {
Episode.find({episodeNumber:req.params.episode})
    .then(episode => {
    res.send(episode)})
    .catch(next);
});

//Episode Page, Edit Comment
//Works but with error?
router.put('/:episode/:id', (req, res) => {
  console.log('Edit Comment route reached!')
  Comment.findOneAndUpdate({
      _id: req.params.id},
      req.body,
      {new: true})
  .then(() => {
      res.redirect('/episode')
  })
  .catch(console.error);
});

//Episode Page, Delete comment
router.delete('/:episode/:id', (req, res) => {
  console.log('Delete Comment route reached!')
  Comment.findOneAndDelete({
      _id: req.params.id},
  () => {
      res.redirect('/episode')
  })
})









  const EpisodesController = router
  module.exports = EpisodesController;
  // router.get("/:episode", (req, res, next) => {
  //   Episode.aggregate([
  //     { $match: { episodeNumber: req.params.episode} },
  //     {
  //         $lookup:
  //         {
  //             from: `Comment`,
  //             localField: "episodeNumber",
  //             foreignField: "episode",
  //             as: "Comments"
  //         }
  //     },
  //     {
  //         $unwind: "$Comments"
  //     },
  // ])
  //     .then(episode => {
  //     res.send(episode)})
  //     .catch(next)
  
  // })