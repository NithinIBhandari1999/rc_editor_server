// Imports
const express = require('express');

const router = express.Router();

const auth = require('./auth/auth.route');
const validateSession = require('./auth/validateSession.route');

// router.use('/test', require('./test/index'));
// router.use('/global', require('./global/index'));

// router.use('/shop', require('./shop/index'));
// router.use('/product', require('./product/index'));
// router.use('/common', require('./common/index'));

router.use('/auth', auth);
router.use('/validateSession', validateSession);

module.exports = router;