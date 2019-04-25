// const API_KEY = require('dotenv')

const express = require("express");
const router = express.Router();
const axios = require("axios");
const nodemailer = require("nodemailer")
var result = [];
var userLocation = [];
const { checkRole } = require("../middlewares");
const Date = require('../models/Date')
const Cinema = require('../models/Cinema')
const Netflix = require('../models/Netflix')
const User = require('../models/User')
var filteredOptions = [];
var finalOption = [];

router.use((req,res,next)=> {
  // console.log("----------------")
  // console.log("TCL: result", result)
  // console.log("TCL: userLocation", userLocation)
  // console.log("TCL: filteredOptions", filteredOptions)
  // console.log("TCL: finalOption", finalOption)
  // console.log("----------------")
  next()
})


/* GET home page */
router.get("/", (req, res, next) => {
  // let lastConfirmUrl = req.flash.lastConfirmUrl
  // if (req.user && lastConfirmUrl) {
  //   req.flash.lastConfirmUrl = undefined
  //   res.redirect(lastConfirmUrl)
  //   return
  // }

  
  userLocation = [];
  filteredOptions = [];
  finalOption = [];
  result = [];
  res.render("index");
});

router.get("/location", (req, res, next) => {
  res.render("location");
});

router.get("/date-type", (req, res, next) => {
  userLocation.push(req.query.lat, req.query.lng)
  const {lat,lng} = req.query
  res.render("date-type", {
    lat,
    lng
  });
});

// -------------- START OF  MOVIE ROUTES ------------------------------------
router.get("/date-type-movie",(req, res, next) => {
  Cinema.find()
    .then(finalOptions =>{
      res.render("date-type-movie", {finalOptions});
    })
});

router.get('/confirm-movie/:placeId', (req,res,next) => {
Cinema.findById(req.params.placeId)
.then (finalOption =>{
  Date.create({
    date_location_name: finalOption.name,
    address: finalOption.address,
    _user: req.user,

  })
  res.render("confirm-movie", {
    finalOption
  });
})
});

// -------------- END MOVIE ROUTES ------------------------------------


// -------------- BEGIN OF NETFLIX ROUTES ------------------------------------

router.get("/date-type-netflix",(req, res, next) => {
  Netflix.find()
    .then(allOptions =>{
      let random_index = Math.floor(Math.random() * allOptions.length);
      let finalOptions = allOptions[random_index];
      console.log(finalOptions)
      res.render("date-type-netflix", {finalOptions});
    })
});

router.get('/confirm-netflix/:movieId', (req,res,next) => {
  // req.flash.lastConfirmUrl = req.url
  Netflix.findById(req.params.movieId)
  .then (finalOption =>{
  console.log(finalOption)
    Date.create({
    date_location_name: 'The coziness of home',
    title: finalOption.title,
    director: finalOption.director,
    rating: finalOption.rate,
    _user: req.user
  })
  res.render("confirm-netflix", {
    finalOption
  });
})
});

// -------------- END NETFLIX ROUTES ------------------------------------


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
        establishment_type:292, // 292- Beer Garden
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
  result = []
   finalOption = filteredOptions.filter(element => element.id === req.params.placeId)
   console.log("finalOption-------------------->", finalOption)
   console.log("finalOption.rating-------------------->", finalOption[0].rating)
      res.render('confirm-date' ,{finalOption})
      })



router.get("/confirm-date", (req, res, next) => {
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
   rating: finalOption[0].rating,
   _user: req.user
  })
  .then(createdDate => {
   User.findByIdAndUpdate(req.user._id, {
    _date: createdDate
   })
    .then(() => {
     res.redirect("profile-page")
   })
  })
})

router.get("/profile-page", checkRole("User"), (req, res, next) => {
  Date.find({ _user: req.user._id })
  .then(userDates => {
    // console.log("The user dates are", userDates)
    res.render("profile-page" ,{userDates: userDates, user: req.user})
  })
});

router.get("/:dateId/delete", (req, res, next) => {
  Date.findByIdAndDelete(req.params.dateId)
    .then(() => {
      res.redirect("/profile-page")
    })
});
//----------------------- NODEMAILER ----------------------

router.post('/send-email', (req, res, next) => {
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "savemydate1@gmail.com",
      pass: "savemydate123",
    }
  });
  transporter.sendMail({
    from: '"Date Saver 👻"',
    to: req.body.email, 
    subject: "You got a date!", 
    text: req.body.message,
  })

  .then(() => {
    res.redirect("/profile-page")
  })
})



module.exports = router;