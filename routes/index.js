// const API_KEY = require('dotenv')

const express = require("express");
const router = express.Router();
const axios = require("axios");
const nodemailer = require("nodemailer");
const { checkRole } = require("../middlewares");
const Date = require("../models/Date");
const Cinema = require("../models/Cinema");
const Netflix = require("../models/Netflix");
const User = require("../models/User");

/* GET home page */
router.get("/", (req, res, next) => {
  // let lastConfirmUrl = req.flash.lastConfirmUrl
  // if (req.user && lastConfirmUrl) {
  //   req.flash.lastConfirmUrl = undefined
  //   res.redirect(lastConfirmUrl)
  //   return
  // }
  res.render("index");
});

router.get("/location", (req, res, next) => {
  res.render("location");
});

router.get("/date-type", (req, res, next) => {
  // userLocation.push(req.query.lat, req.query.lng)
  let { lat, lng } = req.query;
  res.render("date-type", {
    lat,
    lng
  });
});

// -------------- START OF  MOVIE ROUTES ------------------------------------
router.get("/date-type-movie", (req, res, next) => {
  let lat = req.query.lat;
  let lng = req.query.lng;
  Cinema.find().then(finalOptions => {
		console.log("TCL: finalOptions", finalOptions)
    res.render("date-type-movie", { finalOptions, lat, lng });
  });
});

router.get("/confirm-movie/:placeId", (req, res, next) => {
  Cinema.findById(req.params.placeId).then(finalOption => {
    Date.create({
      date_location_name: finalOption.name,
      address: finalOption.address,
      website: finalOption.website,
      _user: req.user
    });
    res.render("confirm-movie", {
      finalOption
    });
  });
});

// -------------- END MOVIE ROUTES ------------------------------------

// -------------- BEGIN OF NETFLIX ROUTES ------------------------------------
router.get("/date-type-netflix", (req, res, next) => {
  let lat = req.query.lat;
  let lng = req.query.lng;
  Netflix.find().then(allOptions => {
    let random_index = Math.floor(Math.random() * allOptions.length);
    let finalOptions = allOptions[random_index];
    console.log(finalOptions);
    res.render("date-type-netflix", { finalOptions, lat, lng });
  });
});

router.get("/confirm-netflix/:movieId", (req, res, next) => {
  // req.flash.lastConfirmUrl = req.url
  Netflix.findById(req.params.movieId).then(finalOption => {
    console.log(finalOption);
    Date.create({
      date_location_name: finalOption.title,
      address: "The coziness of home",
      director: finalOption.director,
      //rating: finalOption.rate,
      _user: req.user
    });
    res.render("confirm-netflix", {
      finalOption
    });
  });
});

// -------------- END NETFLIX ROUTES ------------------------------------

router.get("/price-range", (req, res, next) => {
  let lat = req.query.lat;
  let lng = req.query.lng;
  let kind = req.query.kind;
  res.render("price-range", {
    lat,
    lng,
    kind
  });
});

router.get("/date-options", (req, res, next) => {
  let result = [];
  let filteredOptions;
  let lat = req.query.lat;
  let lng = req.query.lng;
  axios.defaults.headers.common["user_key"] = process.env.API_KEY;
  let zomatoApi = axios.create({
    baseURL: "https://developers.zomato.com/api/v2.1/",
    headers: { user_key: process.env.API_KEY }
  });

  let defaultParams = {
    lat: lat,
    lon: lng,
    sort: "real_distance"
  };

  switch (req.query.kind) {
    case "drink":
      Promise.all([
        zomatoApi.get(`search`, {
          params: {
            ...defaultParams,
            establishment_type: 278 // 278- Wine Bar
          }
        }),
        zomatoApi.get(`search`, {
          params: {
            ...defaultParams,
            establishment_type: 4 // 4- Kioske
          }
        }),
        zomatoApi.get(`search`, {
          params: {
            ...defaultParams,
            establishment_type: 7 // 7- Bar
          }
        }),
        zomatoApi.get(`search`, {
          params: {
            ...defaultParams,
            establishment_type: 272 // 272- cocktail bar
          }
        }),
        zomatoApi.get(`search`, {
          params: {
            ...defaultParams,
            establishment_type: 6 // 6-pub
          }
        }),
        zomatoApi.get(`search`, {
          params: {
            ...defaultParams,
            establishment_type: 292 // 292- Beer Garden
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
              average_cost_for_two:
                restaurants[i].restaurant.average_cost_for_two,
              rating: restaurants[i].restaurant.user_rating.aggregate_rating
            });
          }
        }
        // console.log("----------------BARS------------",result.length)
        // console.log(req.query.price)
        if (req.query.price === "1") {
          // console.log("THIS IS THE RIGHT RESULT", result)
          result = result.filter(element => element.price_range <= 2);
          filteredOptions = result.slice(0, 5);
        } else {
          let filteredResult = result.filter(
            element => element.price_range > 2
          );
          filteredOptions = filteredResult.slice(0, 5);
        }
        res.render("date-options", { filteredOptions, lat, lng });
      });
      break;

    case "coffee":
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
              average_cost_for_two:
                restaurants[i].restaurant.average_cost_for_two,
              rating: restaurants[i].restaurant.user_rating.aggregate_rating
            });
          }
        }
        // console.log("----------------CAFES------------",result.length)
        // console.log(req.query.price)
        if (req.query.price === "1") {
          // console.log("THIS IS THE RIGHT RESULT", result)
          result = result.filter(element => element.price_range <= 2);
          filteredOptions = result.slice(0, 5);
        } else {
          let filteredResult = result.filter(
            element => element.price_range > 2
          );
          filteredOptions = filteredResult.slice(0, 5);
        }
        res.render("date-options", { filteredOptions, lat, lng });
      });
      break;

    case "dinner":
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
              average_cost_for_two:
                restaurants[i].restaurant.average_cost_for_two,
              rating: restaurants[i].restaurant.user_rating.aggregate_rating
            });
          }
        }
        // console.log("----------------RESTAURANTS------------",result.length)
        // console.log(req.query.price)
        if (req.query.price === "1") {
          // console.log("THIS IS THE RIGHT RESULT", result)
          result = result.filter(element => element.price_range <= 2);
          filteredOptions = result.slice(0, 5);
        } else {
          let filteredResult = result.filter(
            element => element.price_range > 2
          );
          filteredOptions = filteredResult.slice(0, 5);
        }
        res.render("date-options", { filteredOptions, lat, lng });
      });
      break;

    case "club":
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
              average_cost_for_two:
                restaurants[i].restaurant.average_cost_for_two,
              rating: restaurants[i].restaurant.user_rating.aggregate_rating
            });
          }
        }
        // console.log("----------------CLUBS------------",result.length)
        // console.log(req.query.price)
        if (req.query.price === "1") {
          // console.log("THIS IS THE RIGHT RESULT", result)
          result = result.filter(element => element.price_range <= 2);
          filteredOptions = result.slice(0, 5);
        } else {
          let filteredResult = result.filter(
            element => element.price_range > 2
          );
          filteredOptions = filteredResult.slice(0, 5);
        }
        res.render("date-options", { filteredOptions, lat, lng });
      });
      break;
  }
  // console.log("These are my final options to the user -------->",filteredOptions);
  // res.render("date-options", {filteredOptions});
});

router.get("/date-options/:placeId", (req, res, next) => {
  let placeId = Number(req.params.placeId);
  axios.defaults.headers.common["user_key"] = process.env.API_KEY;
  let zomatoApi = axios.create({
    baseURL: "https://developers.zomato.com/api/v2.1/",
    headers: { user_key: process.env.API_KEY }
  });
  zomatoApi
    .get(`restaurant`, {
      params: {
        res_id: placeId
      }
    })
    .then(response => {
      let finalOption = {
        id: response.data.id,
        name: response.data.name,
        location: response.data.location,
        cuisines: response.data.cuisines,
        price_range: response.data.price_range,
        average_cost_for_two: response.data.average_cost_for_two,
        rating: response.data.user_rating.aggregate_rating
      };
      var value = encodeURIComponent(JSON.stringify(finalOption));
      res.render("confirm-date", { finalOption, value });
    });
});

router.get("/confirm-date", (req, res, next) => {
  let finalOption = JSON.parse(
    unescape(decodeURIComponent(req.query.finalOption))
  );
  Date.create({
   date_location_name: finalOption.name,
   rating: finalOption.rating,
   address: finalOption.location.address,
   cuisines: finalOption.cuisines,
   latitude: finalOption.location.latitude,
   longitude: finalOption.location.longitude,
   address: finalOption.location.address,
   price_range: finalOption.price_range,
   AvgCostforTwo: finalOption.average_cost_for_two,
   rating: finalOption.rating,
   _user: req.user,
   name: req.user.name
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
  Date.find({ _user: req.user._id }).then(userDates => {
    res.render("profile-page", { message: req.query.msg, userDates: userDates, user: req.user });
  });
});

router.get("/:dateId/delete", (req, res, next) => {
  Date.findByIdAndDelete(req.params.dateId).then(() => {
    res.redirect("/profile-page");
  });
});
//----------------------- NODEMAILER ----------------------

router.post('/send-email', (req, res, next) => {
  Promise.all([Date.findById(req.body.dateId),User.findById(req.user._id)])
  .then(responses => {
    // console.log("MY NAMEEEEEEEEEEEEE", responses[1].name)
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    }
});  
transporter.sendMail({
  from: '"Date Saver 😎" <savemydate1@gmail.com>',
  to: req.body.email, 
  subject: "You got a date!", 
  text: 
  `${responses[1].name} (${responses[1].email}) invited you for a date!
  Check the details below:
  Location: ${responses[0].date_location_name}
  Address: ${responses[0].address}
  Time: ${req.body.dateTime}
  
  Have fun 😉!
  -- Save my Date team`,


  html:  `
  <body>
  <div id="emailContainer" color="#C11F43">
  <h1>${responses[1].name} (${responses[1].email}) invited you for a date!</h1>
  <img src="http://s1.1zoom.me/b5651/820/Dogs_Roses_Jack_Russell_terrier_Glasses_Smartphone_540443_3840x2160.jpg" width="550px" height="400px"><br>
  <h2>Check the details below:</h2>
  <strong>What:</strong> ${responses[0].date_location_name}<br>
  <strong>Where:</strong> ${responses[0].address}<br>
  <strong>When:</strong> ${req.body.dateTime}<br>
  <br>
  Have fun 😉!
  -- Save my Date team
</div>

<style>
body {background-color: #414042;
      color: #C11F43;
      }
#emailContainer {
  margin: 0 auto;
}
</style>
</body>
`
  })
  res.redirect("/profile-page?msg=The email was sent!")
})
// .then(() => {
//   res.redirect("/profile-page?msg=The email was sent!")
// })
})
// router.get("/secret", checkRole("User"), (req, res, next) => {
//   Date.find({ _user: req.user._id })
//   .then(userDates => {
//     res.render("secret" ,{userDates: userDates, user: req.user})
//   })
// });
// router.post('/send-email-TA', (req, res, next) => {
//   Date.findById(req.body.dateId)
//   .then((dateDetails) => {
//   let transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: process.env.GMAIL_USER,
//       pass: process.env.GMAIL_PASS,
//     }
  
// });
//   transporter.sendMail({
//     from: '"Date Saver 👻" ',
//     to: req.body.email, 
//     subject: "You got a date!", 
//     text: 
//     ` Check your date details below!
//     Location:  ${dateDetails.date_location_name}
//     Address:  ${dateDetails.address}
//     Time: ${req.body.dateTime}
    
//     Have fun !
//     `,
//   })
// })
// .then(() => {
//     res.redirect("/profile-page")
//   })
// })


// router.get("/message", checkRole("User"), (req, res, next) => {
//   Date.find({ _user: req.user._id })
//   .then(userDates => {
//     // console.log("The user dates are", userDates)
//     res.render("profile-page" ,{userDates: userDates, user: req.user})
//   })
// });

module.exports = router;