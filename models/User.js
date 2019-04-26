const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email: { 
    type: String,
    required: true,
    unique: true,
    match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  },
    name: String,
    password: String,
    role: {
      type:String,
      default: "User"
    },
    _date:{type: Schema.Types.ObjectId, ref: 'Date'},
    _cinema:{type: Schema.Types.ObjectId, ref: 'Date'},

},
 {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
