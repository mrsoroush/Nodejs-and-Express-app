const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/nodekb', { useNewUrlParser: true });
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

//Body parser middleware
// parse application/x-www-form-urlencode
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

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

// Get Single article
app.get('/article/:id', (req, res) => {
    Articles.findById(req.params.id, (err, article) => {
        if(err) {
            console.log(err);
        } else {
            res.render('article', {
                article: article
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

// Add submit POST route
app.post('/articles/add', (req, res) => {
    let article = new Articles();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save((err) => {
        if(err) {
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server started on port 3000...');
})