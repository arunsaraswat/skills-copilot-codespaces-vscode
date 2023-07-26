// create web server
// create a route for comments
// create a route for comments/:id
// create a route for comments/:id/:comment_id
// create a route for comments/:id/:comment_id/edit
// create a route for comments/:id/:comment_id/update
// create a route for comments/:id/:comment_id/delete

// Path: comments.js
// create web server
// create a route for comments
// create a route for comments/:id
// create a route for comments/:id/:comment_id
// create a route for comments/:id/:comment_id/edit
// create a route for comments/:id/:comment_id/update
// create a route for comments/:id/:comment_id/delete

const express = require('express');
const router = express.Router({mergeParams: true});
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const middleware = require('../middleware');

// NEW ROUTE
router.get('/new', middleware.isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) console.log(err);
    else res.render('comments/new', {campground: campground});
  });
});

// CREATE ROUTE
router.post('/', middleware.isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) console.log(err);
    else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) console.log(err);
        else {
          // add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          // save comment
          comment.save();
          campground.comments.push(comment);
          campground.save();
          req.flash('success', 'Comment added');
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }
  });
});

// EDIT ROUTE
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      req.flash('error', 'Campground not found');
      res.redirect('back');
    } else {
      Comment.findById(req.params.comment_id, (err, comment) => {
        if (err) {
          req.flash('error', 'Comment not found');