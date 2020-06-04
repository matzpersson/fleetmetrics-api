import "babel-polyfill";
const mongoose = require('mongoose');
const AssetModel = require('../asset.js');

const data = { 
  key: 'thunderbolt',
  name: 'Thunderbolt 2',
  models: ['gpgll', 'indpt'],
  sentenceType: 'nmea0183',
  created: new Date()
};

describe('Asset Model Test', () => {

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
    const valid = new AssetModel(data);
    const saved = await valid.save();

    expect(saved._id).toBeDefined();
    expect(saved.key).toBe(data.key);
    expect(saved.name).toBe(data.name);
    expect(saved.models).toBe(data.models);
    expect(saved.sentenceType).toBe(data.sentenceType);
    expect(saved.created).toBe(data.created);
  });

  // Invalid fields
  it('Insert user successfully with dodgy field undefined in schema ', async () => {
    const invalidData = data;
    invalidData.someweirdfield = 'bloop';
    invalidData['key'] = 'australiafair';

    const invalid = new AssetModel(invalidData);
    const saved = await invalid.save();
    expect(saved._id).toBeDefined();
    expect(saved.someweirdfield).toBeUndefined();
  });

  // Test Validation is working!!!
  it('Create without required field should fail', async () => {
    const withoutRequired = new AssetModel({ key: 'someboat' });
    let err;
    let error;
    try {
      const saved = await withoutRequired.save();
      error = saved;
    } catch (error) {
      err = error
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.name).toBeDefined();
  });
})
