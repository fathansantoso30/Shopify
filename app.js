const express = require('express');
const mongoose = require('mongoose');
const listsRoutes = require('./routes/listsRoutes');

// express app
const app = express();

// connect to mongodb server
const dbURL = 'mongodb+srv://tester:test1234@shopify1.r1miz.mongodb.net/shopify1?retryWrites=true&w=majority';
mongoose.connect(dbURL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');
             
// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));



// home page
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// lists routes
app.use('/lists', listsRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});

