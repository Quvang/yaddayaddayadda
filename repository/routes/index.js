const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const idx = require('../controllers/indexController');
const ydc = require('../controllers/yaddaController');
const userController = require ('../controllers/userController')

router.get('/', forwardAuthenticated, idx.frontpage);

router.get('/dashboard', ensureAuthenticated, idx.dashboard);
router.get('/profile', ensureAuthenticated, idx.profile);
router.get('/messages', ensureAuthenticated, idx.messages);
router.get('/explore', ensureAuthenticated, idx.explore);
router.get('/tags', ensureAuthenticated, idx.tags);

router.post('/dashboard/post', function(req, res, next) {
  ydc.postYadda(req);
  res.redirect('/dashboard');
});


module.exports = router;
