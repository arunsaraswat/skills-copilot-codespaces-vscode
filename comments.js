// create web server using express
const express = require('express');
const app = express();
const path = require('path');
// using the comments.js file
const comments = require('./comments');

// using the public folder to serve static files
app.use(express.static('public'));

// using the body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// using the handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// using the comments.js file
app.get('/', (req, res) => {
  res.render('index', { comments: comments.getAll() });
});

// using the comments.js file
app.post('/comments', (req, res) => {
  comments.add(req.body.name, req.body.comment);
  res.redirect('/');
});

// using the comments.js file
app.get('/comments/:id', (req, res) => {
  res.render('comments', { comment: comments.get(req.params.id) });
});

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});