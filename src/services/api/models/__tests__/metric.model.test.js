import "babel-polyfill";
const mongoose = require('mongoose');
const MetricModel = require('../metric.js');

const data = { 
  topic: 'thunderbolt',
  recorded: new Date(),
  sentenceType: 'nmea0183',
  sentenceModel: 'gpgll',
  data: {lat: -16.0, lon: -147.0},
  created: new Date()
};

describe('Metric Model Test', () => {
  // Use MongoDB Memory Server 
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });

  it('Create & save successfully', async () => {
    const valid = new MetricModel(data);
    const saved = await valid.save();

    expect(saved._id).toBeDefined();
    expect(saved.topic).toBe(data.topic);
    expect(saved.recorded).toBe(data.recorded);
    expect(saved.sentenceType).toBe(data.sentenceType);
    expect(saved.sentenceModel).toBe(data.sentenceModel);
  });

  // Invalid fields
  const invalidData = data;
  invalidData.someweirdfield = 'bloop';
  it('Insert user successfully, but the field does not defined in schema should be undefined', async () => {
    const invalid = new MetricModel(invalidData);
    const saved = await invalid.save();
    expect(saved._id).toBeDefined();
    expect(saved.someweirdfield).toBeUndefined();
  });

  // Test Validation is working!!!
  it('Create without required field should failed', async () => {
    const withoutRequired = new MetricModel({ topic: 'bla' });
    let err;
    try {
      const saved = await withoutRequired.save();
      error = saved;
    } catch (error) {
      err = error
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.sentenceModel).toBeDefined();
    expect(err.errors.data).toBeDefined();
    expect(err.errors.recorded).toBeDefined();
  });
})
