// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js
require('dotenv').config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Date = require("../models/Date");
const Cinema = require("../models/Cinema");
const Netflix = require("../models/Netflix");
let netflixMovies = require('./data/netflixMovies')
let cinemas = require('./data/cinemas')

const bcryptSalt = 10;

mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });



Cinema.deleteMany()
.then(() => Netflix.deleteMany())
.then(() => Cinema.create(cinemas))
.then(cinemasCreated => {
  console.log(`${cinemasCreated.length} cinemas created`);
  return Netflix.create(netflixMovies)
})
.then(moviesCreated => {
  console.log(`${moviesCreated.length} netflix movies created`);
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})