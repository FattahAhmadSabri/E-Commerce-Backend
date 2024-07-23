const express = require('express')
const router = express.Router();

const {authenticate }= require('../MiddleWare/Authenticate')
const ProductController = require('../Controller/ProductController')

router.get('/id/:id',authenticate,ProductController.findProductById)
router.get('/',authenticate,ProductController.getallProduct)


module.exports= router