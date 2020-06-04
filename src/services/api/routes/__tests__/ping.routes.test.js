import "babel-polyfill";

const app = require('../../services/api');
const supertest = require('supertest')
const request = supertest(app)

it('Get /api/ping', async done => {
  const response = await request.get('/api/ping')

  expect(response.status).toBe(200)
  // expect(response.body.message).toBe('pass!')
  done()
})
