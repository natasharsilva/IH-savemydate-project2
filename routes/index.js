// const API_KEY = require('dotenv')

const express = require('express');
const router  = express.Router();
const axios = require("axios")
// const zomatoApi = axios.create({baseUrl: "https://developers.zomato.com/api/v2.1/search?"})

axios.defaults.headers.common['user_key'] = "6bd3ba9f727a9f9495d4cb659f838417";
axios.get('https://developers.zomato.com/api/v2.1/cuisines?city_id=82')
.then((resp) => {
    console.log(resp.data.cuisines[0].cuisine.cuisine_name);
})
.catch(err => console.log("EEEEERRRRRRRORRRRRR", err))

// let config = {'Authorization': process.env.API_KEY};
// axios.get('https://developers.zomato.com/api/v2.1/search?', {headers: config})
// .then((resp) => {
//     console.log(resp);
// });


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
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