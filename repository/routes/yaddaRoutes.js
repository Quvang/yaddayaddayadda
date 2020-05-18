// 1) Requirements
const express = require('express');
const ydc = require('../controllers/yaddaController');
const authController = require('../controllers/authController.js');

const router = express.Router();

// 2) Routes
// *** Yadda Management ***
router.post('/dashboard/post', function (req, res, next) {
  ydc.postYadda(req);
  res.redirect('/dashboard');
});
router.post('/delYadda', authController.protect, ydc.delYadda);

module.exports = router;
