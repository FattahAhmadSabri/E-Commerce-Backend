const express= require('express');
const router = express.Router()


const AuthController = require('../Controller/User.controller');
const { authenticate } = require('../MiddleWare/Authenticate');

router.get('/profile', AuthController.getUserProfile);
router.get('/',AuthController.getAllUser)


module.exports= router