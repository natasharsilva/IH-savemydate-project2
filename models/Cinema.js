const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const cinemaSchema = new Schema({
  name: String,
  "location": {
    "address": String,
    "city": String,
    "city_id": Number,
    "latitude": String,
    "longitude": String,
    "zipcode": "",
    "country_id": Number,
    "country_name": String,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Cinema = mongoose.model('Cinema', cinemaSchema);
module.exports = Cinema;
