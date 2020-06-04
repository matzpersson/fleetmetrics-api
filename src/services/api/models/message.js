import mongoose from 'mongoose';

// Setup schema
var messageSchema = mongoose.Schema({
  topic: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  }
});

// Export Contact model
var Message = module.exports = mongoose.model('message', messageSchema);

module.exports.get = function (callback, limit) {
  Message.find(callback).limit(limit);
}
