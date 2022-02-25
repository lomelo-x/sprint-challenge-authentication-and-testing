const request = require('supertest');
const db = require('../data/dbConfig')
const server = require('./server')

const user1 = {
  username: 'User001'
  password: ''
}

beforeAll(async () => {
	await db.migrate.rollback();
	await db.migrate.latest();
});

afterAll(async () => {
	await db.destroy();
});

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})
