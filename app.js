const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/item');
// express app
const app = express();

// connect to mongodb server
const dbURL = 'mongodb+srv://tester:test1234@shopify1.r1miz.mongodb.net/shopify1?retryWrites=true&w=majority';
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));
             
// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// home page
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// lists page
app.get('/lists', (req, res) => {
    Item.find().sort({ createdAt: -1 })
    .then(result => {
        res.render('lists', { title: 'Shopping list', items: result});
    })
    .catch(err => {
        console.log(err);
    });
});

app.post('/lists', (req, res) => {
    const item = new Item(req.body);

    item.save()
        .then(result => {
            res.redirect('/lists');
        })
        .catch(err => {
            console.log(err);
        });
});

// add page
app.get('/add', (req, res) => {
    res.render('add', { title: 'Add item' });
});

// edit page
app.get('/edit', (req, res) => {
    res.render('edit', { title: 'Edit item' });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})

