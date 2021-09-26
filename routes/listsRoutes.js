const express = require('express');
const listsController = require('../controllers/listsController');

const router = express.Router();

// methode-override
var methodOverride = require('method-override')
router.use(methodOverride('_method'));

// lists page
router.get('/', listsController.lists_index);

// get add page
router.get('/add', listsController.lists_get_add);

// get edit page
router.get('/edit', listsController.lists_get_edit);

// add item on lists
router.post('/', listsController.lists_add);

// get edit page by id
router.get('/:id', listsController.lists_get_editById);

// update item
router.put('/:id', listsController.lists_update);

// delete item on lists
router.delete('/:id', listsController.lists_delete);

module.exports = router;