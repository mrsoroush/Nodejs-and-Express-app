const express = require('express');
const router = express.Router();

// Bring in models
let Articles = require('../models/articles');

// Add route
router.get('/add', (req, res) => {
    res.render('add_article', {
        title: 'Add Articles'
    });
});

// Add submit POST route
router.post('/add', (req, res) => {
    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('author', 'Author is required').notEmpty();
    req.checkBody('body', 'Body is required').notEmpty();

    // Get Errors
    let errors = req.validationErrors();

    if(errors) {
        res.render('add_article', {
            title: 'Add Article',
            errors : errors
        });
    } else {
        let article = new Articles();
        article.title = req.body.title;
        article.author = req.body.author;
        article.body = req.body.body;

        article.save((err) => {
            if(err) {
                console.log(err);
                return;
            } else {
                req.flash('success', 'Article Added');
                res.redirect('/');
            }
        });
    }
});

// Load Edit Form
router.get('/edit/:id', (req, res) => {
    Articles.findById(req.params.id, (err, article) => {
        if(err) {
            console.log(err);
        } else {
            res.render('edit_article', {
                title: 'Edit Article',
                article: article
            });
        }
    });
});

// Update submit POST route
router.post('/edit/:id', (req, res) => {
    let article = {};
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    let query = {_id: req.params.id};

    Articles.updateOne(query, article, (err) => {
        if(err) {
            console.log(err);
            return;
        } else {
            req.flash('success', 'Article Updated');
            res.redirect('/');
        }
    });
});

// Delete submit POST route
router.delete('/:id', (req,res) => {
    let query = {_id: req.params.id};

    Articles.deleteOne(query, (err) => {
        if(err) {
            console.log(err);
        }
    res.send('Success');
    });
});

// Get Single article
router.get('/:id', (req, res) => {
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

module.exports = router;