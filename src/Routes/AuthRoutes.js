const express= require('express');
const router = express.Router();
const AuthController = require('../Controller/Auth.controller');

router.post('/signup',AuthController.register);
router.post('/signin',AuthController.login);

module.exports=router