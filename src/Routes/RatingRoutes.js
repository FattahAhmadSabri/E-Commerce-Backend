const express = require('express');
const router = express.Router()
const RatingController = require('../Controller/RatingController')
const {authenticate} = require('../MiddleWare/Authenticate')

router.post('/create',authenticate,RatingController.createRating)
router.get('/product/:productId',authenticate,RatingController.getAllRating)

module.exports = router