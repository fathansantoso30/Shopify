const Item = require('../models/item');

const lists_index = (req, res) => {
    Item.find().sort({ createdAt: -1 })
    .then(result => {
        res.render('lists', { title: 'Shopping list', items: result});
    })
    .catch(err => {
        console.log(err);
    });
};

const lists_get_add = (req, res) => {
    res.render('add', { title: 'Add item' });
};

const lists_get_edit = (req, res) => {
    res.render('edit', { title: 'Edit item' });
};

const lists_add = (req, res) => {
    const item = new Item(req.body);

    item.save()
        .then(result => {
            res.redirect('/lists');
        })
        .catch(err => {
            res.status(409).send({
                message: err.message
            });
        });
};

const lists_get_editById = (req, res) => {
    const id = req.params.id;
    Item.findById(id)
        .then(result => {
        res.render('edit', { item: result, title: 'Edit Item' });
        })
        .catch(err => {
        console.log(err);
        res.status(404).render('404', { title: '404' });
    });
};

const lists_update = (req,res) => {
    const id = req.params.id;

    Item.findByIdAndUpdate( id, {
        name: req.body.name,
        amount: req.body.amount,
    })
        .then(result => {
            res.redirect('/lists');
        })
        .catch(err => {
            res.status(409).send({
                message: err.message
            });
        });
};

const lists_delete = (req,res) => {
    const id = req.params.id;

    Item.findByIdAndDelete(id)
        .then(result => {
            res.redirect('/lists');
        })
        .catch(err => {
            res.status(409).send({
                message: err.message
            });
        });
};

module.exports = {
    lists_index,
    lists_get_add,
    lists_get_edit,
    lists_get_editById,
    lists_add,
    lists_update,
    lists_delete
}