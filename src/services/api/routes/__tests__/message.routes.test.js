
import "babel-polyfill";

const mongoose = require('mongoose');
const app = require('../../services/api');
const supertest = require('supertest')
const request = supertest(app)

const testData = { 
  topic: 'thunderbolt',
  message: '$GPGLL, 12322112, 123333, 9877',
  created: new Date()
};

let responseData = null;

describe('Message Router Tests', () => {
  beforeAll(async () => {
    jest.setTimeout(20000);
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });

  it('GET /api/messages', async done => {
    const response = await request
      .get('/api/messages')

    expect(response.status).toBe(200)
    done()
  })

  it('POST /api/messages', function(done) {
    request
      .post('/api/messages')
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

  it('GET /api/messages/:id', async done => {
    const response = await request
      .get(`/api/messages/${responseData._id}`)

    expect(response.status).toBe(200)
    expect(response.body.data.topic).toBe(testData.topic)
    done()
  })

  it('PUT /api/messages/:id', async done => {
    const updateData = testData;
    updateData.topic = 'australia-fair';

    const response = await request
      .put(`/api/messages/${responseData._id}`)
      .send(updateData)

    expect(response.status).toBe(200)
    expect(response.body.data.topic).toBe(updateData.topic)
    done()
  })

  it('DELETE /api/messages/:id', async done => {
    const response = await request
      .delete(`/api/messages/${responseData._id}`)

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Message deleted')
    done()
  })
})
