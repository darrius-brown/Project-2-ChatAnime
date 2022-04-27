const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const passport = require('passport')
const initPassport = require('./passport')
initPassport(
  passport, 
  username, _id => {
  Users.find( { username: { $eq: username } } ),
  Users.findbyId( { _id: { $eq: id } } )
})
const Episode = require('../models/episodes-model')
const Comment = require('../models/comments-model')
const Users = require('../models/users-model')
const { append } = require('express/lib/response')
// //READ
// router.get("/", (req, res) => {
//   console.log('Get episodes route reached!')
//   Episode.find({})
//     .then(episode => {
//       res.render("view/main", { episodes: episode })
//     })
// });

// router.get("/:episode", (req, res) => {
//   console.log('Get episode route reached!')
//   Episode.find({ episodeNumber: req.params.episode })
//     .then(episode => {
//       Comment.find({ episode: req.params.episode }).sort({ updatedAt: -1 })
//         .then((comments) => {
//           console.log(episode)
//           res.render("view/episode", { episode, comments })
//         })
//     })
// });

// router.get('/:episode/comments', (req, res) => {
//   console.log('Get comments route reached!')
//   Comment.find({ episode: req.params.episode }).sort({ updatedAt: -1 })
//     .then(comments => {
//       res.render("view/comments", { comments })
//     })
// });

// //CREATE 
// router.get('/:episode/new', (req, res) => {
//   Episode.find({ episodeNumber: req.params.episode })
//     .then(ep => {
//       Comment.find({ episode: req.params.episode })
//         .then((comment) => {
//           res.render("view/new", { episode: ep, comments: comment })
//         })
//     })
// });

// router.post("/episode/:id", (req, res) => {
//   Comment.create(
//     {
//       post: req.body.post,
//       episode: req.params.id
//     }
//   )
//     .then(() => {
//       res.redirect(`/${req.params.id}`)
//     })
//     .catch(console.error)
// })
// //EDIT 
// router.get('/:episode/:id/edit', (req, res) => {
//   Episode.find({ episodeNumber: req.params.episode })
//     .then(ep => {
//       Comment.find({ _id: req.params.id })
//         .then((comment) => {
//           res.render("view/edit", { episode: ep, comments: comment })
//         })
//     })
// });

// router.put('/:episode/:id', (req, res) => {
//   console.log('Edit Comment route reached!')
//   Comment.findOneAndUpdate({
//     _id: req.params.id
//   },
//     req.body,
//     { new: true })
//     .then(() => {
//       res.redirect(`/${req.params.episode}`)
//     })
//     .catch(console.error);
// });

// //DELETE COMMENT
// router.delete('/:episode/:id', (req, res) => {
//   console.log('Delete Comment route reached!')
//   Comment.findOneAndDelete({
//     _id: req.params.id
//   },
//     () => {
//       res.redirect(`/${req.params.episode}`)
//     })
// })

// //CREATE EPISODE (rare)
// router.post("/", (req, res) => {
//   Episode.create(req.body)
//     .then(res.redirect("/"))
// });

router.get('/', checkAuthenticated, (req, res) => {
  res.render('view/main', {})
})

router.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('view/login', {})
})

router.post('/login', passport.authenticate("local",  {
  successRedirect: "view/main",
  failureRedirect: 'view/login',
  failureFlash: true
}))

router.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('view/register', {})
})

router.post('/register', checkNotAuthenticated, async (req, res) => {
  console.log('New Account Created!')
  const bcryptPassword = await bcrypt.hash(req.body.password, 10)
  Users.create({
    name: req.body.name,
    username: req.body.username,
    password: bcryptPassword
  })
      .then(() => {
      res.redirect(`/login`)
    })
   .catch(console.error)
})

router.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('view/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('views/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('view/main')
  }
  next()
}


const EpisodesController = router
module.exports = EpisodesController;

//
