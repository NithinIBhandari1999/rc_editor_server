const express = require('express');
const router = express.Router();

const { getUserProfile } = require('./controller/profile.controller');
const verifyJwt = require('../../../middleware/verifyJwt');

router.get(
    '/getUserProfile',
    verifyJwt,
    getUserProfile
);

module.exports = router;