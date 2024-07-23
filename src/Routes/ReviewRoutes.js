const express = require('express');
const router = express.Router()

const ReviewController = require('../Controller/ReviewController');
const {authenticate} = require('../MiddleWare/Authenticate');

router.post('/create',authenticate,ReviewController.createReview);

router.get('/product/productId',authenticate,ReviewController.getAllReview)

module.exports = router