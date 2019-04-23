// const API_KEY = require('dotenv')
const express = require("express");
const router = express.Router();
const axios = require("axios");
const result = [];
const userLocation = [38.7114690418, -9.14146889];
const { checkRole } = require("../middlewares");
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
  axios.defaults.headers.common["user_key"] = process.env.API_KEY;
  let zomatoApi = axios.create({
    baseURL: "https://developers.zomato.com/api/v2.1/",
    headers: { user_key: process.env.API_KEY }
  });

  let defaultParams = {
    entity_id: 82,
    entity_type: "city",
    lat: userLocation[0],
    lon: userLocation[1],
    sort: "real_distance"
  };

  Promise.all([
    zomatoApi.get(`search`, {
      params: {
        ...defaultParams,
        establishment_type: 1
      }
    }),
    zomatoApi.get(`search`, {
      params: {
        ...defaultParams,
        establishment_type: 111
      }
    })
  ]).then(responses => {
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
    console.log("----------------CAFES------------", result.length);
    // console.log(result.map(x => x.name))
    res.redirect("average-cost");
  });
});

///////////////Route for choosing your date type: Bar, establishment types: 278- Wine Bar; 4 Kioske, 7-bar, 272- cocktail bar, 6-Pub, 292- Beer Garden
router.get("/date-type-bar", (req, res, next) => {
  axios.defaults.headers.common["user_key"] = process.env.API_KEY;
  let zomatoApi = axios.create({
    baseURL: "https://developers.zomato.com/api/v2.1/",
    headers: { user_key: process.env.API_KEY }
  });

  let defaultParams = {
    entity_id: 82,
    entity_type: "city",
    lat: userLocation[0],
    lon: userLocation[1],
    sort: "real_distance"
  };

  Promise.all([
    zomatoApi.get(`search`, {
      params: {
        ...defaultParams,
// <<<<<<< HEAD
        establishment_type:278, // 278- Wine Bar
// =======
//         establishment_type: 278
// >>>>>>> effb7dce4a721b075c61474569fa5fea297abf8b
      }
    }),
    zomatoApi.get(`search`, {
      params: {
        ...defaultParams,
// <<<<<<< HEAD
        establishment_type:4, // 4- Kioske
// =======
//         establishment_type: 4
// >>>>>>> effb7dce4a721b075c61474569fa5fea297abf8b
      }
    }),
    zomatoApi.get(`search`, {
      params: {
        ...defaultParams,
// <<<<<<< HEAD
        establishment_type:7, // 7- Bar
// =======
//         establishment_type: 7
// >>>>>>> effb7dce4a721b075c61474569fa5fea297abf8b
      }
    }),
    zomatoApi.get(`search`, {
      params: {
        ...defaultParams,
// <<<<<<< HEAD
        establishment_type:272, // 272- cocktail bar
// =======
//         establishment_type: 272
// >>>>>>> effb7dce4a721b075c61474569fa5fea297abf8b
      }
    }),
    zomatoApi.get(`search`, {
      params: {
        ...defaultParams,

        establishment_type:6, // 6-pub

      }
    }),
    zomatoApi.get(`search`, {
      params: {
        ...defaultParams,
// <<<<<<< HEAD
        establishment_type:272, // 272- Beer Garden
      }
    })
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
    console.log(result.map(x => x.name)) //this turns an array into a string
    res.render("average-cost");
  })


    console.log("----------------BARS------------", result.length);
    // console.log(result.map(x => x.name))
    res.redirect("average-cost");
  });


router.get("/date-type-dancing", (req, res, next) => {
  axios.defaults.headers.common["user_key"] = process.env.API_KEY;
  let zomatoApi = axios.create({
    baseURL: "https://developers.zomato.com/api/v2.1/",
    headers: { user_key: process.env.API_KEY }
  });

  let defaultParams = {
    entity_id: 82,
    entity_type: "city",
    lat: userLocation[0],
    lon: userLocation[1],
    sort: "real_distance"
  };

  Promise.all([
    zomatoApi.get(`search`, {
      params: {
        ...defaultParams,
        establishment_type: 8
      }
    })
  ]).then(responses => {
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
    console.log("----------------CLUBS------------", result.length);
    // console.log(result.map(x => x.name))
    res.redirect("average-cost");
  });

});

router.get("/date-type-food", (req, res, next) => {
  axios.defaults.headers.common["user_key"] = process.env.API_KEY;
  let zomatoApi = axios.create({
    baseURL: "https://developers.zomato.com/api/v2.1/",
    headers: { user_key: process.env.API_KEY }
  });

  let defaultParams = {
    entity_id: 82,
    entity_type: "city",
    lat: userLocation[0],
    lon: userLocation[1],
    sort: "real_distance"
  };

  Promise.all([
    zomatoApi.get(`search`, {
      params: {
        ...defaultParams,
        establishment_type: 241
      }
    }),
    zomatoApi.get(`search`, {
      params: {
        ...defaultParams,
        establishment_type: 21
      }
    }),
    zomatoApi.get(`search`, {
      params: {
        ...defaultParams,
        establishment_type: 20
      }
    }),
    zomatoApi.get(`search`, {
      params: {
        ...defaultParams,
        establishment_type: 81
      }
    })
  ]).then(responses => {
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
    console.log("----------------FOOD------------", result.length);
    // console.log(result.map(x => x.name))
    res.redirect("average-cost");
  });
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

router.get("/profile-page", checkRole("User"), (req, res, next) => {
  res.render("profile-page");
});

module.exports = router;
