const db = require('../../data/dbConfig');

async function add({ username, password }) {
	let created_user_id;
	await db.transaction(async (trx) => {
		const [id] = await trx('users').insert({
			username,
			password,
		});
		created_user_id = id;
	});
	return findById(created_user_id);
}

function find() {
	return db('users').select('user_id', 'username', 'password');
}

function findBy(filter) {
	return db('users').select('user_id', 'username', 'password').where(filter);
}
function findById(user_id) {
	return db('users')
		.select('user_id', 'username')
		.where('users.user_id', user_id)
		.first();
}

module.exports = {
	add,
	find,
	findBy,
	findById,
};
