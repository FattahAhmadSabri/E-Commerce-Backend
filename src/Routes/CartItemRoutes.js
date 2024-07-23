const express = require('express')
const router = express.Router()

const CartItemController = require('../Controller/CartItemController');
const  {authenticate} = require('../MiddleWare/Authenticate');

router.put('/:id',authenticate,CartItemController.UpdateCartItem)
router.delete('/:id',authenticate,CartItemController.removeCartItem)

module.exports = router