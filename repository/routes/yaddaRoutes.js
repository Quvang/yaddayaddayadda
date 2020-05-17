// 1) Requirements
const express = require('express');
const router = express.Router();
const ydc = require('../controllers/yaddaController');
const authController = require('../controllers/authController2.js');

router.post('/dashboard/post', function (req, res, next) {
  ydc.postYadda(req);
  res.redirect('/dashboard');
});

router.post('/delYadda', authController.protect, ydc.delYadda);

module.exports = router;
