// Create web server using Express.js
// 1. Create a new Express web server
// 2. Create a new route for GET requests to /comments
// 3. Return all comments from the database as JSON
// 4. Start the server on port 3001

const express = require('express');
const app = express();
const port = 3001;

const comments = [
    { username: 'tammy', comment: 'lololol' },
    { username: 'james', comment: 'this is great!' },
];

app.get('/comments', (req, res) => {
    res.json(comments);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});