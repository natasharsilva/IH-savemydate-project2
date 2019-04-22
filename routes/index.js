// const API_KEY = require('dotenv')

const express = require("express");
const router = express.Router();
const axios = require("axios");
// const zomatoApi = axios.create({baseUrl: "https://developers.zomato.com/api/v2.1/search?"})

axios.defaults.headers.common["user_key"] = process.env.API_KEY;
axios.get(
    "https://developers.zomato.com/api/v2.1/search?entity_id=82&entity_type=city&establishment_type=272"
  )
  .then(resp => {
    console.log(resp.data.restaurants[0].restaurant.name);
  })
  .catch(err => console.log("EEEEERRRRRRRORRRRRR", err));

// let config = {'Authorization': process.env.API_KEY};
// axios.get('https://developers.zomato.com/api/v2.1/search?', {headers: config})
// .then((resp) => {
//     console.log(resp);
// });

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/location", (req, res, next) => {
  res.render("location");
});

router.get("/current-location", (req, res, next) => {
  res.render("current-location");
});

router.get('/restaurant-user-form', (req, res, next) => {
  res.render('restaurant-user-form');
});

router.get('/date-type', (req, res, next) => {
//   res.render('date-type');
// router.get("/date-type", (req, res, next) => {
  let result = [];
  axios.defaults.headers.common["user_key"] = process.env.API_KEY;
  axios.get(
      "https://developers.zomato.com/api/v2.1/search?entity_id=82&entity_type=city&establishment_type=1"
    )
    .then(resp => {
      let restaurants = resp.data.restaurants
      for (let i = 0; i < restaurants.length; i++) {
        result.push(restaurants[i].restaurant.name +", " +restaurants[i].restaurant.price_range)
      }
      console.log(result);
    })
    .catch(err => console.log("EEEEERRRRRRRORRRRRR", err));
    
  res.render("date-type");
});

router.get("/average-cost", (req, res, next) => {
  res.render("average-cost");
});

router.get("/date-options", (req, res, next) => {
  res.render("date-options");
});

router.get("/show-map", (req, res, next) => {
  res.render("show-map");
});

router.get("/confirm-date", (req, res, next) => {
  res.render("confirm-date");
});

router.get("/profile-page", (req, res, next) => {
  res.render("profile-page");
});

// router.get('/searchPlace', (req, res, next) => {
//   // const theId = req.body.name;
//   axios.get("https://developers.zomato.com/api/v2.1/search?", theId )
//     .then(response => {
//       console.log("FFFFUUUUUUUUCCCCCKKKKKKKKKK", response.data)
//     //    Date.create({
//     //     establishment_name: response.categories.name,
//     //    })
//     // })
//     // .then(
//     //   dateDetails => {
//     //     res.render("index", {
//     //       dateDetails
//     //     });
//     res.render('place-details');
//   })
//   .catch(err => console.log("HEEELLLOOOOO", err))
// })

module.exports = router;
