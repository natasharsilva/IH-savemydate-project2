const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const dateSchema = new Schema({
  entity_id: {type: Number, default: 82},
  entity_type: {type: String, default: "city"},
  placeId: String,

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Date = mongoose.model('Date', dateSchema);
module.exports = Date;
