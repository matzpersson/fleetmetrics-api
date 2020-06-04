import "babel-polyfill";

const mongoose = require('mongoose');
const app = require('../../services/api');
const supertest = require('supertest')
const request = supertest(app)

const testData = { 
  key: 'thunderbolt',
  name: 'Thunderbolt 2',
  models: ['gpgll', 'indpt'],
  sentenceType: 'nmea0183',
  created: new Date()
};

let responseData = null;

describe('Asset Router Tests', () => {
  beforeAll(async () => {
    jest.setTimeout(10000);
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });

  it('GET /api/assets', async done => {
    const response = await request.get('/api/assets')

    expect(response.status).toBe(200)
    // expect(response.body.message).toBe('pass!')
    done()
  })

  it('POST /api/assets', function(done) {
    request
      .post('/api/assets')
      .send(testData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        responseData = res.body.data;
        if (err) return done(err);
        done();
      });
  });

  it('GET /api/assets/:id', async done => {
    const response = await request.get(`/api/assets/${responseData._id}`)

    expect(response.status).toBe(200)
    expect(response.body.data.name).toBe(testData.name)
    done()
  })

  it('PUT /api/assets/:id', async done => {
    const updateData = testData;
    updateData.name = 'Australia Fair';

    const response = await request
      .put(`/api/assets/${responseData._id}`)
      .send(updateData)

    expect(response.status).toBe(200)
    expect(response.body.data.name).toBe(updateData.name)
    done()
  })

  it('DELETE /api/assets/:id', async done => {
    const response = await request.delete(`/api/assets/${responseData._id}`)

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Asset deleted')
    done()
  })
})
