const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;

router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/searchPlace', (req, res, next) => {
  res.render('place-details');
});