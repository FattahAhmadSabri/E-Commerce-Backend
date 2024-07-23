const express = require('express');
const router = express.Router();
const CartController = require('../Controller/CartController');

const {authenticate} = require('../MiddleWare/Authenticate');

router.get('/',authenticate,CartController.findUserCart);
router.put('/add',authenticate,CartController.addItemToCart)

module.exports = router