import mongoose from 'mongoose';
import 'dotenv/config';

const jwt = require('jsonwebtoken');
const Joi = require('joi');

// Setup schema
var userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dashboard: {
    type: Object,
    default: []
  },
  role: {
    type: String,
    required: true,
    default: 'stalker'
  },
  created: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false });

userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, role: this.role }, process.env.LOGIN_SECRET); 
  return token;
}

// Export Contact model
var User = module.exports = mongoose.model('users', userSchema);

module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit);
}
