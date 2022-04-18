const Comment = require('../models/comments-model');
const express = require('express')
const router = express.Router()





router.delete('/:episode/:id', (req, res) => {
    console.log('Delete Comment route reached!')
    console.log(req.params.id)
    Comment.findOneAndDelete({
        _id: req.params.id},
    () => {
        res.redirect('/episode')
    })
  })

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

const CommentsController = router
module.exports = CommentsController;