import mongoose from 'mongoose';

var modelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

var pointSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  valueSuffix: {
    type: String
  },
  gaugeType: {
    type: String,
    required: true
  },
  chartType: {
    type: String
  },
  minValue: {
    type: Number
  },
  maxValue: {
    type: Number
  },
  minAlert: {
    type: Number
  },
  maxAlert: {
    type: Number
  },
  fieldName: {
    type: String
  },
  showInMenu: {
    type: Boolean
  }
});

// Setup schema
var assetSchema = mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  sentenceType: {
    type: String,
    required: true,
    default: 'nmea0183'
  },
  models: [modelSchema],
  gauges: [pointSchema],
  created: {
    type: Date,
    default: Date.now
  }
});

// Export Contact model
var Asset = module.exports = mongoose.model('assets', assetSchema);

module.exports.get = function (callback, limit) {
  Asset.find(callback).limit(limit);
}
