const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const cinemaSchema = new Schema({
  name: String,
  address: String,
  latitude: String,
  longitude: String,
  website: String,
  },
 {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Cinema = mongoose.model('Cinema', cinemaSchema);
module.exports = Cinema;
