const db = require('../../data/dbConfig');

async function add({ username, password }) {
	let createdUser;
	await db.transaction(async (trx) => {
		const [id] = await trx('users').insert({
			username,
			password,
		});
		createdUser = id;
	});
	return findById(createdUser);
}

function find() {
	return db('users')
    .select('id', 'username', 'password')
}

function findBy(filter) {
	return db('users')
    .select('id', 'username', 'password')
    .where(filter);
}
function findById(id) {
	return db('users')
        .select('id', 'password', 'username')
		.where('users.id', id)
		.first();
}

module.exports = {
	add,
	find,
	findBy,
	findById,
};
