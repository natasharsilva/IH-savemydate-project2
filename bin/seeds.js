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

// let users = [
//   {
//     email: "alice",
//     password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
//   },
//   {
//     email: "bob",
//     password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
//   }
// ]

// User.deleteMany()
// .then(() => {
//   return User.create(users)
// })
// .then(usersCreated => {
//   console.log(`${usersCreated.length} users created with the following id:`);
//   console.log(usersCreated.map(u => u._id));
// })
// .then(() => {
//   // Close properly the connection to Mongoose
//   mongoose.disconnect()
// })
// .catch(err => {
//   mongoose.disconnect()
//   throw err
// })


let cinemas = [
  { name: "Cinemas NOS Amoreiras",
    address: "Av. Eng. Duarte Pacheco n° 2037, 1070-103 Lisboa",
    latitude: 38.723759,
    longitude:  -9.161578,
    website: "http://cinemas.nos.pt/Cinemas/Pages/amoreiras.aspx",
  },
  { name: "UCI Cinema El Corte Inglés",
    address: "Av. António Augusto de Aguiar 31, 1069-413 Lisboa",
    latitude: 38.732609, 
    longitude:  -9.153369,
    website: "http://www.ucicinemas.pt/Cinemas/El-Corte-Ingles",
  }, 
  { name: "Cinemateca Portuguesa - Museu do Cinema",
  address: "R. Barata Salgueiro 39, 1250-165 Lisboa",
  latitude: 38.720881, 
  longitude:  -9.148614,
  website: "http://www.cinemateca.pt/",
}, 
  { name: "Cinema Ideal",
  address: "Rua do Loreto 15, 1200-086 Lisboa",
  latitude: 38.710655, 
  longitude:  -9.144251,
  website: "http://www.cinemaideal.pt/",
},
{ name: "IndieLisboa",
address: "Rua da Rosa, 277, 2.º - Sala 1.4, 1200-385 Lisboa",
latitude: 38.715204, 
longitude:  -9.145953,
website: "https://indielisboa.com/",
},
{ name: "Cinemas NOS Dolce Vita Miraflores",
address: "Av. das Túlipas, 1495-611 Dolce Vita Miraflores",
latitude: 38.709240, 
longitude:  -9.227393,
website: "http://cinemas.nos.pt/cinemas/Pages/dolce-vita-miraflores.aspx",
},
  {
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