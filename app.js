const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

// Check connection
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Check for db errors
db.on('error', (err) => {
    console.log(err);
});

// Init app
const app = express();

// Bring in models
let Articles = require('./models/articles');

// Load view Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home route
app.get('/', (req, res) => {
    Articles.find({}, (err, articles) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                title: 'Articles',
                articles: articles
            });
        }
    });   
});

// Add route
app.get('/articles/add', (req, res) => {
    res.render('add_article', {
        title: 'Add Articles'
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server started on port 3000...');
})