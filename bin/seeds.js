// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Date = require("../models/Date");
const Cinema = require("../models/Cinema");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/savemydate', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    email: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
  },
  {
    email: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
  }
]

User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})


let cinemas = [
  {  name: String,
    "location": {
      "address": "Av. Eng. Duarte Pacheco 103, 1070-103 Lisboa",
      "locality": "Lisbon",
      "city": "Lisbon",
      "city_id": 82,
      "latitude": "38.7158131",
      "longitude": "-9.2155907",
      "zipcode": "",
      "country_id": 164,
      "country_name": "Portugal",
    },
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
]

Cinema.deleteMany()
.then(() => {
  return Cinema.create(cinemas)
})
.then(cinemasCreated => {
  console.log(`${cinemasCreated.length} cinemas created with the following id:`);
  console.log(cinemasCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})