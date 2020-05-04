const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const idx = require('../controllers/indexController');

router.get('/', forwardAuthenticated, idx.frontpage);

router.get('/dashboard', ensureAuthenticated, idx.dashboard);
router.get('/profile', ensureAuthenticated, idx.test);

module.exports = router;
