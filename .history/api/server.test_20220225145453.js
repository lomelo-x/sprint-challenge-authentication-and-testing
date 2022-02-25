const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('./server');

const user1 = {
	username: 'User001',
	password: 'PASSWORD',
};

const user2 = {
	username: 'User002',
	password: 'PASSWORD',
};

const user3 = {
	username: 'User003',
	password: '',
};

const user4 = {
	username: '',
	password: '',
};

beforeAll(async () => {
	await db.migrate.rollback();
	await db.migrate.latest();
});

afterAll(async () => {
	await db.destroy();
});

// Write your tests here
test('[0] Sanity Check', () => {
	expect(true).toBe(true);
});

describe('[POST] /api/auth/register', () => {
  it('should return status: 201 if new user created', async () => {
    const res = await request(server).post('/api/auth/register').send(user1)
    expect(res)
  })
} )