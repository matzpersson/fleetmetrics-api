import mongoose from 'mongoose';

var permissionSchema = mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    required: true
  }
});

// Setup schema
var roleSchema = mongoose.Schema({
  role: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  permissions: [permissionSchema],
});

// Export Contact model
var Role = module.exports = mongoose.model('roles', roleSchema);

module.exports.get = function (callback, limit) {
  Role.find(callback).limit(limit);
}
