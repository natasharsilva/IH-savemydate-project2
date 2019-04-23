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

//Route for choosing your date type: coffee, establishment types: 1- Cafe, 111- Tea Room
router.get("/date-type-coffee", (req, res, next) => {
  // setTimeout((
  axios.defaults.headers.common["user_key"] = process.env.API_KEY;
  axios
  .get(
    `https://developers.zomato.com/api/v2.1/search?entity_id=82&entity_type=city&lat=${
      userLocation[0]}&lon=${userLocation[1]}&establishment_type=1&sort=real_distance`
  )//establishment type: coffee
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
        userLocation[0]}&lon=${userLocation[1]}&establishment_type=111&sort=real_distance`
    )//establishment type: 111- Tea Room, sort by real distance
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
  console.log("----------------COFFEE------------",result.length)
  // .catch(err => console.log("EEEEERRRRRRROOOOORRRRRR", err));
  // res.connection.setTimeOut(1000);
  res.render("average-cost");
  // ),1000)
});

///////////////Route for choosing your date type: Bar, establishment types: 278- Wine Bar; 4 Kioske, 7-bar, 272- cocktail bar, 6-Pub, 292- Beer Garden
router.get("/date-type-bar", (req, res, next) => {
  axios.defaults.headers.common["user_key"] = process.env.API_KEY;
  ///////////AXIOS GET 278- Wine Bar/////////////////

  let zomatoApi = axios.create({
    baseURL: "https://developers.zomato.com/api/v2.1/",
    headers: { user_key: process.env.API_KEY }
  })

  let defaultParams = {
    entity_id: 82,
    entity_type: 'city',
    lat:userLocation[0],
    lon:userLocation[1],
    sort:'real_distance' 
  }

  Promise.all([
    zomatoApi.get(`search`, {
      params: {
        ...defaultParams,
        establishment_type:278, // Kioske
      }
    })
      //   ?entity_id=82&entity_type=city&lat=${
      // userLocation[0]}&lon=${userLocation[1]}&establishment_type=278&sort=real_distance`)
    ,
    axios
    .get(
      `https://developers.zomato.com/api/v2.1/search?entity_id=82&entity_type=city&lat=${
        userLocation[0]
      }&lon=${userLocation[1]}&establishment_type=4&sort=real_distance`
    ),
    axios
    .get(
      `https://developers.zomato.com/api/v2.1/search?entity_id=82&entity_type=city&lat=${
        userLocation[0]
      }&lon=${userLocation[1]}&establishment_type=7&sort=real_distance`
    ),
    axios
    .get(
      `https://developers.zomato.com/api/v2.1/search?entity_id=82&entity_type=city&lat=${
        userLocation[0]
      }&lon=${userLocation[1]}&establishment_type=272&sort=real_distance`
    ),
    axios
    .get(
      `https://developers.zomato.com/api/v2.1/search?entity_id=82&entity_type=city&lat=${
        userLocation[0]
      }&lon=${userLocation[1]}&establishment_type=6&sort=real_distance`
    ),
    axios
    .get(
      `https://developers.zomato.com/api/v2.1/search?entity_id=82&entity_type=city&lat=${
        userLocation[0]
      }&lon=${userLocation[1]}&establishment_type=272&sort=real_distance`
    )
  ])
  .then(responses => {
    for (let iResponse = 0; iResponse < responses.length; iResponse++) {
      let restaurants = responses[iResponse].data.restaurants;
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
    }
    console.log("----------------BARS------------",result.length)
    console.log(result.map(x => x.name))
    res.render("average-cost");
  })

///////////AXIOS GET 4 Kioske/////////////////
///////////AXIOS GET 7-bar/////////////////
///////////AXIOS GET 272- cocktail bar/////////////////
///////////AXIOS GET 6-pub/////////////////
///////////AXIOS GET 272- Beer Garden/////////////////
  // console.log(result.length)
  //     .catch(err => console.log("EEEEERRRRRRROOOOORRRRRR in filtering API", err));
  // .catch(err => console.log("EEEEERRRRRRROOOOORRRRRR", err));
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
