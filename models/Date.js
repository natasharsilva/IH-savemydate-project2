const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const dateSchema = new Schema({
  placeId: String,
  
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Date = mongoose.model('Date', dateSchema);
module.exports = Date;
