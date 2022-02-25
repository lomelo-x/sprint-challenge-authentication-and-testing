const request = require('supertest');
const db = require('../data/dbConfig')
const server = require('./')
// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})
