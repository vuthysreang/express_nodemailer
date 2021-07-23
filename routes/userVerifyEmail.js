const express = require('express');
const router = express.Router();


/* DEFINE CONTROLLER */
const userVerifyEmailController = require('../controllers').userAuth;

router.get('/registration/:token', userVerifyEmailController.verifyEmail);

module.exports = router;