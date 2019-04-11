const express = require('express');
const path = require('path');

// Init app
const app = express();

// Load view Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home route
app.get('/', (req, res) => {
    let articles = [
        {
            id: 1,
            title: 'Article One',
            author: 'Mr.soroush',
            body: 'This is article number one'
        },
        {
            id: 2,
            title: 'Article Two',
            author: 'Mr.soroush',
            body: 'This is article number two'
        },
        {
            id: 3,
            title: 'Article Three',
            author: 'Mr.soroush',
            body: 'This is article number three'
        }
    ];
    res.render('index', {
        title: 'Articles',
        articles: articles
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