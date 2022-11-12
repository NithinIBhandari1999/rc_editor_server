const express = require('express');
const router = express.Router();

const { firebaseLogin, logout } = require('./controller/auth.controller');
const verifyJwt = require('../../../middleware/verifyJwt');

router.post(
    '/firebaseLogin',
    firebaseLogin
);

router.get(
    '/logout',
    verifyJwt,
    logout
);

module.exports = router;