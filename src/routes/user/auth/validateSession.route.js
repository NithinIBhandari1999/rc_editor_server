const express = require('express');
const router = express.Router();

const { validateSession } = require('./controller/validateSession.controller');
const verifyJwt = require('../../../middleware/verifyJwt');

router.get(
    '/validateSession',
    verifyJwt,
    validateSession
);

module.exports = router;