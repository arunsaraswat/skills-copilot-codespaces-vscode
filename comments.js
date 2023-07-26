// create web server
var express = require('express');
var router = express.Router();

// import model
var Comment = require('../models/comment.js');

// add comment
router.post('/', function(req, res, next) {
  // get comment data
  var commentData = {
    post: req.body.post,
    name: req.body.name,
    email: req.body.email,
    body: req.body.body
  };

  // create comment
  Comment.create(commentData, function(error, comment) {
    // if error
    if (error) {
      return next(error);
    }
    // if success
    else {
      // redirect to post page
      res.redirect('/posts/' + commentData.post);
    }
  });
});

// export router
module.exports = router;