const express = require('express');
const router = express.Router();

const CustomerOrderController = require('../Controller/CustomerOrderControl');
const {authenticate} = require('../MiddleWare/Authenticate')

router.post('/',authenticate,CustomerOrderController.createOrder)
router.get('/user',authenticate,CustomerOrderController.orderHistory);
router.get('/:id',authenticate,CustomerOrderController.findOrderById)

module.exports=router
