const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('./server');

const user1 = {
	username: 'User001',
	password: 'PASSWORD',
};

const user2 = {
	username: 'User002',
	password: '',
};

const user3 = {
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
		const res = await request(server).post('/api/auth/register').send(user1);
		expect(res.status).toBe(201);
	});

	it('should return status: 422 if username is taken', async () => {
		let res = await request(server).post('/api/auth/register').send(user1);
		res = await request(server).post('/api/auth/register').send(user1);
		expect(res.status).toBe(422);
	});

	it('should return message: username and password required if no username or password', async () => {
		const res = await request(server).post('/api/auth/register').send(user2);
		expect(res.body.message).toEqual('username and password required');
	});
});

describe('[POST /api/auth/login', () => {
  it('should return message: welcome (logged in user)', async () => {
    
  })
})