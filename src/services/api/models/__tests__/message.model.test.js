import "babel-polyfill";
const mongoose = require('mongoose');
const MessageModel = require('../message.js');

const data = { 
  topic: 'thunderbolt',
  message: '$GPGLL, 12322112, 123333, 9877',
  created: new Date()
};

describe('Message Model Test', () => {

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
    const valid = new MessageModel(data);
    const saved = await valid.save();

    expect(saved._id).toBeDefined();
    expect(saved.topic).toBe(data.topic);
    expect(saved.message).toBe(data.message);
    expect(saved.created).toBe(data.created);
  });

  // Invalid fields
  const invalidData = data;
  invalidData.someweirdfield = 'bloop';
  it('Insert user successfully, but the field does not defined in schema should be undefined', async () => {
    const invalid = new MessageModel(invalidData);
    const saved = await invalid.save();
    expect(saved._id).toBeDefined();
    expect(saved.someweirdfield).toBeUndefined();
  });

  // // Test Validation is working!!!
  it('Create without required field should fail', async () => {
    const withoutRequired = new MessageModel({ name: 'bla' });
    let err;
    try {
      const saved = await withoutRequired.save();
      err = saved;
    } catch (error) {
      err = error
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.topic).toBeDefined();
    expect(err.errors.message).toBeDefined();
  });
})