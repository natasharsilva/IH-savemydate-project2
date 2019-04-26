const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const dateSchema = new Schema({
  entity_id: {type: Number, default: 82},
  entity_type: {type: String, default: "city"},
  date_location_name: String,
  rating: Number,
  cuisines: String,
  latitude: Number,
  longitude: Number,
  address: String,
  price_range: String,
  AvgCostforTwo: Number,
  title: String,
  director: String,
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  // name: { type: Schema.Types.String, ref: 'User' },

  
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Date = mongoose.model('Date', dateSchema);
module.exports = Date;
