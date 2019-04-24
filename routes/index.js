// const API_KEY = require('dotenv')
const express = require("express");
const router = express.Router();
const axios = require("axios");
var result = [];
var userLocation = [];
const { checkRole } = require("../middlewares");
const Date = require('../models/Date')
const User = require('../models/User')
var filteredOptions = [];
var finalOption = [];


/* GET home page */
router.get("/", (req, res, next) => {
  userLocation = []
  res.render("index");
});

router.get("/location", (req, res, next) => {
  res.render("location");
});

router.get("/search/", (req, res, next) => {
  userLocation.push(req.query.lat, req.query.lng)
  console.log(userLocation);
  res.redirect("date-type")
})

router.get("/date-type", (req, res, next) => {
  res.render("date-type");
});

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
          average_cost_for_two: restaurants[i].restaurant.average_cost_for_two,
          rating: restaurants[i].restaurant.user_rating.aggregate_rating
        });
      }
    }
    console.log("----------------CAFES------------", result.length);
    // console.log(result.map(x => x.name))
    res.redirect("price-range");
  });
});

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
        establishment_type:278, // 278- Wine Bar
      }
    }),
    zomatoApi.get(`search`, {
      params: {
        ...defaultParams,
        establishment_type:4, // 4- Kioske
      }
    }),
    zomatoApi.get(`search`, {
      params: {
        ...defaultParams,
        establishment_type:7, // 7- Bar
      }
    }),
    zomatoApi.get(`search`, {
      params: {
        ...defaultParams,
        establishment_type:272, // 272- cocktail bar
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
          average_cost_for_two: restaurants[i].restaurant.average_cost_for_two,
          rating: restaurants[i].restaurant.user_rating.aggregate_rating
        });
      }
    }
    console.log("----------------BARS------------",result.length)
    // console.log(result.map(x => x.name)) //this turns an array into a string
    res.render("price-range");
  })
});

router.get("/date-type-club", (req, res, next) => {
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
          average_cost_for_two: restaurants[i].restaurant.average_cost_for_two,
          rating: restaurants[i].restaurant.user_rating.aggregate_rating
        });
      }
    }
    console.log("----------------CLUBS------------", result.length);
    // console.log(result.map(x => x.name))
    res.redirect("price-range");
  });

});

router.get("/date-type-dinner", (req, res, next) => {
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
          average_cost_for_two: restaurants[i].restaurant.average_cost_for_two,
          rating: restaurants[i].restaurant.user_rating.aggregate_rating
        });
      }
    }
    console.log("----------------FOOD------------", result.length);
    // console.log(result.map(x => x.name))
    res.redirect("price-range");
  });
});

router.get("/price-range", (req, res, next) => {
  res.render("price-range");
});

router.get("/price-range-1", (req, res, next) => {
  result = result.filter(element => element.price_range <= 2)
  res.redirect("/date-options")
});

router.get("/price-range-2", (req, res, next) => {
  result = result.filter(element => element.price_range > 2)
  res.redirect("/date-options")
});

router.get("/date-options", (req, res, next) => {
      filteredOptions = result.slice(0,5);
      console.log("These are my final options to the user -------->",filteredOptions);
  res.render("date-options", {filteredOptions});
});

// // Date map detail page 
router.get('/date-options/:placeId', (req,res,next) => {
  //  console.log("first checked - is it's not undefined OK", filteredOptions)

   finalOption = filteredOptions.filter(element => element.id === req.params.placeId)
   console.log("finalOption-------------------->", finalOption)
   console.log("finalOption.rating-------------------->", finalOption[0].rating)
  

    Date.create({
      date_location_name: finalOption[0].name,
      rating: finalOption[0].rating,
      address: finalOption[0].location.address,
      cuisines: finalOption[0].cuisines,
      latitude: finalOption[0].location.latitude,
      longitude: finalOption[0].location.longitude,
      address: finalOption[0].location.address,
      price_range: finalOption[0].price_range,
      AvgCostforTwo: finalOption[0].average_cost_for_two,
      rating: finalOption[0].rating
    })
    .then(createdDate => {
      console.log("Your date is ready ----> ",createdDate)

      User.findByIdAndUpdate()

      res.render('confirm-date' ,{createdDate})
    })
  })

  

//Trying to get variables from restaurant ID

  //   axios.defaults.headers.common["user_key"] = process.env.API_KEY;
  // let zomatoApi = axios.create({
  //   baseURL: "https://developers.zomato.com/api/v2.1/",
  //   headers: { user_key: process.env.API_KEY }
  // });

  //   zomatoApi.get(`restaurant`, {
  //     params: {
  //       res_id: 8203558
  //     }})
  //   .then(
  //     result => {
  //     console.log("HEEEEEEEEEEEEEEEEEEEEEYYYYYYYYYYYY",result.data.location)
  //       const restPosition = [result.data.location.latitude,result.data.location.longitude]
  //       console.log("Position-------------------->",restPosition)
  //       new mapboxgl.Marker({
  //         color: 'red'  
  //       })
  //         .setLngLat([restPosition[0],restPosition[1]])
  //         .addTo(map)  
  //     }
      
  //   ).catch(err => console.log("My Error ------>",err));
    // res.render('show-map', result)  

    //Commented out the 'showmap" for MVP purposes

// router.get("/show-map", (req, res, next) => {
//   res.render("show-map");
// });

router.get("/confirm-date", (req, res, next) => {
//check with POST//
<<<<<<< HEAD
  
=======
  Date.create({
    date_location_name: result.name,
    rating: result.rating,
    address: result.location.address,
    latitude: result.location.latitude,
    longitude: result.location.longitude,
    // rating: req.body.description,
    cuisines: result.cuisines,
    price_range: result.price_range,
    AvgCostforTwo: result.average_cost_for_two,
  })
  .then(createdDate => {
    console.log("Your date is ready, you are going to be redirected")
    res.render("profile-page" ,{createdDate})
  })
>>>>>>> e125e6e69700d3977dd2a7559c61e8bc9ed5c0f2
  // res.render("confirm-date");
});

router.get("/profile-page", checkRole("User"), (req, res, next) => {
  Date.find()
  


  
  res.render("profile-page");
});

module.exports = router;