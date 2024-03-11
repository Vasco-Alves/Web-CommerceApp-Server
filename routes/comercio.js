
const express = require('express');
const router = express.Router();

const controller = require('../controllers/comercio');

/* GET requests */

// Lista de items
router.get('/', controller.getItems);

// Un solo item
router.get('/:cif', controller.getItemByCIF);

/* POST requests */
router.post('/', controller.createItem);

/* PUT requests */
router.put('/:cif', controller.updateItem);

/* DELETE requests */
router.delete('/:cif', controller.deleteItem);

module.exports = router;
