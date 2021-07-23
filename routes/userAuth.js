const express = require('express');
const router = express.Router();


/* DEFINE CONTROLLER */
const userAuthController = require('../controllers').userAuth;


/* USER REGISTER */
router.post('/register', userAuthController.userRegister);




module.exports = router;