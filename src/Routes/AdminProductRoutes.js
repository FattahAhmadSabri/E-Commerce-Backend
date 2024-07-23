const express = require('express');
const router = express.Router();
const ProductController = require('../Controller/ProductController');
const { authenticate } = require('../MiddleWare/Authenticate');

// Route to create a single product
router.post('/', authenticate, ProductController.createProduct);

// Route to create multiple products
router.post('/creates', authenticate, ProductController.createMultipleProduct);

// Route to delete a product by id
router.delete('/:id', authenticate, ProductController.deleteProduct);

// Route to update a product
router.put('/', authenticate, ProductController.updateProduct);

module.exports = router;


