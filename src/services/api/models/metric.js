import mongoose from 'mongoose';

// Setup schema
var metricSchema = mongoose.Schema({
  topic: {
    type: String,
    required: true
  },
  recorded: {
    type: Date,
    required: true
  },
  sentenceType: {
    type: String,
    default: 'nmea0183',
    required: true
  },
  sentenceModel: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

// Export Contact model
var Metric = module.exports = mongoose.model('metrics', metricSchema);

module.exports.get = function (callback, limit) {
  Metric.find(callback).limit(limit);
}
