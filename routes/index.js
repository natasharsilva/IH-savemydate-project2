const express = require('express');
const router  = express.Router();
const zomatoApi = axios.create({baseUrl: "https://developers.zomato.com/api/v2.1/search?"})

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


module.exports = router;

router.get('/', (req, res, next) => {
  res.render('index');
});
router.post('/searchPlace', (req, res, next) => {
  const theId = req.body.value;
  axios.post("https://developers.zomato.com/api/v2.1/search?", theId )
    .then(response => {
       Date.create({
        placeId: theId
       })
    })
  res.render('place-details');
});