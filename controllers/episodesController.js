const express = require('express')
const router = express.Router()
const Episode = require('../models/episodes-model')

const req = require('express/lib/request');

router.get("/", (req, res, next) => {
  console.log('Get episodes route reached!')
    Episode.find({})
      .then(episode => {
        res.render("main", {episodes: episode})})
      .catch(next);
  });

router.get("/:episode", (req, res, next) => {
  console.log('Get episode route reached!')
Episode.find({episodeNumber:req.params.episode})
    .then(episode => {
    res.send(episode)})
    .catch(next);
});

router.post("/", (req, res) => {
    Episode.create(req.body)
    .then(res.redirect("/"))
  });







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