const express = require('express');

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.listen(3000);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/lists', (req, res) => {
    const lists = [
        {id: 1, name: 'Spinach'},
        {id: 2, name: 'Tomatoes'},
        {id: 3, name: 'Cauliflowers'},
    ];
    res.render('lists', { lists });
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.get('/edit', (req, res) => {
    res.render('edit');
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404');
})

