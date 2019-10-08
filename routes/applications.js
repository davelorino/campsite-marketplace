const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const {userById} = require('../controllers/user');
const {generateToken} = require('../controllers/braintree');


router.param('userId', userById);

module.exports = router;  