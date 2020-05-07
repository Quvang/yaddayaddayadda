const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const idx = require('../controllers/indexController');
const ydc = require('../controllers/yaddaController');

router.get('/', forwardAuthenticated, idx.frontpage);

router.get('/dashboard', ensureAuthenticated, idx.dashboard);
router.get('/profile', ensureAuthenticated, idx.test);

router.post('/users/post', function(req, res, next) {
  ydc.postYadda(req);
  res.redirect('/dashboard');
});

module.exports = router;
