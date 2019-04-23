// const API_KEY = require('dotenv')
const express = require("express");
const router = express.Router();
const axios = require("axios");
const result = [];
const userLocation = [38.7114690418, -9.14146889];
// const zomatoApi = axios.create({baseUrl: "https://developers.zomato.com/api/v2.1/search?"})
// const map = require('../public/javascripts/script')

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

router.get("/restaurant-user-form", (req, res, next) => {
  res.render("restaurant-user-form");
});

router.get("/date-type", (req, res, next) => {
  res.render("date-type");
});

router.get("/date-type-coffee", (req, res, next) => {
  axios.defaults.headers.common["user_key"] = process.env.API_KEY;
  axios
  .get(
    `https://developers.zomato.com/api/v2.1/search?entity_id=82&entity_type=city&lat=${
      userLocation[0]
    }&lon=${userLocation[1]}&establishment_type=1&sort=real_distance`
  )
  .then(resp => {
    let restaurants = resp.data.restaurants;
    for (let i = 0; i < restaurants.length; i++) {
      result.push({
        id: restaurants[i].restaurant.id,
        name: restaurants[i].restaurant.name,
        location: restaurants[i].restaurant.location,
        cuisines: restaurants[i].restaurant.cuisines,
        price_range: restaurants[i].restaurant.price_range,
        average_cost_for_two: restaurants[i].restaurant.average_cost_for_two
      });
    }});
    axios
    .get(
      `https://developers.zomato.com/api/v2.1/search?entity_id=82&entity_type=city&lat=${
        userLocation[0]
      }&lon=${userLocation[1]}&establishment_type=111&sort=real_distance`
    )
    .then(resp => {
      let restaurants = resp.data.restaurants;
      for (let i = 0; i < restaurants.length; i++) {
        result.push({
          id: restaurants[i].restaurant.id,
          name: restaurants[i].restaurant.name,
          location: restaurants[i].restaurant.location,
          cuisines: restaurants[i].restaurant.cuisines,
          price_range: restaurants[i].restaurant.price_range,
          average_cost_for_two: restaurants[i].restaurant.average_cost_for_two
        });
      }
  })
  console.log(result.length)
  // .catch(err => console.log("EEEEERRRRRRROOOOORRRRRR", err));
  res.redirect("average-cost");
});

router.get("/date-type-coffee", (req, res, next) => {
  axios.defaults.headers.common["user_key"] = process.env.API_KEY;
  axios
  .get(
    `https://developers.zomato.com/api/v2.1/search?entity_id=82&entity_type=city&lat=${
      userLocation[0]
    }&lon=${userLocation[1]}&establishment_type=1&sort=real_distance`
  )
  .then(resp => {
    let restaurants = resp.data.restaurants;
    for (let i = 0; i < restaurants.length; i++) {
      result.push({
        id: restaurants[i].restaurant.id,
        name: restaurants[i].restaurant.name,
        location: restaurants[i].restaurant.location,
        cuisines: restaurants[i].restaurant.cuisines,
        price_range: restaurants[i].restaurant.price_range,
        average_cost_for_two: restaurants[i].restaurant.average_cost_for_two
      });
    }});
    axios
    .get(
      `https://developers.zomato.com/api/v2.1/search?entity_id=82&entity_type=city&lat=${
        userLocation[0]
      }&lon=${userLocation[1]}&establishment_type=111&sort=real_distance`
    )
    .then(resp => {
      let restaurants = resp.data.restaurants;
      for (let i = 0; i < restaurants.length; i++) {
        result.push({
          id: restaurants[i].restaurant.id,
          name: restaurants[i].restaurant.name,
          location: restaurants[i].restaurant.location,
          cuisines: restaurants[i].restaurant.cuisines,
          price_range: restaurants[i].restaurant.price_range,
          average_cost_for_two: restaurants[i].restaurant.average_cost_for_two
        });
      }
  })
    .catch(err => console.log("EEEEERRRRRRROOOOORRRRRR", err));
  res.redirect("average-cost");
});

router.get("/average-cost", (req, res, next) => {
  res.render("average-cost");
});

router.get("/price-range-1", (req, res, next) => {
  res.redirect("/date-options");
});

router.get("/price-range-2", (req, res, next) => {
  res.redirect("/date-options");
});

router.get("/price-range-3", (req, res, next) => {
  res.redirect("/date-options");
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
