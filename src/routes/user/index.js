// Imports
const express = require('express');

const router = express.Router();

const auth = require('./auth/auth.route');
const validateSession = require('./auth/validateSession.route');
const profile = require('./profile/profile.route');

router.use('/auth', auth);
router.use('/validateSession', validateSession);
router.use('/profile', profile);

module.exports = router;