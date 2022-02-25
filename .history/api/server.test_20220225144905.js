const request = require('supertest');
const db = require('../data/dbConfig')
const server = require('./server')

beforeAll(async () => {
	await db.migrate.rollback();
	await db.migrate.latest();
});


afterAll(async () => {
	await db.destroy();
});

const user1 = {}
// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})
