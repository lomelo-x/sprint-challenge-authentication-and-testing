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
describe('[GET] /api/jokes', () => {
  it('[1] should return message: token required if not logged in', async () => {
    const res = await request(server).get('/api/jokes')
    expect(res.body.message).toEqual('token required');
  })

  it('[2] should return joked array if logged in', async () => {
    let res = await request(server).post('/api/auth/login').send(user1)
    res = await request(server).get('/api/jokes').set({'authorization': res})
    expect(res.body.message).toEqual('token required');
  })
})

describe('[POST] /api/auth/register', () => {
	it('[3] should return status: 201 if new user created', async () => {
		const res = await request(server).post('/api/auth/register').send(user1);
		expect(res.status).toBe(201);
	});

	it('[4] should return message: username taken if username already exists', async () => {
		let res = await request(server).post('/api/auth/register').send(user1);
		res = await request(server).post('/api/auth/register').send(user1);
		expect(res.body.message).toEqual('username taken');
	});

	it('[5] should return message: username and password required if no username or password', async () => {
		const res = await request(server).post('/api/auth/register').send(user2);
		expect(res.body.message).toEqual('username and password required');
	});
});

describe('[POST /api/auth/login', () => {
  it('[6] should return message: welcome (logged in user)', async () => {
    const res = await request(server).post('/api/auth/login').send(user1)
    expect(res.body.message).toEqual(`welcome, ${user1.username}`);
  })

  it('[7] should return message: username and password required if missing username or password', async () => {
    const res = await request(server).post('/api/auth/login').send(user2)
    expect(res.body.message).toEqual('username and password required');
  })
})